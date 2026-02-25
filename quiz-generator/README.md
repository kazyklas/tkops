# QuizGen AI

An AI-powered quiz generator that creates custom quizzes on any topic using OpenAI.

## Features

- Generate quizzes on any theme
- Multiple choice and open-ended questions
- Light/dark theme support
- Responsive design (mobile, tablet, desktop)
- Video ad integration for monetization
- Docker-ready for Azure deployment

## Architecture

```
quiz-generator/
├── frontend/          # React 18 + Vite
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context for state
│   │   └── styles/      # Global styles
│   └── nginx.conf      # Nginx config for production
├── backend/           # Node.js + Express
│   └── src/
│       ├── routes/     # API routes
│       └── services/   # Business logic
├── docker-compose.yml  # Docker orchestration
└── SPEC.md            # Technical specification
```

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- OpenAI API key

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
cd quiz-generator

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional - Ad configuration
VITE_AD_PROVIDER_ID=
VITE_AD_SLOT_TOP=
VITE_AD_SLOT_BOTTOM=
VITE_AD_SLOT_VIDEO=
```

### 3. Run Locally

#### Option A: Development Mode

```bash
# Terminal 1: Start backend
cd backend
cp .env.example .env  # Edit with your API key
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

Access at http://localhost:5173

#### Option B: Docker Compose

```bash
# Build and run
docker-compose up --build

# Or with environment file
OPENAI_API_KEY=your_key docker-compose up --build
```

Access at http://localhost:8080

## Docker Build

### Build Images

```bash
# Build backend
docker build -t quizgen-backend ./backend

# Build frontend
docker build -t quizgen-frontend ./frontend
```

### Run with Docker

```bash
docker run -p 3001:3001 -e OPENAI_API_KEY=your_key quizgen-backend
docker run -p 8080:80 quizgen-frontend
```

## Azure Deployment

### Option 1: Azure Container Apps (Recommended)

1. Install Azure CLI and log in:
   ```bash
   az login
   ```

2. Create Azure Container Registry:
   ```bash
   az acr create --resource-group quizgen-rg --name quizgenregistry --sku Basic
   ```

3. Build and push images:
   ```bash
   # Build for Linux
   docker build -t quizgenregistry.azurecr.io/quizgen-backend:latest ./backend
   docker build -t quizgenregistry.azurecr.io/quizgen-frontend:latest ./frontend

   # Push to ACR
   az acr login --name quizgenregistry
   docker push quizgenregistry.azurecr.io/quizgen-backend:latest
   docker push quizgenregistry.azurecr.io/quizgen-frontend:latest
   ```

4. Deploy to Container Apps using the provided `azure-containerapps.yml`:
   ```bash
   az containerapp up \
     --name quizgen \
     --resource-group quizgen-rg \
     --location eastus \
     --environment quizgen-env \
     --image quizgenregistry.azurecr.io/quizgen-frontend:latest \
     --target-port 80 \
     --ingress external \
     --environment-variables OPENAI_API_KEY=your_key
   ```

### Option 2: Azure App Service (Web App for Containers)

1. Create App Service Plan:
   ```bash
   az appservice plan create --name quizgen-plan --resource-group quizgen-rg --sku B1 --is-linux
   ```

2. Create Web App with Container:
   ```bash
   az webapp create \
     --name quizgen-app \
     --resource-group quizgen-rg \
     --plan quizgen-plan \
     --deployment-container-image-name quizgenregistry.azurecr.io/quizgen-frontend:latest
   ```

3. Configure environment variables:
   ```bash
   az webapp config appsettings set \
     --name quizgen-app \
     --resource-group quizgen-rg \
     --settings OPENAI_API_KEY=your_key
   ```

### Environment Variables for Azure

Configure these in Azure Portal or via CLI:

**Backend:**
- `OPENAI_API_KEY` - Your OpenAI API key (required)

**Frontend:**
- `VITE_AD_PROVIDER_ID` - Ad provider ID (optional)
- `VITE_AD_SLOT_TOP` - Top banner ad slot (optional)
- `VITE_AD_SLOT_BOTTOM` - Bottom banner ad slot (optional)
- `VITE_AD_SLOT_VIDEO` - Video ad slot (optional)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/generate-quiz` | Generate quiz |

### Generate Quiz Request

```json
POST /api/generate-quiz
{
  "theme": "JavaScript arrays",
  "questionCount": 5,
  "questionTypes": ["multiple_choice", "open"]
}
```

### Generate Quiz Response

```json
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "What is the correct way to create an array in JavaScript?",
      "options": ["var arr = {}", "var arr = []", "var arr = ()", "var arr = <>"],
      "correct_answer": "var arr = []"
    }
  ]
}
```

## Ad Integration

The app supports ad placeholders at:
- Top of every page
- Bottom of every page
- Video ad during quiz generation
- Video ad before results

To enable ads:
1. Get an ad provider account (AdSense, etc.)
2. Set the environment variables in `.env` or Azure

## Tech Stack

- **Frontend:** React 18, Vite, React Router
- **Backend:** Node.js, Express, OpenAI SDK
- **Container:** Docker, Nginx
- **Cloud:** Azure Container Apps / App Service

## License

MIT
