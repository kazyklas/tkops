import { games } from '../games/registry'
import GameTile from '../components/GameTile'
import { useLanguageStore } from '../i18n'

export default function HomePage() {
  const { t } = useLanguageStore()

  return (
    <div className="min-h-[80vh] flex flex-col animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-mauve via-pink to-lavender bg-clip-text text-transparent">
          {t.home.title}
        </h1>
        <p className="text-subtext0 text-lg max-w-md mx-auto">
          {t.home.subtitle}
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {games.map(game => (
          <GameTile key={game.id} game={game} />
        ))}
      </div>

      {games.length === 0 && (
        <div className="text-center py-12 text-muted">
          {t.home.noGames}
        </div>
      )}
    </div>
  )
}
