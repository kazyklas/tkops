import type { GameDefinition } from '../types'
import { cards } from './cards'

export const partyIcebreaker: GameDefinition = {
  id: 'party-icebreaker',
  name: {
    en: 'Party Icebreaker',
    cs: 'Párty prolamovač ledu',
  },
  description: {
    en: 'Light, playful questions perfect for breaking the ice at parties, team events, or social gatherings. Quick, fun, and sure to get people laughing.',
    cs: 'Lehké, hravé otázky perfektní pro prolomení ledu na párty, týmových akcích nebo společenských setkáních. Rychlé, zábavné a jistě rozesmějí lidi.',
  },
  rules: {
    en: [
      'Gather your group',
      'Take turns drawing and answering cards',
      'Keep answers short and entertaining',
      'Feel free to skip cards or pass',
      'Laughter is mandatory',
      'Perfect for large groups - quick rounds!',
    ],
    cs: [
      'Shromážděte svou skupinu',
      'Střídejte se v tažení a odpovídání na karty',
      'Udržujte odpovědi krátké a zábavné',
      'Klidně přeskočte nebo předejte',
      'Smích je povinný',
      'Perfektní pro velké skupiny - rychlá kola!',
    ],
  },
  cards,
}
