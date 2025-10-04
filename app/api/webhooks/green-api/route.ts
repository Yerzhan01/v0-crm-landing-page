import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * Webhook endpoint для получения входящих сообщений от Green API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Green API webhook received:", JSON.stringify(body, null, 2))

    const { typeWebhook, instanceData, timestamp, idMessage, senderData, messageData } = body

    // Обрабатываем только входящие сообщения
    if (typeWebhook !== "incomingMessageReceived") {
      return NextResponse.json({ status: "ignored", reason: "Not an incoming message" })
    }

    const supabase = await createClient()

    const { data: channelSettings } = await supabase
      .from("channel_settings")
      .select("tenant_id, auto_create_clients, auto_create_deals, default_funnel_id")
      .eq("green_api_instance_id", instanceData.idInstance)
      .eq("is_active", true)
      .single()

    if (!channelSettings) {
      console.error("[v0] No active channel settings found for instance:", instanceData.idInstance)
      return NextResponse.json({ status: "error", error: "Channel not configured" }, { status: 400 })
    }

    const tenantId = channelSettings.tenant_id

    // Извлекаем данные отправителя
    const { chatId, sender, senderName, senderContactName } = senderData
    const { typeMessage } = messageData

    // Определяем текст сообщения в зависимости от типа
    let messageText = ""
    let fileUrl = ""

    switch (typeMessage) {
      case "textMessage":
        messageText = messageData.textMessageData?.textMessage || ""
        break
      case "extendedTextMessage":
        messageText = messageData.extendedTextMessageData?.text || ""
        break
      case "imageMessage":
      case "videoMessage":
      case "documentMessage":
      case "audioMessage":
        messageText = messageData.fileMessageData?.caption || ""
        fileUrl = messageData.fileMessageData?.downloadUrl || ""
        break
      case "quotedMessage":
        messageText = messageData.extendedTextMessageData?.text || ""
        break
      default:
        messageText = `[${typeMessage}]`
    }

    const phoneNumber = chatId.split("@")[0]
    const formattedPhone = `+${phoneNumber}`
    const displayName = senderContactName || senderName || formattedPhone

    let isNewClient = false
    let { data: client } = await supabase
      .from("clients")
      .select("*")
      .eq("phone", formattedPhone)
      .eq("tenant_id", tenantId)
      .single()

    if (!client && channelSettings.auto_create_clients) {
      console.log("[v0] Creating new client:", formattedPhone)
      isNewClient = true
      const { data: newClient, error: clientError } = await supabase
        .from("clients")
        .insert({
          tenant_id: tenantId, // Add tenant_id
          full_name: displayName,
          phone: formattedPhone,
          source: "whatsapp",
          status: "new",
        })
        .select()
        .single()

      if (clientError) {
        console.error("[v0] Error creating client:", clientError)
      } else {
        client = newClient
      }
    }

    let { data: conversation } = await supabase
      .from("conversations")
      .select("*")
      .eq("phone_number", formattedPhone)
      .eq("tenant_id", tenantId)
      .single()

    if (!conversation) {
      console.log("[v0] Creating new conversation:", formattedPhone)
      const { data: newConversation, error: convError } = await supabase
        .from("conversations")
        .insert({
          tenant_id: tenantId, // Add tenant_id
          client_id: client?.id,
          phone_number: formattedPhone,
          channel: "whatsapp",
          status: "active",
          last_message_at: new Date(timestamp * 1000).toISOString(),
          unread_count: 1,
        })
        .select()
        .single()

      if (convError) {
        console.error("[v0] Error creating conversation:", convError)
        return NextResponse.json({ status: "error", error: convError.message }, { status: 500 })
      }
      conversation = newConversation
    } else {
      const { error: updateError } = await supabase
        .from("conversations")
        .update({
          last_message_at: new Date(timestamp * 1000).toISOString(),
          unread_count: (conversation.unread_count || 0) + 1,
        })
        .eq("id", conversation.id)

      if (updateError) {
        console.error("[v0] Error updating conversation:", updateError)
      }
    }

    const { data: message, error: messageError } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversation.id,
        sender_type: "client",
        content: messageText,
        message_type: typeMessage,
        media_url: fileUrl || null,
        status: "received",
        metadata: {
          idMessage,
          senderName,
          senderContactName,
          fileUrl,
          timestamp,
          instanceId: instanceData.idInstance,
          chatId,
          typeMessage,
        },
        created_at: new Date(timestamp * 1000).toISOString(),
      })
      .select()
      .single()

    if (messageError) {
      console.error("[v0] Error saving message to database:", messageError)
      return NextResponse.json({ status: "error", error: messageError.message }, { status: 500 })
    }

    console.log("[v0] Message saved successfully:", message)

    let dealId = null
    if (isNewClient && client && channelSettings.auto_create_deals) {
      console.log("[v0] Creating deal for new client from WhatsApp")

      let funnelId = channelSettings.default_funnel_id
      if (!funnelId) {
        // Fallback to default funnel if not set in channel settings
        const { data: defaultFunnel } = await supabase
          .from("funnels")
          .select("id")
          .eq("tenant_id", tenantId)
          .eq("is_default", true)
          .eq("is_active", true)
          .single()

        if (defaultFunnel) {
          funnelId = defaultFunnel.id
        }
      }

      if (funnelId) {
        const { data: newDeal, error: dealError } = await supabase
          .from("deals")
          .insert({
            title: `Новая заявка из WhatsApp - ${displayName}`,
            description: messageText.substring(0, 500),
            client_id: client.id,
            funnel_id: funnelId,
            stage_id: null, // Assuming stage_id will be set later
            status: "open",
            amount: 0,
            currency: "KZT",
            probability: 50,
          })
          .select()
          .single()

        if (dealError) {
          console.error("[v0] Error creating deal:", dealError)
        } else {
          dealId = newDeal.id
          console.log("[v0] Deal created successfully:", dealId)

          // Create activity for the deal
          await supabase.from("deal_activities").insert({
            deal_id: dealId,
            activity_type: "note",
            content: `Автоматически создана сделка из входящего сообщения WhatsApp`,
            metadata: {
              source: "whatsapp",
              phone: formattedPhone,
              first_message: messageText,
            },
          })
        }
      }
    }

    const { data: automationSettings } = await supabase
      .from("automation_settings")
      .select("*")
      .eq("tenant_id", tenantId)
      .single()

    // Only send AI response if automation is enabled
    if (automationSettings?.enabled) {
      // TODO: Здесь можно добавить логику обработки сообщения:
      // - Распознавание интента базовым ботом
      // - Передача полноценному AI агенту
      // - Автоматические ответы
      // - Создание задач для менеджеров
    }

    return NextResponse.json({
      status: "success",
      messageId: message.id,
      conversationId: conversation.id,
      clientId: client?.id,
      dealId,
    })
  } catch (error) {
    console.error("[v0] Green API webhook error:", error)
    return NextResponse.json(
      { status: "error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

/**
 * GET endpoint для проверки работоспособности webhook
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Green API webhook endpoint is working",
    timestamp: new Date().toISOString(),
  })
}
