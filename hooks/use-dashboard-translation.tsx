"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getTranslation } from "@/lib/translations"

type Language = "ru" | "kk"

interface LanguageContextType {
  lang: Language
  changeLang: (lang: Language) => void
  t: ReturnType<typeof getTranslation>
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ru")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dashboardLang") as Language
      if (stored && (stored === "ru" || stored === "kk")) {
        setLang(stored)
      }
    } catch (error) {
      console.error("Failed to load language preference:", error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("dashboardLang", lang)
    } catch (error) {
      console.error("Failed to save language preference:", error)
    }
  }, [lang])

  const t = getTranslation(lang)

  return <LanguageContext.Provider value={{ lang, changeLang: setLang, t }}>{children}</LanguageContext.Provider>
}

export function useDashboardTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useDashboardTranslation must be used within LanguageProvider")
  }
  return context
}
