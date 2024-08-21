# Reserve an external IP
resource "google_compute_global_address" "api" {
    provider = google
    name     = "gcp-clients-lb-ip-${var.deploy_prefix}"
}

# Get the managed DNS zone
data "google_dns_managed_zone" "domain_zone" {
    provider  = google
    project   = var.domain_project_id != null ? var.domain_project_id : var.project_id
    name      = var.domain_zone_name
}

locals {
    clients_api_subdomain = "clients-api${var.deploy_env == "prod" ? "" : "-"}${var.deploy_env == "prod" ? "" : var.deploy_prefix}.${data.google_dns_managed_zone.domain_zone.dns_name}"
}

# Add the IP to the DNS
resource "google_dns_record_set" "api" {
    project      = var.domain_project_id != null ? var.domain_project_id : var.project_id
    provider     = google
    name         = local.clients_api_subdomain
    type         = "A"
    ttl          = 300
    managed_zone = data.google_dns_managed_zone.domain_zone.name
    rrdatas      = [google_compute_global_address.api.address]
}
