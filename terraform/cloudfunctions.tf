data "archive_file" "source" {
  type        = "zip"
  source_dir  = "${path.module}/../dist"
  output_path = "${path.module}/tmp/function.zip"
}

resource "google_storage_bucket_object" "zip" {
  source       = data.archive_file.source.output_path
  content_type = "application/zip"
  name         = "src-${data.archive_file.source.output_md5}.zip"
  bucket       = var.deploy_bucket

  depends_on = [
    data.archive_file.source
  ]
}

resource "google_cloudfunctions2_function" "clients_api_fn" {
    provider    = google
    name        = "clients-api-${var.deploy_prefix}"
    description = "Clients serverless microservice API"
    # project     = var.project_id
    location    = var.region 

    depends_on  = [
      google_storage_bucket_object.zip,
    ]

    build_config {
      runtime           = "nodejs18"
      entry_point       = "handler" # Set the entry point
      docker_repository = "projects/sample-ms-soffredi/locations/us-east1/repositories/gcf-artifacts"

      source {
        storage_source {
          bucket = var.deploy_bucket
          object = google_storage_bucket_object.zip.name
        }
      }
    }

    service_config {
        max_instance_count = 1
        available_memory   = "128Mi"
        timeout_seconds    = 100

        environment_variables = {
            DB_USER = var.db_user
            DB_PASSWORD = var.db_password
            DB_HOST = var.db_host
            DB_NAME = "gcp-ms-soffredi-db-${var.deploy_prefix}"
        }
    }
}

resource "google_cloud_run_service_iam_member" "member" {
  location = google_cloudfunctions2_function.clients_api_fn.location
  service  = google_cloudfunctions2_function.clients_api_fn.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
