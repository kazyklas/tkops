# Quiz Generator - Technical Specification

## 1. Project Overview

**Project Name:** QuizGen AI
**Project Type:** Full-stack Web Application
**Core Functionality:** AI-powered quiz generator that creates custom quizzes on any topic using OpenAI
**Target Users:** Students, professionals, educators, and anyone wanting to test their knowledge

## 2. Architecture

### Tech Stack
- **Frontend:** React 18 with Vite
- **Backend:** Node.js with Express
- **AI:** OpenAI API (GPT-4)
- **State Management:** React Context + useReducer
- **Styling:** CSS Modules with CSS Variables
- **Containerization:** Docker

### Project Structure
```
quiz-generator/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── package.json
├── backend/           # Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.js
│   └── package.json
├── docker-compose.yml
├── Dockerfile.frontend
├── Dockerfile.backend
└── .env.example
```

## 3. UI/UX Specification

### Color Palette

#### Light Theme
- **Background Primary:** `#FAFAFA`
- **Background Secondary:** `#FFFFFF`
- **Background Card:** `#FFFFFF`
- **Text Primary:** `#1A1A2E`
- **Text Secondary:** `#4A4A68`
- **Text Muted:** `#8A8AA3`
- **Accent Primary:** `#6366F1` (Indigo)
- **Accent Hover:** `#4F46E5`
- **Accent Secondary:** `#10B981` (Emerald)
- **Error:** `#EF4444`
- **Success:** `#22C55E`
- **Border:** `#E5E7EB`
- **Border Focus:** `#6366F1`

#### Dark Theme
- **Background Primary:** `#0F0F1A`
- **Background Secondary:** `#1A1A2E`
- **Background Card:** `#252542`
- **Text Primary:** `#F8FAFC`
- **Text Secondary:** `#CBD5E1`
- **Text Muted:** `#64748B`
- **Accent Primary:** `#818CF8`
- **Accent Hover:** `#A5B4FC`
- **Accent Secondary:** `#34D399`
- **Error:** `#F87171`
- **Success:** `#4ADE80`
- **Border:** `#334155`
- **Border Focus:** `#818CF8`

### Typography
- **Font Family:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Heading 1:** 2.5rem (40px), weight 700
- **Heading 2:** 1.75rem (28px), weight 600
- **Heading 3:** 1.25rem (20px), weight 600
- **Body:** 1rem (16px), weight 400
- **Small:** 0.875rem (14px), weight 400
- **Caption:** 0.75rem (12px), weight 500

### Spacing System
- **xs:** 4px
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **2xl:** 48px
- **3xl:** 64px

### Responsive Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Components

#### Landing Page
1. **Header**
   - Logo/App name on left
   - Theme toggle (sun/moon icon) on right
   - Fixed position, blurred background

2. **Hero Section**
   - App title: "QuizGen AI"
   - Subtitle: "Generate custom quizzes on any topic"
   - Description emphasizing: "The more detailed and specific your quiz theme is, the better and more accurate the questions will be."

3. **Configuration Panel**
   - Card with shadow and rounded corners (16px radius)
   - Question type checkboxes (Multiple Choice, Open-ended, Both)
   - Number selector (1-40) with increment/decrement buttons
   - Theme input: Chat-like textarea with placeholder
   - Submit button: Full-width, accent color, loading state

4. **Footer**
   - Copyright text
   - Ad placeholder at top and bottom

#### Quiz Page
1. **Progress Bar**
   - Shows "Question X of Y"
   - Visual progress indicator

2. **Question Card**
   - Question number badge
   - Question text
   - Options (for multiple choice) as clickable buttons
   - Text input (for open-ended)
   - Navigation: Previous/Next buttons
   - Smooth slide animation between questions

3. **Loading State**
   - Skeleton loaders
   - Video ad placeholder
   - "Generating your quiz..." message

#### Results Page
1. **Score Display**
   - Large score number
   - Percentage
   - Performance message (Excellent/Good/Needs Practice)

2. **Answer Review**
   - List of all questions
   - User's answer vs correct answer
   - Visual indicator (checkmark/x) for correct/incorrect

3. **Video Ad Placeholder**
   - Displayed before results

### Animations
- **Page transitions:** Fade in (300ms ease)
- **Card hover:** Subtle lift with shadow (transform: translateY(-2px))
- **Button hover:** Background color transition (150ms)
- **Question navigation:** Slide left/right (250ms ease-out)
- **Progress bar:** Smooth width transition (300ms)
- **Theme toggle:** Smooth color transition (200ms)

## 4. Functionality Specification

### Frontend Features

#### Landing Page
- [ ] Display app title and description
- [ ] Question type selection (checkboxes)
- [ ] Number of questions input (1-40 range)
- [ ] Theme text input with placeholder
- [ ] Form validation before submit
- [ ] Theme toggle (light/dark)
- [ ] Persistent theme preference (localStorage)

#### Quiz Generation
- [ ] Show loading state with ad placeholder
- [ ] Send configuration to backend
- [ ] Handle API errors gracefully
- [ ] Navigate to quiz on success

#### Quiz Taking
- [ ] Display questions one at a time
- [ ] Track user answers
- [ ] Navigate between questions
- [ ] Show progress indicator
- [ ] Handle both multiple choice and open-ended

#### Results
- [ ] Play video ad before results
- [ ] Calculate and display score
- [ ] Show detailed answer review
- [ ] Option to start new quiz

### Backend Features

#### API Endpoints

**POST /api/generate-quiz**
- Request body:
  ```json
  {
    "theme": "string",
    "questionCount": number (1-40),
    "questionTypes": ["multiple_choice", "open"] 
  }
  ```
- Response:
  ```json
  {
    "questions": [
      {
        "type": "multiple_choice" | "open",
        "question": "string",
        "options": ["A", "B", "C", "D"] | null,
        "correct_answer": "string"
      }
    ]
  }
  ```
- Validates input
- Generates OpenAI prompt
- Returns JSON quiz data

**GET /api/health**
- Returns health status

### Ad Integration
- Ad placeholders at top and bottom of all pages
- Video ad placeholder during quiz generation
- Video ad placeholder before results
- Ad provider configuration via environment variables:
  - `VITE_AD_PROVIDER_ID`
  - `VITE_AD_SLOT_TOP`
  - `VITE_AD_SLOT_BOTTOM`
  - `VITE_AD_SLOT_VIDEO`

## 5. Environment Variables

### Backend (.env)
```
PORT=3001
NODE_ENV=development
OPENAI_API_KEY=your_openai_key_here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
VITE_AD_PROVIDER_ID=your_ad_provider_id
VITE_AD_SLOT_TOP=your_top_ad_slot
VITE_AD_SLOT_BOTTOM=your_bottom_ad_slot
VITE_AD_SLOT_VIDEO=your_video_ad_slot
```

## 6. Docker Configuration

### Dockerfile.backend
- Node.js 20 Alpine
- Install dependencies
- Copy source
- Expose port 3001
- Start server

### Dockerfile.frontend
- Node.js 20 for build
- Install dependencies
- Build React app
- Serve with Nginx

### docker-compose.yml
- Backend service
- Frontend service
- Nginx reverse proxy

## 7. Azure Deployment

### Azure App Service
- Deploy using Docker Compose
- Configure environment variables in Azure Portal
- Set up custom domain (optional)
- Enable HTTPS

### Deployment Steps
1. Push code to GitHub
2. Connect to Azure App Service
3. Configure environment variables
4. Deploy using Azure Container Apps or App Service

## 8. Acceptance Criteria

### Visual
- [ ] Light and dark themes work correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Smooth animations and transitions
- [ ] Clean, modern UI

### Functional
- [ ] Quiz generates correctly with OpenAI
- [ ] Question count enforced (1-40)
- [ ] Both question types work
- [ ] Navigation between questions works
- [ ] Score calculation is accurate
- [ ] Theme preference persists

### Technical
- [ ] No hardcoded secrets
- [ ] Docker builds successfully
- [ ] API handles errors gracefully
- [ ] Ready for Azure deployment
