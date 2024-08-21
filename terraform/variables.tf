variable "project_id" {
    type        = string
    description = "The GCP project ID"
}

variable "region" {
    type        = string
    default     = "us-east1"
    description = "The region you want your assets to be created and hosted from"
}

# variable "deploy_bucket" {
#     type        = string
#     description = "The cloud storage bucket for your entire project"
# }

variable "deploy_prefix" {
    type        = string
    description = "For local/dev deployments consider using your name or nickname"
}

variable "atlas_public_key" {
    type        = string
    description = "MongoDB Atlas Public Key"
}

variable "atlas_private_key" {
    type        = string
    description = "MongoDB Atlas Private Key"
}

variable "atlas_org_id" {
    type        = string
    description = "Atlas organization id"
}

variable "atlas_project_name" {
    type        = string
    default     = "gcp-ms-soffredi"
    description = "Atlas project name"
}

variable "cluster_instance_size_name" {
    type        = string
    description = "Cluster instance size name"
    # This is to access the M0 Serverless option. CHnage it to your needs
    default     = "M0"
}

variable "atlas_region" {
    type        = string
    description = "GCP region where resources will be created"
    # This is to access the M0 Serverless option. CHnage it to your needs
    default     = "CENTRAL_US"
}

variable "db_password" {
    type        = string
    description = "DB password"
}

variable "db_user" {
    type        = string
    description = "DB user"
}

variable "db_host" {
    type        = string
    description = "DB host. Should be like: mongodb+srv://<project_name>.<abc123>.mongodb.net"
}

variable "db_instance_name" {
    type        = string
    description = "DB instance name"
}

variable "domain_zone_name" {
    type        = string
    description = "The domain zone name you want your assets to be accessed from"
}

# DNS most likely comes from same project for all environments
variable "domain_project_id" {
    type = string
    default = null
    description = "Project ID of the DNS domain you want to use (in case is not same project as the rest of the resources)"
}

variable "deploy_env" {
    type        = string
    default     = "dev"
    description = "Deployment environment"

    validation {
        condition     = contains(["dev", "staging", "prod"], var.deploy_env)
        error_message = "Invalid value for deploy_env. Valid values are 'dev', 'staging', or 'prod'."
    }
}
