import { useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { getGame } from '../games/registry'
import CardComponent from '../components/Card'
import { useEffect } from 'react'
import { useLanguageStore } from '../i18n'

export default function GamePlayPage() {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const { t } = useLanguageStore()
  
  const { 
    currentCardIndex, 
    isFlipped, 
    isActive,
    flipCard, 
    unflipCard, 
    nextCard, 
    previousCard,
    endGame 
  } = useGameStore()
  
  const game = gameId ? getGame(gameId) : undefined
  const currentCard = game?.cards[currentCardIndex]
  const isLastCard = game ? currentCardIndex === game.cards.length - 1 : false
  const isFirstCard = currentCardIndex === 0

  useEffect(() => {
    if (!isActive && game) {
      navigate(`/game/${game.id}`)
    }
  }, [isActive, game, navigate])

  if (!game || !currentCard) {
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

  const handleCardClick = () => {
    if (isFlipped) {
      unflipCard()
    } else {
      flipCard()
    }
  }

  const handleEndGame = () => {
    endGame()
    navigate('/')
  }

  const handleRestart = () => {
    endGame()
    navigate(`/game/${game.id}`)
  }

  return (
    <div className="min-h-[80vh] flex flex-col animate-fade-in">
      <button 
        onClick={handleEndGame}
        className="flex items-center gap-2 text-muted hover:text transition-colors mb-6 self-start"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {t.game.endGame}
      </button>

      <div className="flex-1 flex flex-col justify-center">
        <CardComponent
          card={currentCard}
          isFlipped={isFlipped}
          onFlip={handleCardClick}
          cardNumber={currentCardIndex + 1}
          totalCards={game.cards.length}
        />
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {!isFirstCard && (
          <button
            onClick={previousCard}
            className="btn-secondary px-6 py-3 rounded-xl font-medium"
          >
            {t.game.previous}
          </button>
        )}
        
        {!isLastCard ? (
          <button
            onClick={nextCard}
            className="btn-primary px-6 py-3 rounded-xl font-medium shadow-sm"
          >
            {t.game.nextQuestion}
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="btn-secondary px-6 py-3 rounded-xl font-medium"
            >
              {t.game.playAgain}
            </button>
            <button
              onClick={handleEndGame}
              className="btn-primary px-6 py-3 rounded-xl font-medium shadow-sm"
            >
              {t.game.finish}
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="h-2 progress-bar rounded-full overflow-hidden">
          <div 
            className="h-full progress-fill transition-all duration-300 ease-out"
            style={{ width: `${((currentCardIndex + 1) / game.cards.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
