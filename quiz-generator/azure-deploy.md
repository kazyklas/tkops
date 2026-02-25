# Azure App Service Deployment Configuration
# 
# This file provides the configuration for deploying to Azure App Service
# using Azure Container Apps or Azure App Service with Docker Compose.
#
# Prerequisites:
# 1. Azure subscription
# 2. Azure Container Registry (ACR) or use Docker Hub
# 3. Azure App Service Plan
#
# Deployment Options:
#
# Option 1: Azure Container Apps
# - Use azureContainerApps.yml for deploying to Azure Container Apps
#
# Option 2: Azure App Service (Web App for Containers)
# - Use Azure Portal or Azure CLI to deploy

# For Azure App Service using Azure CLI:
# az webapp up --name <app-name> --resource-group <rg-name> --plan <plan-name> --docker-registry-server-user <user> --docker-registry-server-password <pass> --configuration-file docker-compose.yml

# Environment Variables to configure in Azure:
# Backend:
#   - OPENAI_API_KEY: Your OpenAI API key
#
# Frontend:
#   - VITE_AD_PROVIDER_ID: Ad provider ID (optional)
#   - VITE_AD_SLOT_TOP: Top ad slot ID (optional)
#   - VITE_AD_SLOT_BOTTOM: Bottom ad slot ID (optional)
#   - VITE_AD_SLOT_VIDEO: Video ad slot ID (optional)
