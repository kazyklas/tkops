import type { GameDefinition } from './types'
import { questions36 } from './questions-36'
import { oneOnOne } from './one-on-one'
import { careerReflection } from './career-reflection'
import { couplesDeepTalk } from './couples-deep-talk'
import { intimateConversations } from './intimate-conversations'
import { friendsDeepTalk } from './friends-deep-talk'
import { partyIcebreaker } from './party-icebreaker'
import { selfReflection } from './self-reflection'

export const games: GameDefinition[] = [
  questions36,
  oneOnOne,
  careerReflection,
  couplesDeepTalk,
  intimateConversations,
  friendsDeepTalk,
  partyIcebreaker,
  selfReflection,
]

export const gamesById: Record<string, GameDefinition> = Object.fromEntries(
  games.map(game => [game.id, game])
)

export function getGame(gameId: string): GameDefinition | undefined {
  return gamesById[gameId]
}
