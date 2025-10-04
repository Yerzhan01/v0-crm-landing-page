"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Users, Clock } from "lucide-react"
import Link from "next/link"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

interface MessagesPageContentProps {
  conversations: any[]
}

export function MessagesPageContent({ conversations }: MessagesPageContentProps) {
  const { t } = useDashboardTranslation()

  const totalUnread = conversations?.reduce((sum, conv) => sum + (conv.unread_count || 0), 0) || 0

  const formatTime = (dateString: string | null) => {
    if (!dateString) return t.messages.noMessages
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return t.messages.justNow
    if (diffMins < 60) return `${diffMins} ${t.messages.minAgo}`
    if (diffHours < 24) return `${diffHours} ${t.messages.hourAgo}`
    if (diffDays < 7) return `${diffDays} ${t.messages.dayAgo}`
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t.messages.title}</h1>
          <p className="text-muted-foreground mt-1">{t.messages.subtitle}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.messages.totalChats}</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">{t.messages.activeDialogs}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.messages.unread}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnread}</div>
            <p className="text-xs text-muted-foreground mt-1">{t.messages.requireResponse}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.messages.activity}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {conversations?.filter((c) => {
                if (!c.last_message_at) return false
                const diffHours = (new Date().getTime() - new Date(c.last_message_at).getTime()) / 3600000
                return diffHours < 24
              }).length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t.messages.last24Hours}</p>
          </CardContent>
        </Card>
      </div>

      {!conversations || conversations.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">{t.messages.noActiveChats}</p>
          <p className="text-sm text-muted-foreground">{t.messages.chatsAutoCreated}</p>
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t.messages.allChats}</h2>
          <div className="space-y-2">
            {conversations.map((conversation) => {
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
                              {conversation.clients?.full_name || t.messages.unknownClient}
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
