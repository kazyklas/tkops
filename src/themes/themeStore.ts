import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeFlavor } from './catppuccin'
import { catppuccinThemes, type ThemeDefinition } from './catppuccin'

interface ThemeStore {
  theme: ThemeFlavor
  themeDefinition: ThemeDefinition
  setTheme: (theme: ThemeFlavor) => void
}

const getThemeDefinition = (theme: ThemeFlavor): ThemeDefinition => 
  catppuccinThemes[theme]

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'mocha',
      themeDefinition: getThemeDefinition('mocha'),
      setTheme: (theme: ThemeFlavor) => set({ 
        theme, 
        themeDefinition: getThemeDefinition(theme) 
      }),
    }),
    {
      name: 'card-game-theme',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.themeDefinition = getThemeDefinition(state.theme)
        }
      },
    }
  )
)

export const applyTheme = (theme: ThemeDefinition) => {
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
  root.classList.toggle('dark', theme.isDark)
}
