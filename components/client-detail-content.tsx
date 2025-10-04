"use client"

import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Calendar, ArrowLeft, Edit, Trash2, UserPlus } from "lucide-react"
import Link from "next/link"

interface ClientDetailContentProps {
  client: any
}

export function ClientDetailContent({ client }: ClientDetailContentProps) {
  const { t } = useDashboardTranslation()

  const initials = client.full_name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  const getSourceLabel = (source: string) => {
    return t.clientDetail.sources[source as keyof typeof t.clientDetail.sources] || source
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{t.clientDetail.title}</h1>
        </div>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          {t.clientDetail.edit}
        </Button>
        <Button variant="outline">
          <Trash2 className="h-4 w-4 mr-2" />
          {t.clientDetail.delete}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t.clientDetail.information}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{client.full_name}</h2>
              {client.source && <Badge className="mt-2">{getSourceLabel(client.source)}</Badge>}
              {client.referred_by && (
                <Badge variant="secondary" className="mt-2">
                  <UserPlus className="h-3 w-3 mr-1" />
                  {t.referralRegistered}
                </Badge>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t">
              {client.email && (
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{client.email}</span>
                </div>
              )}
              {client.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{client.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {t.clientDetail.addedOn} {new Date(client.created_at).toLocaleDateString("ru-RU")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.clientDetail.interactionHistory}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t.clientDetail.interactionHistoryEmpty}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.clientDetail.deals}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t.clientDetail.dealsEmpty}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
