import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Telegram webhook received:", JSON.stringify(body, null, 2))

    // Обработка входящего сообщения
    if (body.message) {
      const message = body.message
      const chatId = message.chat.id
      const text = message.text || ""
      const from = message.from

      console.log("[v0] Processing message from:", from.username || from.first_name)
      console.log("[v0] Message text:", text)

      // Сохранение сообщения в базу данных
      const supabase = await createClient()

      const botToken = process.env.TELEGRAM_BOT_TOKEN
      if (!botToken) {
        console.error("[v0] TELEGRAM_BOT_TOKEN not configured")
        return NextResponse.json({ status: "error", error: "Bot token not configured" }, { status: 400 })
      }

      const { data: channelSettings } = await supabase
        .from("channel_settings")
        .select("tenant_id, auto_create_clients, auto_create_deals, default_funnel_id")
        .eq("telegram_bot_token", botToken)
        .eq("is_active", true)
        .single()

      if (!channelSettings) {
        console.error("[v0] No active channel settings found for bot token")
        return NextResponse.json({ status: "error", error: "Channel not configured" }, { status: 400 })
      }

      const tenantId = channelSettings.tenant_id

      const displayName = from.first_name + (from.last_name ? ` ${from.last_name}` : "")
      const telegramId = chatId.toString()

      let isNewClient = false
      let { data: client } = await supabase
        .from("clients")
        .select("*")
        .eq("phone", telegramId)
        .eq("tenant_id", tenantId)
        .single()

      if (!client && channelSettings.auto_create_clients) {
        console.log("[v0] Creating new client from Telegram:", telegramId)
        isNewClient = true
        const { data: newClient, error: clientError } = await supabase
          .from("clients")
          .insert({
            tenant_id: tenantId, // Add tenant_id
            full_name: displayName,
            phone: telegramId,
            source: "telegram",
            status: "new",
            custom_fields: {
              telegram_username: from.username,
              telegram_id: telegramId,
            },
          })
          .select()
          .single()

        if (clientError) {
          console.error("[v0] Error creating client:", clientError)
        } else {
          client = newClient
          console.log("[v0] Created new client:", client.id)
        }
      }

      let { data: conversation } = await supabase
        .from("conversations")
        .select("*")
        .eq("phone_number", telegramId)
        .eq("tenant_id", tenantId)
        .single()

      if (!conversation) {
        console.log("[v0] Creating new conversation:", telegramId)
        const { data: newConversation, error: convError } = await supabase
          .from("conversations")
          .insert({
            tenant_id: tenantId, // Add tenant_id
            client_id: client?.id,
            phone_number: telegramId,
            channel: "telegram",
            status: "active",
            last_message_at: new Date().toISOString(),
            unread_count: 1,
          })
          .select()
          .single()

        if (convError) {
          console.error("[v0] Error creating conversation:", convError)
        } else {
          conversation = newConversation
        }
      } else {
        await supabase
          .from("conversations")
          .update({
            last_message_at: new Date().toISOString(),
            unread_count: (conversation.unread_count || 0) + 1,
          })
          .eq("id", conversation.id)
      }

      // Сохранение сообщения
      if (client && conversation) {
        const { error: messageError } = await supabase.from("messages").insert({
          conversation_id: conversation.id,
          sender_type: "client",
          content: text,
          message_type: "text",
          status: "received",
          metadata: {
            telegram_message_id: message.message_id,
            telegram_username: from.username,
            telegram_chat_id: chatId,
          },
        })

        if (messageError) {
          console.error("[v0] Error saving message:", messageError)
        } else {
          console.log("[v0] Message saved successfully")

          let dealId = null
          if (isNewClient && channelSettings.auto_create_deals) {
            console.log("[v0] Creating deal for new client from Telegram")

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
              const { data: firstStage } = await supabase
                .from("funnel_stages")
                .select("id")
                .eq("funnel_id", funnelId)
                .order("position", { ascending: true })
                .limit(1)
                .single()

              if (firstStage) {
                const { data: newDeal, error: dealError } = await supabase
                  .from("deals")
                  .insert({
                    title: `Новая заявка из Telegram - ${displayName}`,
                    description: text.substring(0, 500),
                    client_id: client.id,
                    funnel_id: funnelId,
                    stage_id: firstStage.id,
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

                  await supabase.from("deal_activities").insert({
                    deal_id: dealId,
                    activity_type: "note",
                    content: `Автоматически создана сделка из входящего сообщения Telegram`,
                    metadata: {
                      source: "telegram",
                      telegram_username: from.username,
                      telegram_id: telegramId,
                      first_message: text,
                    },
                  })
                }
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
            // TODO: Add AI response logic here
          }
        }
      }
    }

    // Обработка callback query (нажатие на inline кнопки)
    if (body.callback_query) {
      const callbackQuery = body.callback_query
      const chatId = callbackQuery.message.chat.id
      const data = callbackQuery.data

      console.log("[v0] Callback query from chat:", chatId)
      console.log("[v0] Callback data:", data)

      // Здесь можно добавить логику обработки callback
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Telegram webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
