resource "google_pubsub_topic" "client-events-topic" {
    name = "gcp-ms-client-events-${var.deploy_prefix}"
}
