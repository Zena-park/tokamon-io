import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import en from './locales/en.json'
import ko from './locales/ko.json'

type Language = 'en' | 'ko'

const translations: Record<Language, Record<string, unknown>> = { en, ko }

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

function translate(language: Language, key: string, vars?: Record<string, string>): unknown {
  let value = getNestedValue(translations[language], key)

  // Fallback to English
  if (value === undefined && language !== 'en') {
    value = getNestedValue(translations.en, key)
  }

  // Fallback to key string
  if (value === undefined) {
    return key
  }

  // String interpolation: {{var}}
  if (typeof value === 'string' && vars) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, k: string) => vars[k] ?? `{{${k}}}`)
  }

  return value
}

const STORAGE_KEY = 'tokamon-lang'

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'ko') return stored
  return 'en'
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, vars?: Record<string, string>) => ReturnType<typeof translate>
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const t = useCallback((key: string, vars?: Record<string, string>) => {
    return translate(language, key, vars)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
