# LearnHub

A content-driven learning platform where knowledge is organized into themes (broad subjects), each containing lectures ordered from beginner to advanced.

## Features

- **Theme-based organization** - Content organized into themes with multiple lectures
- **Difficulty progression** - Lectures ordered from beginner to advanced
- **Progress tracking** - Track completed lectures via localStorage
- **Dark mode support** - System preference detection with manual toggle
- **MDX content** - Rich markdown with React components support
- **Topic requests** - Submit new topic ideas via GitHub Issues

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MDX
- gray-matter

## Getting Started

### Prerequisites

- Node.js 20+

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker

```bash
# Build Docker image
docker build -t learnhub .

# Run container
docker run -p 3000:3000 learnhub
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Required variables for topic request feature:
- `GITHUB_TOKEN` - GitHub Personal Access Token
- `GITHUB_REPO` - Repository in format `owner/repo`

## Content Structure

Add themes to `content/themes/`:

```
content/themes/
  my-theme/
    theme.yaml              # Theme metadata
    lectures/
      01-intro.mdx       # Lecture files (prefix with 01, 02, etc.)
      02-advanced.mdx
```

### theme.yaml Format

```yaml
title: "Theme Title"
description: "Theme description"
tags: ["tag1", "tag2"]
coverImage: "/images/theme.png"
```

### Lecture Frontmatter

```yaml
---
title: "Lecture Title"
difficulty: "beginner" | "intermediate" | "advanced"
estimatedMinutes: 15
description: "Short description"
order: 1
---

# Lecture Content

Your MDX content here...
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── request/            # Topic request page
│   ├── api/                # API routes
│   └── themes/[slug]/       # Theme pages
├── components/             # React components
├── lib/                    # Utilities
├── content/                # MDX content
└── public/                 # Static assets
```

## Difficulty Badges

- **Beginner** - Green badge
- **Intermediate** - Amber badge
- **Advanced** - Red badge

## License

MIT