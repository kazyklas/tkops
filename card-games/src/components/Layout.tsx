import { useEffect, type ReactNode } from 'react'
import { useThemeStore, applyTheme } from '../themes'
import SettingsButton from './SettingsButton'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const themeDefinition = useThemeStore(state => state.themeDefinition)

  useEffect(() => {
    applyTheme(themeDefinition)
  }, [themeDefinition])

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${themeDefinition.colors.mauve}, transparent)` }}
        />
        <div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: `radial-gradient(circle, ${themeDefinition.colors.pink}, transparent)` }}
        />
      </div>

      <header className="fixed top-4 right-4 z-40">
        <SettingsButton />
      </header>

      <main className="container mx-auto px-4 py-8 pt-20 max-w-4xl relative z-10">
        {children}
      </main>
    </div>
  )
}
