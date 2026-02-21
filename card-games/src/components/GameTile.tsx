import { Link } from 'react-router-dom'
import type { GameDefinition } from '../games/types'
import { useLanguageStore } from '../i18n'

interface GameTileProps {
  game: GameDefinition
}

export default function GameTile({ game }: GameTileProps) {
  const { t, language } = useLanguageStore()

  return (
    <Link
      to={`/game/${game.id}`}
      className="game-tile block p-6 rounded-2xl group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text group-hover:text-mauve transition-colors">
            {game.name[language]}
          </h2>
          <p className="mt-2 text-subtext0 text-sm leading-relaxed line-clamp-2">
            {game.description[language]}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted">
            <span className="bg-surface0 px-2 py-1 rounded-full">
              {game.cards.length} {t.game.questions}
            </span>
          </div>
        </div>
        <div className="ml-4 text-muted group-hover:text-mauve transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
