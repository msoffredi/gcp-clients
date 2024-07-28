terraform {
  required_providers {
    google = {
        source  = "hashicorp/google"
        version = "~> 5.38.0"
    }

    google-beta = {
        source  = "hashicorp/google-beta"
        version = "~> 5.38.0"
    }

    mongodbatlas = {
        source = "mongodb/mongodbatlas"
        version = "~> 1.17.4"
    }
  }
}

provider "google" {
    project = var.project_id
    region  = var.region
}

provider "google-beta" {
    project = var.project_id
    region  = var.region
}

provider "mongodbatlas" {
    public_key  = var.atlas_public_key
    private_key = var.atlas_private_key
}
