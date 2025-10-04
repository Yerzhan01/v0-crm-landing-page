export const safeNumber = (value: any, defaultValue = 0): number => {
  const num = Number(value)
  return isNaN(num) ? defaultValue : num
}

export const safeParseFloat = (value: any, defaultValue = 0): number => {
  const num = Number.parseFloat(value)
  return isNaN(num) ? defaultValue : num
}

export const safeParseInt = (value: any, defaultValue = 0): number => {
  const num = Number.parseInt(value, 10)
  return isNaN(num) ? defaultValue : num
}

export const formatCurrency = (amount: number, currency = "₸", locale = "ru-RU"): string => {
  return `${amount.toLocaleString(locale)} ${currency}`
}

export const formatPercentage = (value: number, decimals = 0): string => {
  return `${value.toFixed(decimals)}%`
}
