resource "google_compute_region_network_endpoint_group" "function_neg_us" {
    name                  = "gcf-neg-clients-${var.deploy_prefix}"
    provider              = google-beta
    network_endpoint_type = "SERVERLESS"
    region                = var.region

    serverless_deployment {
        platform = "apigateway.googleapis.com"
        resource = google_api_gateway_api.clients_api_gw.api_id
    }
}

resource "google_compute_backend_service" "webservers_backend_service_us" {
    name                            = "backend-srv-clients-${var.deploy_prefix}"
    timeout_sec                     = 30
    provider                        = google-beta
    connection_draining_timeout_sec = 0
    load_balancing_scheme           = "EXTERNAL"
    protocol                        = "HTTPS"

    log_config {
        enable = true
        sample_rate  = 1
    }

    backend {
        group = google_compute_region_network_endpoint_group.function_neg_us.id
        balancing_mode = "UTILIZATION"
    }
}

resource "google_compute_url_map" "lb_us" {
    name            = "url-map-clients-${var.deploy_prefix}"
    provider        = google-beta
    default_service = google_compute_backend_service.webservers_backend_service_us.id

    host_rule {
        hosts        = [google_dns_record_set.api.name]
        path_matcher = "us-predictions"
    }

    path_matcher {
        name            = "us-predictions"
        default_service = google_compute_backend_service.webservers_backend_service_us.id
    }
}

resource "google_compute_managed_ssl_certificate" "lb_ssl_cert_us" {
    provider = google-beta
    name     = "gcp-clients-cert-${var.deploy_prefix}"

    managed {
        domains = [google_dns_record_set.api.name]
    }
}

resource "google_compute_target_https_proxy" "lb_us_proxy" {
    name             = "gcp-clients-target-proxy-${var.deploy_prefix}"
    url_map          = google_compute_url_map.lb_us.id
    provider         = google-beta
    ssl_certificates = [google_compute_managed_ssl_certificate.lb_ssl_cert_us.id]
    depends_on       = [google_compute_managed_ssl_certificate.lb_ssl_cert_us]
}

# reserved IP address 8
# resource "google_compute_global_address" "ip_address_us" {
#   name = "ssl-proxy-xlb-ip-terraform-us"
# }

resource "google_compute_global_forwarding_rule" "rule_us" {
    name                  = "gcp-clients-forwarding-rule-${var.deploy_prefix}"
    provider              = google-beta
    ip_protocol           = "TCP"
    load_balancing_scheme = "EXTERNAL"
    port_range            = 443
    target                = google_compute_target_https_proxy.lb_us_proxy.id
    ip_address            = google_compute_global_address.api.id
}
