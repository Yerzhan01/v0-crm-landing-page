import { type NextRequest, NextResponse } from "next/server"
import { TelegramAPI } from "@/lib/telegram-api"

export async function POST(request: NextRequest) {
  try {
    const { botToken } = await request.json()

    if (!botToken) {
      return NextResponse.json({ error: "Bot token is required" }, { status: 400 })
    }

    const telegram = new TelegramAPI({ botToken })
    const result = await telegram.getMe()

    if (result.success) {
      return NextResponse.json({
        success: true,
        bot: result.data,
        message: `Подключение успешно! Бот: @${result.data.username}`,
      })
    } else {
      return NextResponse.json({ error: result.error || "Failed to connect" }, { status: 400 })
    }
  } catch (error) {
    console.error("[Telegram] Test connection error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
