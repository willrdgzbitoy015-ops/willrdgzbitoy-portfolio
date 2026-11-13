import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { loadItem, saveItem, STORAGE_KEYS } from '../lib/storage'
import { ceb } from './ceb'
import { en } from './en'
import type { Dictionary, TranslationKey } from './en'

const dictionaries = { en, ceb } satisfies Record<string, Dictionary>

/** 'en' | 'ceb' (ceb is the language code for Cebuano / Bisaya). */
export type Lang = keyof typeof dictionaries

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Translate: t('nav.about') -> "About" or "Bahin nako". The key is type-checked. */
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with the saved language (if any), otherwise English.
  const [lang, setLangState] = useState<Lang>(() =>
    loadItem(STORAGE_KEYS.lang) === 'ceb' ? 'ceb' : 'en',
  )

  // Keep <html lang="..."> correct so screen readers pronounce the page properly.
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    saveItem(STORAGE_KEYS.lang, next)
  }, [])

  // Changing `lang` re-renders everything that calls t(), so the switch is instant.
  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: (key) => dictionaries[lang][key] }),
    [lang, setLang],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}

// eslint-disable-next-line react-refresh/only-export-components -- the hook belongs next to its provider
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return ctx
}
