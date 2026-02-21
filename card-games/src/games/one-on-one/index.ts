import type { GameDefinition } from '../types'
import { cards } from './cards'

export const oneOnOne: GameDefinition = {
  id: 'one-on-one',
  name: {
    en: '1-on-1 Team Lead',
    cs: '1-na-1 s vedoucím',
  },
  description: {
    en: 'A structured conversation deck for meaningful one-on-one meetings between team leads and team members. Build trust, align goals, and support growth.',
    cs: 'Strukturovaný balíček pro smysluplná individuální setkání mezi vedoucími a členy týmu. Budujte důvěru, slaďujte cíle a podporujte růst.',
  },
  rules: {
    en: [
      'Find a quiet, private space for your meeting',
      'Start with a check-in question to open up',
      'Take turns reading and answering questions',
      'Be honest and open in your responses',
      'Use this as a safe space for feedback',
      'End with clear action items for both parties',
    ],
    cs: [
      'Najděte klidné, soukromé místo pro vaše setkání',
      'Začněte s úvodní otázkou pro otevření dialogu',
      'Střídejte se ve čtení a odpovídání na otázky',
      'Buďte upřímní a otevření ve svých odpovědích',
      'Využijte to jako bezpečný prostor pro zpětnou vazbu',
      'Ukončete jasnými akčními kroky pro obě strany',
    ],
  },
  cards,
}
