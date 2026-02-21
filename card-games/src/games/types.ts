import type { Language } from '../i18n'

export interface Card {
  id: string
  content: string
}

export interface LocalizedCard {
  id: string
  content: Record<Language, string>
}

export interface GameDefinition {
  id: string
  name: Record<Language, string>
  description: Record<Language, string>
  rules: Record<Language, string[]>
  cards: LocalizedCard[]
}

export interface GameState {
  currentGameId: string | null
  currentCardIndex: number
  isFlipped: boolean
  isActive: boolean
}
