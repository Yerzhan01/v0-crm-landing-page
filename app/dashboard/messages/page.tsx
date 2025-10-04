import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Users, Clock } from "lucide-react"
import Link from "next/link"

export default async function MessagesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  // Fetch conversations with client info
  const { data: conversations } = await supabase
    .from("conversations")
    .select("*, clients(*)")
    .eq("tenant_id", profile?.tenant_id)
    .order("last_message_at", { ascending: false, nullsFirst: false })

  const mockConversations = [
    {
      id: "mock-1",
      phone_number: "+7 (999) 123-45-67",
      last_message_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      unread_count: 3,
      clients: {
        id: "mock-client-1",
        full_name: "Иван Петров",
      },
    },
    {
      id: "mock-2",
      phone_number: "+7 (999) 234-56-78",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      unread_count: 0,
      clients: {
        id: "mock-client-2",
        full_name: "Мария Сидорова",
      },
    },
    {
      id: "mock-3",
      phone_number: "+7 (999) 345-67-89",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      unread_count: 1,
      clients: {
        id: "mock-client-3",
        full_name: "Алексей Иванов",
      },
    },
    {
      id: "mock-4",
      phone_number: "+7 (999) 456-78-90",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      unread_count: 0,
      clients: {
        id: "mock-client-4",
        full_name: "Елена Смирнова",
      },
    },
    {
      id: "mock-5",
      phone_number: "+7 (999) 567-89-01",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      unread_count: 0,
      clients: {
        id: "mock-client-5",
        full_name: "Дмитрий Козлов",
      },
    },
  ]

  const displayConversations = conversations && conversations.length > 0 ? conversations : mockConversations

  // Get total unread count
  const totalUnread = displayConversations?.reduce((sum, conv) => sum + (conv.unread_count || 0), 0) || 0

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "Нет сообщений"
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Только что"
    if (diffMins < 60) return `${diffMins} мин назад`
    if (diffHours < 24) return `${diffHours} ч назад`
    if (diffDays < 7) return `${diffDays} дн назад`
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Сообщения</h1>
          <p className="text-muted-foreground mt-1">WhatsApp чаты с клиентами</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего чатов</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayConversations?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Активных диалогов</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Непрочитанные</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnread}</div>
            <p className="text-xs text-muted-foreground mt-1">Требуют ответа</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активность</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {displayConversations?.filter((c) => {
                if (!c.last_message_at) return false
                const diffHours = (new Date().getTime() - new Date(c.last_message_at).getTime()) / 3600000
                return diffHours < 24
              }).length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">За последние 24 часа</p>
          </CardContent>
        </Card>
      </div>

      {!displayConversations || displayConversations.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">Нет активных чатов</p>
          <p className="text-sm text-muted-foreground">
            Чаты будут создаваться автоматически при общении с клиентами через WhatsApp
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Все чаты</h2>
          <div className="space-y-2">
            {displayConversations.map((conversation) => {
              const clientInitials = conversation.clients?.full_name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()

              return (
                <Link key={conversation.id} href={`/dashboard/messages/${conversation.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{clientInitials}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold truncate">
                              {conversation.clients?.full_name || "Неизвестный клиент"}
                            </h3>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {formatTime(conversation.last_message_at)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              WhatsApp
                            </Badge>
                            {conversation.phone_number && (
                              <span className="text-sm text-muted-foreground">{conversation.phone_number}</span>
                            )}
                          </div>
                        </div>

                        {conversation.unread_count > 0 && (
                          <Badge variant="default" className="ml-auto">
                            {conversation.unread_count}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
