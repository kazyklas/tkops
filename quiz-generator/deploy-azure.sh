#!/bin/bash

# QuizGen AI - Azure Deployment Script
# 
# This script helps deploy the application to Azure using Docker Compose
# 
# Prerequisites:
# 1. Azure CLI installed (https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
# 2. Docker installed
# 3. Azure subscription
#
# Usage:
#   ./deploy.sh <resource-group> <app-name> <plan>

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}QuizGen AI - Azure Deployment${NC}"

# Check prerequisites
command -v az >/dev/null 2>&1 || { echo -e "${RED}Azure CLI not found. Please install it first.${NC}" >&2; exit 1; }
command -v docker >/dev/null 2>&1 || { echo -e "${RED}Docker not found. Please install it first.${NC}" >&2; exit 1; }

# Check for required environment variables
if [ -z "$OPENAI_API_KEY" ]; then
    echo -e "${YELLOW}Warning: OPENAI_API_KEY not set. Please set it in .env file or export it.${NC}"
fi

# Get parameters or use defaults
RESOURCE_GROUP=${1:-quizgen-rg}
APP_NAME=${2:-quizgen}
PLAN_NAME=${3:-quizgen-plan}

# Login to Azure
echo -e "${YELLOW}Logging into Azure...${NC}"
az login

# Create resource group if not exists
echo -e "${YELLOW}Creating resource group: $RESOURCE_GROUP${NC}"
az group create --name $RESOURCE_GROUP --location eastus

# Create App Service Plan
echo -e "${YELLOW}Creating App Service Plan...${NC}"
az appservice plan create \
    --name $PLAN_NAME \
    --resource-group $RESOURCE_GROUP \
    --sku B1 \
    --is-linux

# Create web app with custom Docker image
echo -e "${YELLOW}Creating Web App...${NC}"
az webapp create \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --plan $PLAN_NAME \
    --deployment-container-image-name mcr.microsoft.com/azuredocs/containerapps-helloworld:latest

# Configure environment variables
echo -e "${YELLOW}Configuring environment variables...${NC}"

if [ -n "$OPENAI_API_KEY" ]; then
    az webapp config appsettings set \
        --name $APP_NAME \
        --resource-group $RESOURCE_GROUP \
        --settings OPENAI_API_KEY=$OPENAI_API_KEY
fi

# For Docker Compose deployment, create a docker-compose.yml in the Azure Web App
# This is done through Azure Portal or using az command with --multicontainer-config

echo -e "${GREEN}Deployment configuration complete!${NC}"
echo ""
echo "To deploy using Docker Compose, use Azure Container Apps or set up CI/CD with:"
echo "1. Push images to Azure Container Registry"
echo "2. Configure Azure Web App to use the images"
echo ""
echo "Alternatively, use Azure Container Apps with the provided azure-containerapps.yml"
