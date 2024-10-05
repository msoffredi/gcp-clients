terraform {
    required_version = ">= 1.9"
}

data "google_project" "project" {
    project_id = var.project_id
}

# data "google_storage_bucket" "deploy_bucket" {
#     name = var.deploy_bucket
# }