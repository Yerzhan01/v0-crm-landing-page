import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Extract message data from Green API webhook
    const messageData = body.messageData
    if (!messageData) {
      return NextResponse.json({ success: true })
    }

    const phoneNumber = messageData.chatId?.replace("@c.us", "")
    const messageText = messageData.textMessageData?.textMessage?.toLowerCase().trim()

    // Check if message contains referral code keyword
    if (messageText === "промокод" || messageText === "код" || messageText === "promo") {
      const supabase = await createClient()

      // Find client by phone number
      const { data: client } = await supabase
        .from("clients")
        .select("id, full_name, referral_code, phone")
        .eq("phone", phoneNumber)
        .single()

      if (client && client.referral_code) {
        // Send referral code via WhatsApp
        const response = await fetch(
          `https://api.green-api.com/waInstance${process.env.GREEN_API_INSTANCE_ID}/sendMessage/${process.env.GREEN_API_TOKEN}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chatId: `${phoneNumber}@c.us`,
              message: `🎁 Ваш реферальный код: *${client.referral_code}*\n\nПоделитесь им с друзьями и получайте бонусы за каждого приведенного клиента!\n\n💰 Бонус за реферала: 500₸\n📈 Комиссия с продаж: 10%\n\nКак это работает:\n1. Поделитесь кодом с друзьями\n2. Они регистрируются с вашим кодом\n3. Вы получаете бонусы!\n\nВаш текущий баланс: ${client.bonus_balance || 0}₸`,
            }),
          },
        )

        if (!response.ok) {
          console.error("Failed to send WhatsApp message:", await response.text())
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("WhatsApp webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
