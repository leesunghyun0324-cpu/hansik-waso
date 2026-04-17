'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Locale } from './types'

interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'ko',
  setLocale: () => {},
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ko')

  useEffect(() => {
    const stored = localStorage.getItem('hansik-locale') as Locale | null
    if (stored === 'ko' || stored === 'en') {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('hansik-locale', l)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocaleContext() {
  return useContext(LocaleContext)
}
