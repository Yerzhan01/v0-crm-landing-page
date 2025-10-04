"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, TrendingUp, MessageSquare } from "lucide-react"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

interface DashboardStatsProps {
  profile: any
  clientsCount: number
}

export function DashboardStats({ profile, clientsCount }: DashboardStatsProps) {
  const { t } = useDashboardTranslation()

  const stats = [
    {
      title: t.dashboardPage.totalClients,
      value: clientsCount,
      icon: Users,
      description: t.dashboardPage.activeClients,
    },
    {
      title: t.dashboardPage.todayAppointments,
      value: 0,
      icon: Calendar,
      description: t.dashboardPage.scheduledMeetings,
    },
    {
      title: t.dashboardPage.conversion,
      value: "0%",
      icon: TrendingUp,
      description: t.dashboardPage.lastMonth,
    },
    {
      title: t.dashboardPage.messages,
      value: 0,
      icon: MessageSquare,
      description: t.dashboardPage.unread,
    },
  ]

  const getCrmTypeLabel = (type: string) => {
    if (type === "classic") return t.dashboardPage.crmClassic
    if (type === "services") return t.dashboardPage.crmServices
    return t.dashboardPage.crmKaspi
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {t.dashboardPage.welcome}, {profile?.full_name}!
        </h1>
        <p className="text-muted-foreground mt-2">
          {profile?.tenants?.name} • {getCrmTypeLabel(profile?.tenants?.crm_type)}
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
            <CardTitle>{t.dashboardPage.recentClients}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t.dashboardPage.clientsWillAppear}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.dashboardPage.activity}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t.dashboardPage.activityWillAppear}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
