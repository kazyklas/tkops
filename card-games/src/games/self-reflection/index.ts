import type { GameDefinition } from '../types'
import { cards } from './cards'

export const selfReflection: GameDefinition = {
  id: 'self-reflection',
  name: {
    en: 'Self-Reflection Deck',
    cs: 'Balíček sebereflexe',
  },
  description: {
    en: 'Calm, introspective questions for personal journaling and self-discovery. Create space for inner dialogue and deeper self-understanding.',
    cs: 'Klidné, introspektivní otázky pro osobní psaní deníku a sebepoznání. Vytvořte prostor pro vnitřní dialog a hlubší sebe-pochopení.',
  },
  rules: {
    en: [
      'Find a quiet, comfortable space',
      'Consider journaling your answers',
      'Be completely honest with yourself',
      'Take your time - no rush',
      'Notice what comes up without judgment',
      'Return to cards that resonate deeply',
    ],
    cs: [
      'Najděte klidný, pohodlný prostor',
      'Zvažte zapsání svých odpovědí',
      'Buďte zcela upřímní sami k sobě',
      'Nespěchejte - žádný spěch',
      'Všímejte si, co vzniká bez odsuzování',
      'Vraťte se ke kartám, které rezonují hluboce',
    ],
  },
  cards,
}
