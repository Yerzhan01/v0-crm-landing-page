import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageInput } from "@/components/message-input"
import { ArrowLeft, Phone } from "lucide-react"
import Link from "next/link"
import { markConversationAsRead } from "@/app/actions/messages"

export default async function ConversationPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const isMockConversation = params.id.startsWith("mock-")

  let conversation
  let messages

  if (isMockConversation) {
    const mockConversations: Record<string, any> = {
      "mock-1": {
        id: "mock-1",
        phone_number: "+7 (999) 123-45-67",
        unread_count: 0,
        clients: {
          full_name: "Иван Петров",
        },
      },
      "mock-2": {
        id: "mock-2",
        phone_number: "+7 (999) 234-56-78",
        unread_count: 0,
        clients: {
          full_name: "Мария Сидорова",
        },
      },
      "mock-3": {
        id: "mock-3",
        phone_number: "+7 (999) 345-67-89",
        unread_count: 0,
        clients: {
          full_name: "Алексей Иванов",
        },
      },
      "mock-4": {
        id: "mock-4",
        phone_number: "+7 (999) 456-78-90",
        unread_count: 0,
        clients: {
          full_name: "Елена Смирнова",
        },
      },
      "mock-5": {
        id: "mock-5",
        phone_number: "+7 (999) 567-89-01",
        unread_count: 0,
        clients: {
          full_name: "Дмитрий Козлов",
        },
      },
    }

    conversation = mockConversations[params.id]

    if (!conversation) {
      notFound()
    }

    const mockMessages: Record<string, any[]> = {
      "mock-1": [
        {
          id: "msg-1",
          content: "Здравствуйте! Интересует ваш продукт.",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: "msg-2",
          content: "Добрый день! Конечно, расскажу подробнее. Что именно вас интересует?",
          sender_type: "user",
          created_at: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
        },
        {
          id: "msg-3",
          content: "Какие у вас есть тарифы и условия?",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        },
        {
          id: "msg-4",
          content:
            "У нас есть три тарифа: Starter за 2990₽, Professional за 9990₽ и Enterprise за 29990₽. Все тарифы включают базовый функционал CRM.",
          sender_type: "user",
          created_at: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        },
        {
          id: "msg-5",
          content: "Отлично! А можно попробовать бесплатно?",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
      ],
      "mock-2": [
        {
          id: "msg-6",
          content: "Добрый день! Хочу уточнить по заказу.",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        },
        {
          id: "msg-7",
          content: "Здравствуйте! Конечно, слушаю вас.",
          sender_type: "user",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2.5).toISOString(),
        },
        {
          id: "msg-8",
          content: "Когда будет готов мой заказ?",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2.3).toISOString(),
        },
        {
          id: "msg-9",
          content: "Ваш заказ будет готов завтра к 15:00. Мы отправим уведомление.",
          sender_type: "user",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
      ],
      "mock-3": [
        {
          id: "msg-10",
          content: "Здравствуйте! Есть вопрос по интеграции.",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        },
        {
          id: "msg-11",
          content: "Добрый день! Какая интеграция вас интересует?",
          sender_type: "user",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 5.5).toISOString(),
        },
        {
          id: "msg-12",
          content: "Нужно подключить WhatsApp к CRM.",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        },
      ],
      "mock-4": [
        {
          id: "msg-13",
          content: "Спасибо за помощь!",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
        },
        {
          id: "msg-14",
          content: "Всегда рады помочь! Обращайтесь, если будут вопросы.",
          sender_type: "user",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        },
      ],
      "mock-5": [
        {
          id: "msg-15",
          content: "Здравствуйте! Интересует демо версия.",
          sender_type: "client",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
        },
        {
          id: "msg-16",
          content: "Добрый день! Отправлю вам ссылку на демо.",
          sender_type: "user",
          created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        },
      ],
    }

    messages = mockMessages[params.id] || []
  } else {
    // Fetch conversation with client info
    const { data: conversationData } = await supabase
      .from("conversations")
      .select("*, clients(*)")
      .eq("id", params.id)
      .single()

    if (!conversationData) {
      notFound()
    }

    conversation = conversationData

    // Fetch messages
    const { data: messagesData } = await supabase
      .from("messages")
      .select("*, user_profiles:sender_id(*)")
      .eq("conversation_id", params.id)
      .order("created_at", { ascending: true })

    messages = messagesData

    // Mark as read
    if (conversation.unread_count > 0) {
      await markConversationAsRead(params.id)
    }
  }

  const clientInitials = conversation.clients?.full_name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/messages">
          <ArrowLeft className="h-6 w-6 cursor-pointer hover:text-primary" />
        </Link>
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{clientInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{conversation.clients?.full_name || "Неизвестный клиент"}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                WhatsApp
              </Badge>
              {conversation.phone_number && (
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {conversation.phone_number}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle>Переписка</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {!messages || messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Нет сообщений. Начните диалог.
            </div>
          ) : (
            messages.map((message) => {
              const isUser = message.sender_type === "user"
              return (
                <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span
                      className={`text-xs mt-1 block ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      {formatMessageTime(message.created_at)}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
        <div className="border-t p-4">
          <MessageInput conversationId={params.id} />
        </div>
      </Card>
    </div>
  )
}
