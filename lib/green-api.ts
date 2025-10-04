// Green API WhatsApp Integration Service

interface GreenAPIConfig {
  idInstance: string
  apiTokenInstance: string
  apiUrl?: string
}

interface SendMessageParams {
  chatId: string
  message: string
  linkPreview?: boolean
  quotedMessageId?: string
}

interface SendFileParams {
  chatId: string
  urlFile: string
  fileName: string
  caption?: string
}

interface GreenAPIResponse {
  idMessage: string
}

interface WebhookSettings {
  webhookUrl: string
  webhookUrlToken?: string
  delaySendMessagesMilliseconds?: number
  markIncomingMessagesReaded?: "yes" | "no"
  markIncomingMessagesReadedOnReply?: "yes" | "no"
  outgoingWebhook?: "yes" | "no"
  outgoingMessageWebhook?: "yes" | "no"
  outgoingAPIMessageWebhook?: "yes" | "no"
  incomingWebhook?: "yes" | "no"
  stateWebhook?: "yes" | "no"
  keepOnlineStatus?: "yes" | "no"
  pollMessageWebhook?: "yes" | "no"
  incomingCallWebhook?: "yes" | "no"
}

export class GreenAPIClient {
  private config: GreenAPIConfig
  private baseUrl: string

  constructor(config: GreenAPIConfig) {
    this.config = config
    this.baseUrl = config.apiUrl || "https://api.green-api.com"
  }

  private getUrl(method: string): string {
    return `${this.baseUrl}/waInstance${this.config.idInstance}/${method}/${this.config.apiTokenInstance}`
  }

  /**
   * Отправить текстовое сообщение
   */
  async sendMessage(params: SendMessageParams): Promise<GreenAPIResponse> {
    const url = this.getUrl("sendMessage")

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: params.chatId,
        message: params.message,
        linkPreview: params.linkPreview,
        quotedMessageId: params.quotedMessageId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Green API Error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Отправить файл по URL (изображение, видео, документ)
   */
  async sendFileByUrl(params: SendFileParams): Promise<GreenAPIResponse> {
    const url = this.getUrl("sendFileByUrl")

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: params.chatId,
        urlFile: params.urlFile,
        fileName: params.fileName,
        caption: params.caption,
      }),
    })

    if (!response.ok) {
      throw new Error(`Green API Error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Получить настройки аккаунта
   */
  async getSettings(): Promise<WebhookSettings> {
    const url = this.getUrl("getSettings")

    const response = await fetch(url, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error(`Green API Error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Установить настройки аккаунта
   */
  async setSettings(settings: Partial<WebhookSettings>): Promise<{ saveSettings: string }> {
    const url = this.getUrl("setSettings")

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    })

    if (!response.ok) {
      throw new Error(`Green API Error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Получить статус аккаунта
   */
  async getStateInstance(): Promise<{ stateInstance: string }> {
    const url = this.getUrl("getStateInstance")

    const response = await fetch(url, {
      method: "GET",
    })

    if (!response.ok) {
      throw new Error(`Green API Error: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Проверить подключение
   */
  async testConnection(): Promise<boolean> {
    try {
      const state = await this.getStateInstance()
      return state.stateInstance === "authorized"
    } catch (error) {
      console.error("[v0] Green API connection test failed:", error)
      return false
    }
  }
}

/**
 * Создать клиент Green API из переменных окружения
 */
export function createGreenAPIClient(): GreenAPIClient | null {
  const idInstance = process.env.GREEN_API_INSTANCE_ID
  const apiTokenInstance = process.env.GREEN_API_TOKEN

  if (!idInstance || !apiTokenInstance) {
    console.warn("[v0] Green API credentials not found in environment variables")
    return null
  }

  return new GreenAPIClient({
    idInstance,
    apiTokenInstance,
  })
}

/**
 * Форматировать номер телефона для Green API
 * @param phone - номер телефона в любом формате
 * @returns chatId в формате Green API (например: "79001234567@c.us")
 */
export function formatPhoneForGreenAPI(phone: string): string {
  // Удаляем все нецифровые символы
  const digits = phone.replace(/\D/g, "")

  // Если номер начинается с 8, заменяем на 7
  const normalized = digits.startsWith("8") ? "7" + digits.slice(1) : digits

  // Добавляем суффикс для личного чата
  return `${normalized}@c.us`
}

/**
 * Форматировать номер телефона для группового чата
 */
export function formatGroupChatId(groupId: string): string {
  return `${groupId}@g.us`
}
