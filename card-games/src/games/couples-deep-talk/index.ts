import type { GameDefinition } from '../types'
import { cards } from './cards'

export const couplesDeepTalk: GameDefinition = {
  id: 'couples-deep-talk',
  name: {
    en: 'Couples Deep Talk',
    cs: 'Hluboké rozhovory pro páry',
  },
  description: {
    en: 'Intimate questions for couples to deepen your connection. Explore memories, values, and dreams together in a safe, loving space.',
    cs: 'Intimní otázky pro páry k prohloubení vašeho spojení. Prozkoumejte společně vzpomínky, hodnoty a sny v bezpečném, láskyplném prostoru.',
  },
  rules: {
    en: [
      'Create a comfortable, intimate atmosphere',
      'Take turns answering each question',
      'Listen actively without interrupting',
      'Be vulnerable and honest',
      'No judgment - this is a safe space',
      'Follow up with a hug or moment of connection',
    ],
    cs: [
      'Vytvořte pohodlnou, intimní atmosféru',
      'Střídejte se v odpovídání na otázky',
      'Naslouchejte aktivně bez přerušování',
      'Buďte zranitelní a upřímní',
      'Žádné odsuzování - toto je bezpečný prostor',
      'Ukončete objetím nebo okamžikem spojení',
    ],
  },
  cards,
}
