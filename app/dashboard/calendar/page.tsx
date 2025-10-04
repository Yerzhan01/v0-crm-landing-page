import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AddAppointmentDialog } from "@/components/add-appointment-dialog"
import { CalendarView } from "@/components/calendar-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Settings } from "lucide-react"
import Link from "next/link"

export default async function CalendarPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  // Fetch all necessary data
  const [{ data: appointments }, { data: clients }, { data: services }, { data: staff }] = await Promise.all([
    supabase
      .from("appointments")
      .select("*, clients(*), services(*), staff(*)")
      .eq("tenant_id", profile?.tenant_id)
      .order("start_time", { ascending: true }),
    supabase.from("clients").select("*").eq("tenant_id", profile?.tenant_id).order("full_name"),
    supabase.from("services").select("*").eq("tenant_id", profile?.tenant_id).eq("is_active", true).order("name"),
    supabase.from("staff").select("*").eq("tenant_id", profile?.tenant_id).eq("is_active", true).order("full_name"),
  ])

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      scheduled: { variant: "secondary", label: "Запланирована" },
      confirmed: { variant: "default", label: "Подтверждена" },
      completed: { variant: "outline", label: "Завершена" },
      cancelled: { variant: "destructive", label: "Отменена" },
      no_show: { variant: "destructive", label: "Не пришел" },
    }
    return variants[status] || { variant: "secondary", label: status }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("ru-RU", { day: "numeric", month: "long" }),
      time: date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Календарь</h1>
          <p className="text-muted-foreground mt-1">Управление записями и расписанием</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/calendar/settings">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Button>
          </Link>
          <AddAppointmentDialog clients={clients || []} services={services || []} staff={staff || []} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Сегодня</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments?.filter((a) => {
                const today = new Date().toDateString()
                return new Date(a.start_time).toDateString() === today
              }).length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Записей на сегодня</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Услуги</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Активных услуг</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Мастера</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Активных мастеров</p>
          </CardContent>
        </Card>
      </div>

      {staff && staff.length > 0 ? (
        <CalendarView appointments={appointments || []} staff={staff} />
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            Сначала добавьте мастеров в настройках календаря, чтобы увидеть расписание.
          </p>
        </Card>
      )}

      {!appointments || appointments.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">Нет предстоящих записей. Создайте первую запись.</p>
          <AddAppointmentDialog clients={clients || []} services={services || []} staff={staff || []} />
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Предстоящие записи</h2>
          <div className="space-y-3">
            {appointments.map((appointment) => {
              const { date, time } = formatDateTime(appointment.start_time)
              const statusInfo = getStatusBadge(appointment.status)
              const staffInitials = appointment.staff?.full_name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()

              return (
                <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 text-center">
                        <div className="text-2xl font-bold">{new Date(appointment.start_time).getDate()}</div>
                        <div className="text-xs text-muted-foreground uppercase">
                          {new Date(appointment.start_time).toLocaleDateString("ru-RU", { month: "short" })}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{appointment.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{time}</span>
                            </div>
                          </div>
                          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                        </div>

                        <div className="mt-3 flex items-center gap-6 text-sm">
                          {appointment.clients && (
                            <Link
                              href={`/dashboard/clients/${appointment.clients.id}`}
                              className="text-primary hover:underline"
                            >
                              {appointment.clients.full_name}
                            </Link>
                          )}
                          {appointment.staff && (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">{staffInitials}</AvatarFallback>
                              </Avatar>
                              <span className="text-muted-foreground">{appointment.staff.full_name}</span>
                            </div>
                          )}
                          {appointment.services && (
                            <span className="text-muted-foreground">{appointment.services.name}</span>
                          )}
                        </div>

                        {appointment.description && (
                          <p className="mt-2 text-sm text-muted-foreground">{appointment.description}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
