# Running Terraform locally

## Pre-requisites

1. Terraform 1.9 or higher
2. You have a GCP account with billing configured
3. You have the following GCP APIs and Services enabled in your project:
    - Cloud Build API
    - Cloud Run Admin API
    - Artifact Registry API
    - Cloud Functions API
    - Cloud Storage API
    - API Gateway API
    - Service Control API
    - MongoDB Atlas (with valid org and project. See the [variables.tf file](variables.tf) for data you need from your MongoDB Atlas instance)
4. You copy `backend.tf.example` to `backend.tf` and update as needed (no update needed for local deploy)
5. You copy `main.tfvars.example` to `main.tfvars` and update accordingly
6. You have [built](/README.md#build) your project

## Deploying for local/dev

If you are deploying for the first time you will need to initialize terraform:

```
> terraform init
```

Then to deploy changes on a regular basis you just do

```
> terraform apply -auto-approve -var-file="main.tfvars"
```

## Destroying for local/dev

```
> terraform destroy -auto-approve -var-file="main.tfvars"
```
