import { type NextRequest, NextResponse } from "next/server"
import { createGreenAPIClient, formatPhoneForGreenAPI } from "@/lib/green-api"

export async function POST(request: NextRequest) {
  try {
    const { phone, message, fileUrl, fileName, caption } = await request.json()

    if (!phone || (!message && !fileUrl)) {
      return NextResponse.json({ success: false, error: "Phone and message/file are required" }, { status: 400 })
    }

    const client = createGreenAPIClient()

    if (!client) {
      return NextResponse.json({ success: false, error: "Green API not configured" }, { status: 500 })
    }

    const chatId = formatPhoneForGreenAPI(phone)

    let result

    if (fileUrl) {
      // Отправка файла
      result = await client.sendFileByUrl({
        chatId,
        urlFile: fileUrl,
        fileName: fileName || "file",
        caption: caption || message,
      })
    } else {
      // Отправка текстового сообщения
      result = await client.sendMessage({
        chatId,
        message,
      })
    }

    console.log("[v0] Message sent via Green API:", result)

    return NextResponse.json({
      success: true,
      messageId: result.idMessage,
    })
  } catch (error) {
    console.error("[v0] Error sending message via Green API:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
