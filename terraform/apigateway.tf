resource "google_api_gateway_api" "clients_api_gw" {
    provider     = google-beta
    api_id       = "clients-api-${var.deploy_prefix}"
    display_name = "Clients API ${var.deploy_prefix}"
}

resource "google_api_gateway_api_config" "clients_api_cfg" {
    provider        = google-beta
    api             = google_api_gateway_api.clients_api_gw.api_id
    display_name    = "Clients API config ${var.deploy_prefix}"
    depends_on      = [ 
        google_api_gateway_api.clients_api_gw
    ]

    openapi_documents {
        document {
            path     = "${path.module}/../openapi2.yaml"
            contents = filebase64("${path.module}/../openapi2.yaml")
        }
    }

    lifecycle {
        create_before_destroy = true
    }   
}

resource "google_api_gateway_gateway" "clients_api_gw_gw" {
    provider        = google-beta
    api_config      = google_api_gateway_api_config.clients_api_cfg.id

    gateway_id      = "clients-api-gw-${var.deploy_prefix}"
    display_name    = "Clients API gateway ${var.deploy_prefix}"

    depends_on      = [
        google_api_gateway_api_config.clients_api_cfg
    ]
}

output "clients_api_dev_uri" {
    description = "The clients API public url you need to use to access the API"
    value = "https://${google_api_gateway_gateway.clients_api_gw_gw.default_hostname}"
}
