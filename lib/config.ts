// Конфигурация для интеграций
// В продакшене эти значения должны быть в Environment Variables

export const config = {
  greenApi: {
    instanceId: process.env.GREEN_API_INSTANCE_ID || "",
    token: process.env.GREEN_API_TOKEN || "",
    apiUrl: "https://api.green-api.com",
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    apiUrl: "https://api.telegram.org",
  },
}

// Проверка наличия обязательных переменных
export function checkConfig() {
  const missing: string[] = []

  if (!config.greenApi.instanceId) missing.push("GREEN_API_INSTANCE_ID")
  if (!config.greenApi.token) missing.push("GREEN_API_TOKEN")
  if (!config.telegram.botToken) missing.push("TELEGRAM_BOT_TOKEN")

  return {
    isValid: missing.length === 0,
    missing,
  }
}
