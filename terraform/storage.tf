resource "random_id" "default" {
  byte_length = 8
}

resource "google_storage_bucket" "gcf_bucket" {
    provider      = google
    location      = var.region
    name          = "gcf-clients-${random_id.default.hex}"
    force_destroy = true
    
    # Use "US" or similar for multi-region  
    storage_class = "STANDARD"

    versioning {
        enabled = true
    }
}

# Needed for the storage to be used by Cloud Builder to build Cloud Functions out of it
resource "google_project_iam_binding" "storage_obj_admin_permission" {
    project = var.project_id
    role = "roles/cloudbuild.builds.builder"
    members = [
        "serviceAccount:${data.google_project.project.number}-compute@developer.gserviceaccount.com"
    ]
}