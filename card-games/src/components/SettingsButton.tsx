import { useState, useRef, useEffect } from 'react'
import { useLanguageStore, type Language } from '../i18n'
import { useThemeStore, themeList, applyTheme, type ThemeFlavor } from '../themes'

interface SettingsButtonProps {
  className?: string
}

export default function SettingsButton({ className = '' }: SettingsButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const { language, setLanguage, t } = useLanguageStore()
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleThemeChange = (newTheme: ThemeFlavor) => {
    setTheme(newTheme)
    applyTheme(themeList.find(themeDef => themeDef.name === newTheme)!)
  }

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-surface hover:bg-surface1 transition-all duration-200 group"
        aria-label="Settings"
      >
        <svg 
          className="w-5 h-5 text-subtext0 group-hover:text-text transition-colors" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-mantle rounded-2xl shadow-xl border border-surface0 p-4 animate-scale-in z-50">
          <h3 className="text-sm font-semibold text-subtext1 mb-4 uppercase tracking-wider">
            {t.settings.title}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-subtext0 mb-2 block">
                {t.settings.language}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['en', 'cs'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      language === lang
                        ? 'bg-mauve text-base'
                        : 'bg-surface0 text-subtext1 hover:bg-surface1'
                    }`}
                  >
                    {t.languages[lang]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-subtext0 mb-2 block">
                {t.settings.theme}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {themeList.map((themeDef) => (
                  <button
                    key={themeDef.name}
                    onClick={() => handleThemeChange(themeDef.name)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      theme === themeDef.name
                        ? 'bg-mauve text-base'
                        : 'bg-surface0 text-subtext1 hover:bg-surface1'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ 
                        background: `linear-gradient(135deg, ${themeDef.colors.mauve}, ${themeDef.colors.pink})` 
                      }}
                    />
                    {t.themes[themeDef.name]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
