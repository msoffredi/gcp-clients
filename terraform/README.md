# Running Terraform locally

## Pre-requisites

1. Terraform 1.0 or higher
2. You have a GCP account with billing configured
3. You have the following GCP APIs and Services enabled in your project:
    - Cloud Build API
    - Cloud Run Admin API
    - Artifact Registry API
    - Cloud Functions API
    - Cloud Storage API
    - API Gateway API
    - Service Control API
4. You have [built](/README.md#build) your project

## Deploying for local/dev

```
> terraform init
> terraform apply -auto-approve -var-file="main.tfvars"
```
