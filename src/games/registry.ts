import type { GameDefinition } from './types'
import { questions36 } from './questions-36'

export const games: GameDefinition[] = [questions36]

export const gamesById: Record<string, GameDefinition> = Object.fromEntries(
  games.map(game => [game.id, game])
)

export function getGame(gameId: string): GameDefinition | undefined {
  return gamesById[gameId]
}
