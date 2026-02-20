import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Language, Translation } from './translations'
import { translations } from './translations'

interface LanguageStore {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translation
}

const getTranslation = (lang: Language): Translation => translations[lang]

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      t: getTranslation('en'),
      setLanguage: (lang: Language) => set({ 
        language: lang, 
        t: getTranslation(lang) 
      }),
    }),
    {
      name: 'card-game-language',
      partialize: (state) => ({ language: state.language }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = getTranslation(state.language)
        }
      },
    }
  )
)

export const t = () => useLanguageStore.getState().t
