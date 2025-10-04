import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AddClientDialog } from "@/components/add-client-dialog"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Calendar } from "lucide-react"
import Link from "next/link"

export default async function ClientsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .eq("tenant_id", profile?.tenant_id)
    .order("created_at", { ascending: false })

  const getSourceBadge = (source: string) => {
    const variants: Record<string, string> = {
      website: "default",
      referral: "secondary",
      social: "outline",
      advertising: "default",
      other: "secondary",
    }
    return variants[source] || "default"
  }

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Клиенты</h1>
          <p className="text-muted-foreground mt-1">Управление базой клиентов</p>
        </div>
        <AddClientDialog />
      </div>

      {!clients || clients.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">Пока нет клиентов. Добавьте первого клиента для начала работы.</p>
          <AddClientDialog />
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => {
            const initials = client.full_name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()

            return (
              <Link key={client.id} href={`/dashboard/clients/${client.id}`}>
                <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{client.full_name}</h3>
                      {client.source && (
                        <Badge variant={getSourceBadge(client.source) as any} className="mt-1">
                          {getSourceLabel(client.source)}
                        </Badge>
                      )}
                      <div className="mt-3 space-y-1">
                        {client.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span className="truncate">{client.email}</span>
                          </div>
                        )}
                        {client.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{client.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(client.created_at).toLocaleDateString("ru-RU")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
