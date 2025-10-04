import { type NextRequest, NextResponse } from "next/server"
import { TelegramAPI } from "@/lib/telegram-api"

export async function POST(request: NextRequest) {
  try {
    const { botToken, webhookUrl } = await request.json()

    if (!botToken || !webhookUrl) {
      return NextResponse.json({ error: "Bot token and webhook URL are required" }, { status: 400 })
    }

    const telegram = new TelegramAPI({ botToken })
    const result = await telegram.setWebhook(webhookUrl)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Webhook установлен успешно",
      })
    } else {
      return NextResponse.json({ error: result.error || "Failed to set webhook" }, { status: 400 })
    }
  } catch (error) {
    console.error("[Telegram] Set webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
