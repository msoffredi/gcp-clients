variable "project_id" {
  type        = string
  description = "The GCP project ID"
}

variable "region" {
  type        = string
  default     = "us-east1"
  description = "The region you want your assets to be created and hosted from"
}

variable "deploy_bucket" {
  type        = string
  description = "The cloud storage bucket for your entire project"
}

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
