import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, TrendingUp, MessageSquare } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile and tenant
  const { data: profile } = await supabase.from("user_profiles").select("*, tenants(*)").eq("id", user.id).single()

  // Get basic stats
  const { count: clientsCount } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("tenant_id", profile?.tenant_id)

  const stats = [
    {
      title: "Всего клиентов",
      value: clientsCount || 0,
      icon: Users,
      description: "Активные клиенты в системе",
    },
    {
      title: "Записи сегодня",
      value: 0,
      icon: Calendar,
      description: "Запланированные встречи",
    },
    {
      title: "Конверсия",
      value: "0%",
      icon: TrendingUp,
      description: "За последний месяц",
    },
    {
      title: "Сообщения",
      value: 0,
      icon: MessageSquare,
      description: "Непрочитанные",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Добро пожаловать, {profile?.full_name}!</h1>
        <p className="text-muted-foreground mt-2">
          {profile?.tenants?.name} •{" "}
          {profile?.tenants?.crm_type === "classic"
            ? "CRM Классик"
            : profile?.tenants?.crm_type === "services"
              ? "CRM для услуг"
              : "CRM для Kaspi"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Последние клиенты</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Клиенты появятся здесь после добавления</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Активность</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">История действий появится здесь</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
