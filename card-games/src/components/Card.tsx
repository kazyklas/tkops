import type { LocalizedCard } from '../games/types'
import { useLanguageStore } from '../i18n'
import { useThemeStore } from '../themes'

interface CardProps {
  card: LocalizedCard
  isFlipped: boolean
  onFlip: () => void
  cardNumber: number
  totalCards: number
}

export default function Card({ card, isFlipped, onFlip, cardNumber, totalCards }: CardProps) {
  const { t, language } = useLanguageStore()
  const themeDefinition = useThemeStore(state => state.themeDefinition)

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-4 text-muted font-medium">
        {t.game.questionOf} {cardNumber} {t.game.questions} {totalCards}
      </div>
      
      <div 
        className="perspective-1000 cursor-pointer"
        onClick={onFlip}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? onFlip() : null}
      >
        <div 
          className={`
            relative w-full aspect-[3/4] sm:aspect-[4/5] transition-transform duration-500 ease-in-out
            preserve-3d
            ${isFlipped ? 'rotate-y-180' : ''}
          `}
        >
          <div 
            className="absolute inset-0 backface-hidden rounded-2xl card-front-gradient shadow-colored flex items-center justify-center"
            style={{ border: `1px solid ${themeDefinition.colors.lavender}40` }}
          >
            <div className="text-center p-8">
              <div className="text-6xl mb-4">✨</div>
              <div className="text-white/90 text-lg font-medium">
                {t.game.tapToReveal}
              </div>
            </div>
          </div>

          <div 
            className="absolute inset-0 backface-hidden rounded-2xl rotate-y-180 bg-mantle shadow-colored flex items-center justify-center p-6 sm:p-8"
            style={{ border: `1px solid ${themeDefinition.colors.surface0}` }}
          >
            <p className="text text-lg sm:text-xl leading-relaxed text-center font-medium">
              {card.content[language]}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-muted text-sm">
        {isFlipped ? t.game.clickToFlipBack : t.game.clickToFlip}
      </div>
    </div>
  )
}
