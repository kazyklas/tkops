import type { GameDefinition } from '../types'
import { cards } from './cards'

export const friendsDeepTalk: GameDefinition = {
  id: 'friends-deep-talk',
  name: {
    en: 'Friends Deep Talk',
    cs: 'Hluboké rozhovory s přáteli',
  },
  description: {
    en: 'Fun and meaningful questions to bond with friends. Perfect for road trips, sleepovers, or any time you want to connect on a deeper level.',
    cs: 'Zábavné a smysluplné otázky k vytvoření pout s přáteli. Perfektní pro výlety, přenocování nebo kdykoliv, když se chcete spojit na hlubší úrovni.',
  },
  rules: {
    en: [
      'Gather your friend group together',
      'Take turns picking and answering questions',
      'Be honest - vulnerability builds trust',
      'Listen actively to each answer',
      'Feel free to skip if a question feels too personal',
      'Have fun getting to know each other better',
    ],
    cs: [
      'Shromážděte svou skupinu přátel',
      'Střídejte se ve výběru a odpovídání na otázky',
      'Buďte upřímní - zranitelnost buduje důvěru',
      'Aktivně naslouchejte každé odpovědi',
      'Klidně přeskočte, pokud je otázka příliš osobní',
      'Bavte se při poznávání se navzájem lépe',
    ],
  },
  cards,
}
