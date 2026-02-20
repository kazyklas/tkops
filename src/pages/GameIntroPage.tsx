import { useParams, useNavigate } from 'react-router-dom'
import { getGame } from '../games/registry'
import { useGameStore } from '../store/gameStore'
import { useLanguageStore } from '../i18n'

export default function GameIntroPage() {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const startGame = useGameStore(state => state.startGame)
  const { t, language } = useLanguageStore()
  
  const game = gameId ? getGame(gameId) : undefined

  if (!game) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <h2 className="text-2xl font-semibold text mb-4">{t.game.notFound}</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-mauve hover:text-pink transition-colors underline"
        >
          {t.game.returnHome}
        </button>
      </div>
    )
  }

  const handleStart = () => {
    startGame(game.id)
    navigate(`/game/${game.id}/play`)
  }

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-muted hover:text transition-colors mb-8"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t.game.backToGames}
      </button>

      <div className="bg-mantle rounded-2xl border border-surface0 p-8 sm:p-10 shadow-colored">
        <h1 className="text-3xl sm:text-4xl font-bold text mb-4">
          {game.name[language]}
        </h1>
        
        <p className="text-subtext0 text-lg leading-relaxed mb-8">
          {game.description[language]}
        </p>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text mb-4">{t.game.howToPlay}</h2>
          <ul className="space-y-3">
            {game.rules[language].map((rule, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-mauve/20 text-mauve rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-subtext0 leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-surface0">
          <div className="text-sm text-muted">
            {game.cards.length} {t.game.questions}
          </div>
          <button
            onClick={handleStart}
            className="btn-primary px-6 py-3 rounded-xl font-medium shadow-sm"
          >
            {t.game.startGame}
          </button>
        </div>
      </div>
    </div>
  )
}
