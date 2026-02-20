# Card Game Platform

A modern, extensible card game platform built with React, TypeScript, and Tailwind CSS. Designed for meaningful conversations and easy to extend with new games.

## Features

- **Game Picker**: Browse and select from available card games
- **Game Introduction**: Read rules and instructions before playing
- **Interactive Cards**: Smooth flip animations reveal questions
- **Progress Tracking**: Visual progress bar and question counter
- **Mobile-First**: Responsive design that works on any device
- **Internationalization**: Support for multiple languages (English, Czech)
- **Beautiful Themes**: 4 Catppuccin color themes with persistence
- **Kubernetes Ready**: Production-ready deployment manifests included

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## Architecture

### Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 18 + TypeScript | Component-based UI |
| Build | Vite | Fast development and optimized builds |
| Styling | Tailwind CSS + CSS Variables | Utility-first with dynamic theming |
| State | Zustand | Simple, predictable state management |
| Routing | React Router | Client-side navigation |
| i18n | Custom Zustand store | Lightweight internationalization |

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Card.tsx         # Flip card with animation
│   ├── GameTile.tsx     # Game selection tile
│   ├── Layout.tsx       # Page wrapper with theme
│   └── SettingsButton.tsx # Language & theme picker
├── games/               # Game definitions (data-driven)
│   ├── types.ts         # Game type interfaces
│   ├── registry.ts      # Game registry and lookup
│   └── questions-36/    # "36 Questions" game
│       ├── index.ts     # Game definition
│       └── cards.ts     # Localized card content
├── i18n/                # Internationalization
│   ├── translations.ts  # All translations
│   └── languageStore.ts # Language state
├── themes/              # Catppuccin themes
│   ├── catppuccin.ts    # Theme definitions
│   └── themeStore.ts    # Theme state
├── pages/               # Route pages
│   ├── HomePage.tsx     # Game picker
│   ├── GameIntroPage.tsx # Rules and intro
│   └── GamePlayPage.tsx # Card gameplay
├── store/               # State management
│   └── gameStore.ts     # Zustand store
├── App.tsx              # App root with routes
├── main.tsx             # Entry point
└── index.css            # Global styles + CSS variables
```

### State Management

The app uses Zustand for simple, predictable state:

```typescript
// Game state is managed in a single store
const { 
  currentCardIndex,  // Current card position
  isFlipped,         // Card flip state
  startGame,         // Initialize game
  flipCard,          // Flip animation trigger
  nextCard,          // Progress to next card
  endGame            // Clean up and exit
} = useGameStore()

// Language state with localStorage persistence
const { language, setLanguage, t } = useLanguageStore()

// Theme state with localStorage persistence
const { theme, setTheme, themeDefinition } = useThemeStore()
```

## Internationalization

The app supports multiple languages with a lightweight custom solution:

### Supported Languages

- **English** (en)
- **Czech** (cs)

### Adding a New Language

1. Add language to `src/i18n/translations.ts`:

```typescript
export type Language = 'en' | 'cs' | 'de' // Add new language

export const translations: Record<Language, Translation> = {
  en: { ... },
  cs: { ... },
  de: { // Add translations
    app: { title: 'Kartenspiele', description: '...' },
    // ... all other keys
  },
}
```

2. Update the language picker in `src/components/SettingsButton.tsx`:

```typescript
{(['en', 'cs', 'de'] as Language[]).map((lang) => (
  // ...
))}
```

### Using Translations

```typescript
import { useLanguageStore } from '../i18n'

function MyComponent() {
  const { t } = useLanguageStore()
  return <h1>{t.home.title}</h1>
}
```

## Theming

The app uses [Catppuccin](https://github.com/catppuccin/catppuccin) color palette with 4 beautiful themes:

| Theme | Type | Description |
|-------|------|-------------|
| **Latte** | Light | Warm, creamy light theme |
| **Frappé** | Dark | Soft, muted dark theme |
| **Macchiato** | Dark | Medium contrast dark theme |
| **Mocha** | Dark | High contrast dark theme (default) |

### Theme Colors

All themes use CSS variables for dynamic theming:

```css
--color-mauve      /* Primary accent */
--color-pink       /* Secondary accent */
--color-lavender   /* Tertiary accent */
--color-base       /* Background */
--color-mantle     /* Card background */
--color-text       /* Primary text */
--color-subtext0   /* Secondary text */
--color-surface0   /* Borders, inputs */
```

### Using Theme Colors in Components

```tsx
<div className="bg-mantle text-text border-surface0">
  <span className="text-mauve">Accent text</span>
</div>
```

## Adding a New Game

### 1. Create Game Folder

```bash
mkdir src/games/my-new-game
```

### 2. Define Localized Cards

Create `src/games/my-new-game/cards.ts`:

```typescript
import type { LocalizedCard } from '../types'

export const cards: LocalizedCard[] = [
  { 
    id: 'c1', 
    content: { 
      en: 'Your first question', 
      cs: 'Vaše první otázka' 
    } 
  },
  { 
    id: 'c2', 
    content: { 
      en: 'Your second question', 
      cs: 'Vaše druhá otázka' 
    } 
  },
]
```

### 3. Create Localized Game Definition

Create `src/games/my-new-game/index.ts`:

```typescript
import type { GameDefinition } from '../types'
import { cards } from './cards'

export const myNewGame: GameDefinition = {
  id: 'my-new-game',
  name: {
    en: 'My New Game',
    cs: 'Moje nová hra',
  },
  description: {
    en: 'A short description of your game',
    cs: 'Stručný popis vaší hry',
  },
  rules: {
    en: [
      'First rule of the game',
      'Second rule of the game',
    ],
    cs: [
      'První pravidlo hry',
      'Druhé pravidlo hry',
    ],
  },
  cards,
}
```

### 4. Register the Game

Update `src/games/registry.ts`:

```typescript
import { myNewGame } from './my-new-game'

export const games: GameDefinition[] = [
  questions36,
  myNewGame,  // Add your game here
]
```

That's it! The game will automatically appear on the home page with full i18n support.

## Deployment

### Docker Build

```bash
# Build the Docker image
docker build -t card-game-platform:latest .

# Run locally
docker run -p 8080:80 card-game-platform:latest

# Open http://localhost:8080
```

### Kubernetes Deployment

```bash
# Apply all manifests
kubectl apply -k k8s/

# Or apply individually
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml

# Verify deployment
kubectl get pods -l app=card-game-platform
kubectl get services
kubectl get ingress
```

### Production Checklist

- [ ] Update `image` in `k8s/deployment.yaml` to your registry
- [ ] Configure Ingress host for your domain
- [ ] Add TLS certificates (via cert-manager or manually)
- [ ] Set up horizontal pod autoscaler if needed
- [ ] Configure resource limits for your cluster

## Included Games

### 36 Questions to Fall in Love

A series of 36 questions developed by psychologist Arthur Aron to create closeness between strangers. Designed for two people to answer together, taking turns with each question.

**How to play:**
1. Find a quiet space with your partner
2. Take turns answering each question
3. Answer honestly and openly
4. Listen actively when your partner speaks
5. Move through all 36 questions

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Tech Decisions

**Why Vite?**
- Fast HMR for development
- Optimized production builds
- Native ESM support

**Why Zustand over Redux?**
- Minimal boilerplate (3KB vs 15KB)
- No providers needed
- Sufficient for this app's scope

**Why Tailwind CSS?**
- Rapid prototyping
- Consistent design system
- Small production bundle (tree-shaking)

**Why Nginx for serving?**
- Tiny image size (~50MB vs 900MB+ for Node)
- Optimized for static files
- Built-in compression and caching

## Extending the Platform

### Future Features (Easy to Add)

The architecture supports these extensions without major refactoring:

- **Timers**: Add timer state to game store
- **Notes**: Extend game state with notes array
- **Multiple Players**: Add player tracking to state
- **Authentication**: Add auth layer, protect routes
- **Backend API**: Swap static JSON for API calls
- **New Games**: Follow the "Adding a New Game" guide
- **More Languages**: Add translations in `src/i18n/translations.ts`
- **More Themes**: Add theme definitions in `src/themes/catppuccin.ts`

### Pattern for New Features

1. **Add to types**: Define interfaces in `src/games/types.ts`
2. **Extend store**: Add state and actions to `useGameStore`
3. **Update UI**: Modify components to use new state
4. **Test**: Build and verify

## License

MIT