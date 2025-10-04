export const getLocale = (lang: string): string => {
  return lang === "kk" ? "kk-KZ" : "ru-RU"
}

export const formatDate = (date: Date | string, lang: string, options?: Intl.DateTimeFormatOptions): string => {
  const locale = getLocale(lang)
  const dateObj = typeof date === "string" ? new Date(date) : date

  return dateObj.toLocaleDateString(locale, options)
}

export const formatTime = (date: Date | string, lang: string): string => {
  const locale = getLocale(lang)
  const dateObj = typeof date === "string" ? new Date(date) : date

  return dateObj.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const formatDateTime = (date: Date | string, lang: string): string => {
  const locale = getLocale(lang)
  const dateObj = typeof date === "string" ? new Date(date) : date

  return dateObj.toLocaleString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const getTodayRange = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return { today, tomorrow }
}

export const isToday = (date: Date | string): boolean => {
  const { today, tomorrow } = getTodayRange()
  const dateObj = typeof date === "string" ? new Date(date) : date

  return dateObj >= today && dateObj < tomorrow
}
