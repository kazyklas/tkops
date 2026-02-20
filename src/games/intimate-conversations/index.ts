import type { GameDefinition } from '../types'
import { cards } from './cards'

export const intimateConversations: GameDefinition = {
  id: 'intimate-conversations',
  name: {
    en: 'Intimate Conversations',
    cs: 'Intimní rozhovory',
  },
  description: {
    en: 'Sensual and emotional questions for couples to explore desire, connection, and intimacy. 18+ - Perfect for deepening your physical and emotional bond.',
    cs: 'Smyslné a emocionální otázky pro páry k prozkoumání touhy, spojení a intimity. 18+ - Perfektní pro prohloubení vaší fyzické a emoční vazby.',
  },
  rules: {
    en: [
      'Create a private, romantic atmosphere',
      'Both partners should feel comfortable and safe',
      'Share openly - no judgment here',
      'Take your time with each question',
      'Physical closeness can enhance the experience',
      'Respect each other\'s boundaries always',
    ],
    cs: [
      'Vytvořte soukromou, romantickou atmosféru',
      'Oba partneři by se měli cítit pohodlně a bezpečně',
      'Sdílejte otevřeně - bez odsuzování',
      'Věnujte čas každé otázce',
      'Fyzická blízkost může zlepšit zážitek',
      'Vždy respektujte hranice druhého',
    ],
  },
  cards,
}
