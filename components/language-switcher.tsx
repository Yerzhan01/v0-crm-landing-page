"use client"

import { Button } from "@/components/ui/button"

export function LanguageSwitcher({
  currentLang,
  onLanguageChange,
}: {
  currentLang: "ru" | "kk"
  onLanguageChange: (lang: "ru" | "kk") => void
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-secondary p-1">
      <Button
        variant={currentLang === "ru" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("ru")}
        className="rounded-full px-4 h-8"
      >
        РУ
      </Button>
      <Button
        variant={currentLang === "kk" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("kk")}
        className="rounded-full px-4 h-8"
      >
        ҚЗ
      </Button>
    </div>
  )
}
