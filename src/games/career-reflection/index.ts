import type { GameDefinition } from '../types'
import { cards } from './cards'

export const careerReflection: GameDefinition = {
  id: 'career-reflection',
  name: {
    en: 'Career Reflection',
    cs: 'Kariérní reflexe',
  },
  description: {
    en: 'Deep questions to explore your purpose, strengths, and direction. Perfect for career transitions, annual reviews, or whenever you feel stuck.',
    cs: 'Hluboké otázky k prozkoumání vašeho účelu, silných stránek a směru. Perfektní pro kariérní přechody, roční hodnocení nebo když se cítíte zaseknutí.',
  },
  rules: {
    en: [
      'Find a quiet moment for self-reflection',
      'Answer honestly - no one else needs to see your answers',
      'Consider writing down your responses',
      'Don\'t rush - sit with each question',
      'Notice patterns in your answers',
      'Use insights to inform your next steps',
    ],
    cs: [
      'Najděte klidný okamžik pro sebereflexi',
      'Odpovídejte upřímně - nikdo jiný nemusí vidět vaše odpovědi',
      'Zvažte zapsání svých odpovědí',
      'Nespěchejte - ponořte se do každé otázky',
      'Všimněte si vzorů ve svých odpovědích',
      'Využijte poznatky k informování dalších kroků',
    ],
  },
  cards,
}
