import { type NextRequest, NextResponse } from "next/server"
import { TelegramAPI } from "@/lib/telegram-api"

export async function POST(request: NextRequest) {
  try {
    const { botToken, chatId, text, parseMode, buttons } = await request.json()

    if (!botToken || !chatId || !text) {
      return NextResponse.json({ error: "Bot token, chat ID, and text are required" }, { status: 400 })
    }

    const telegram = new TelegramAPI({ botToken })

    const message: any = {
      chat_id: chatId,
      text,
    }

    if (parseMode) {
      message.parse_mode = parseMode
    }

    if (buttons && buttons.length > 0) {
      message.reply_markup = {
        inline_keyboard: buttons.map((row: any[]) =>
          row.map((btn) => ({
            text: btn.text,
            url: btn.url,
            callback_data: btn.callback_data,
          })),
        ),
      }
    }

    const result = await telegram.sendMessage(message)

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        message: "Сообщение отправлено успешно",
      })
    } else {
      return NextResponse.json({ error: result.error || "Failed to send message" }, { status: 400 })
    }
  } catch (error) {
    console.error("[Telegram] Send message error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
