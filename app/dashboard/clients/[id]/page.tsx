import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Calendar, ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: client } = await supabase.from("clients").select("*").eq("id", params.id).single()

  if (!client) {
    notFound()
  }

  const initials = client.full_name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  const getSourceLabel = (source: string) => {
    const labels: Record<string, string> = {
      website: "Сайт",
      referral: "Рекомендация",
      social: "Соц. сети",
      advertising: "Реклама",
      other: "Другое",
    }
    return labels[source] || source
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
          <h1 className="text-3xl font-bold">Карточка клиента</h1>
        </div>
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Редактировать
        </Button>
        <Button variant="outline">
          <Trash2 className="h-4 w-4 mr-2" />
          Удалить
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{client.full_name}</h2>
              {client.source && <Badge className="mt-2">{getSourceLabel(client.source)}</Badge>}
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
                <span className="text-sm">Добавлен {new Date(client.created_at).toLocaleDateString("ru-RU")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>История взаимодействий</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">История взаимодействий появится здесь</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Сделки</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Сделки с клиентом появятся здесь</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
