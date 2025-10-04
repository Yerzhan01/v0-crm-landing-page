export interface TelegramConfig {
  botToken: string
  webhookUrl?: string
}

export interface TelegramMessage {
  chat_id: string | number
  text: string
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
  reply_markup?: {
    inline_keyboard?: Array<
      Array<{
        text: string
        url?: string
        callback_data?: string
      }>
    >
  }
}

export interface TelegramPhoto {
  chat_id: string | number
  photo: string // file_id or URL
  caption?: string
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
}

export interface TelegramDocument {
  chat_id: string | number
  document: string // file_id or URL
  caption?: string
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2"
}

export class TelegramAPI {
  private botToken: string
  private baseUrl: string

  constructor(config: TelegramConfig) {
    this.botToken = config.botToken
    this.baseUrl = `https://api.telegram.org/bot${this.botToken}`
  }

  // Отправка текстового сообщения
  async sendMessage(message: TelegramMessage) {
    try {
      const response = await fetch(`${this.baseUrl}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.description || "Failed to send message")
      }

      return {
        success: true,
        messageId: data.result.message_id,
        data: data.result,
      }
    } catch (error) {
      console.error("[Telegram API] Send message error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Отправка фото
  async sendPhoto(photo: TelegramPhoto) {
    try {
      const response = await fetch(`${this.baseUrl}/sendPhoto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photo),
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.description || "Failed to send photo")
      }

      return {
        success: true,
        messageId: data.result.message_id,
        data: data.result,
      }
    } catch (error) {
      console.error("[Telegram API] Send photo error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Отправка документа
  async sendDocument(document: TelegramDocument) {
    try {
      const response = await fetch(`${this.baseUrl}/sendDocument`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(document),
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.description || "Failed to send document")
      }

      return {
        success: true,
        messageId: data.result.message_id,
        data: data.result,
      }
    } catch (error) {
      console.error("[Telegram API] Send document error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Получение информации о боте
  async getMe() {
    try {
      const response = await fetch(`${this.baseUrl}/getMe`)
      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.description || "Failed to get bot info")
      }

      return {
        success: true,
        data: data.result,
      }
    } catch (error) {
      console.error("[Telegram API] Get me error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Установка webhook
  async setWebhook(webhookUrl: string) {
    try {
      const response = await fetch(`${this.baseUrl}/setWebhook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ["message", "callback_query"],
        }),
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.description || "Failed to set webhook")
      }

      return {
        success: true,
        data: data.result,
      }
    } catch (error) {
      console.error("[Telegram API] Set webhook error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Удаление webhook
  async deleteWebhook() {
    try {
      const response = await fetch(`${this.baseUrl}/deleteWebhook`, {
        method: "POST",
      })

      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.description || "Failed to delete webhook")
      }

      return {
        success: true,
        data: data.result,
      }
    } catch (error) {
      console.error("[Telegram API] Delete webhook error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  // Получение информации о webhook
  async getWebhookInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/getWebhookInfo`)
      const data = await response.json()

      if (!data.ok) {
        throw new Error(data.description || "Failed to get webhook info")
      }

      return {
        success: true,
        data: data.result,
      }
    } catch (error) {
      console.error("[Telegram API] Get webhook info error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }
}
