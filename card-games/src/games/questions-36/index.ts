import type { GameDefinition } from '../types'
import { cards } from './cards'

export const questions36: GameDefinition = {
  id: 'questions-36',
  name: {
    en: '36 Questions to Fall in Love',
    cs: '36 otázek k zamilování',
  },
  description: {
    en: 'A series of 36 questions designed by psychologist Arthur Aron to create closeness between two strangers. Take turns answering each question honestly and openly.',
    cs: 'Série 36 otázek navržených psychologem Arthurem Aronem k vytvoření důvěrnosti mezi dvěma cizinci. Střídejte se v odpovídání na každou otázku upřímně a otevřeně.',
  },
  rules: {
    en: [
      'Find a quiet space where you won\'t be interrupted',
      'Take turns answering each question',
      'Answer each question as honestly and openly as you can',
      'Move through the cards sequentially - don\'t skip ahead',
      'Take your time with each question',
      'Listen actively when your partner is speaking',
    ],
    cs: [
      'Najděte klidné místo, kde vás nikdo nebude rušit',
      'Střídejte se v odpovídání na otázky',
      'Odpovídejte na každou otázku co nejupřímněji a nejotevřeněji',
      'Procházejte karty postupně - nepřeskakujte',
      'Věnujte každé otázce dostatek času',
      'Aktivně naslouchejte, když mluví váš partner',
    ],
  },
  cards,
}
