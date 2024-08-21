data "archive_file" "source" {
    type        = "zip"
    source_dir  = "${path.module}/../dist"
    output_path = "${path.module}/tmp/function.zip"
}

resource "google_storage_bucket_object" "zip" {
    source       = data.archive_file.source.output_path
    content_type = "application/zip"
    name         = "clients/api-src-${data.archive_file.source.output_md5}.zip"
    # bucket       = data.google_storage_bucket.deploy_bucket.name
    bucket       = google_storage_bucket.gcf_bucket.name
}

resource "google_cloudfunctions2_function" "clients_api_fn" {
    provider    = google
    name        = "clients-api-${var.deploy_prefix}"
    description = "Clients serverless microservice API"
    location    = var.region 

    build_config {
        runtime           = "nodejs18"
        entry_point       = "handler" # Set the entry point
        # docker_repository = "projects/sample-ms-soffredi/locations/us-east1/repositories/gcf-artifacts"        
        # docker_repository = "projects/${var.project_id}/locations/${var.region}/repositories/gcf-artifacts"

        source {
            storage_source {
                # bucket = data.google_storage_bucket.deploy_bucket.name
                bucket = google_storage_bucket.gcf_bucket.name
                object = google_storage_bucket_object.zip.name
            }
        }
    }

    service_config {
        max_instance_count = 1
        available_memory   = "256Mi"
        timeout_seconds    = 100

        environment_variables = {
            DB_USER     = "${var.db_user}"
            DB_PASSWORD = "${var.db_password}"
            DB_HOST     = "${var.db_host}"
            DB_NAME     = "${var.db_instance_name}"
            TOPIC_NAME  = "${google_pubsub_topic.client-events-topic.name}"
        }
    }
}

resource "google_cloud_run_service_iam_member" "member" {
    location = google_cloudfunctions2_function.clients_api_fn.location
    service  = google_cloudfunctions2_function.clients_api_fn.name
    role     = "roles/run.invoker"
    member   = "allUsers"
}
