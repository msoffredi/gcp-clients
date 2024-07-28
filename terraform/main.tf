terraform {
    required_version = ">= 1.9"
}

import {
    to = google_storage_bucket.deploy_bucket
    id = var.deploy_bucket
}

resource "google_storage_bucket" "deploy_bucket" {
    provider      = google
    location      = var.region
    name          = var.deploy_bucket
    force_destroy = false
    
    # Use "US" or similar for multi-region  
    storage_class = "STANDARD"

    versioning {
        enabled = true
    }
}
