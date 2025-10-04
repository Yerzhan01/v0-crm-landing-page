"use client"

import { AddAppointmentDialog } from "@/components/add-appointment-dialog"
import { CalendarView } from "@/components/calendar-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, Settings } from "lucide-react"
import Link from "next/link"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

interface CalendarPageContentProps {
  appointments: any[]
  clients: any[]
  services: any[]
  staff: any[]
}

export function CalendarPageContent({ appointments, clients, services, staff }: CalendarPageContentProps) {
  const { t } = useDashboardTranslation()

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      scheduled: { variant: "secondary", label: t.calendar.scheduled },
      confirmed: { variant: "default", label: t.calendar.confirmed },
      completed: { variant: "outline", label: t.calendar.completed },
      cancelled: { variant: "destructive", label: t.calendar.cancelled },
      no_show: { variant: "destructive", label: t.calendar.noShow },
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
          <h1 className="text-3xl font-bold">{t.calendar.title}</h1>
          <p className="text-muted-foreground mt-1">{t.calendar.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/calendar/settings">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              {t.settings.title}
            </Button>
          </Link>
          <AddAppointmentDialog clients={clients || []} services={services || []} staff={staff || []} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.calendar.today}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments?.filter((a) => {
                const today = new Date().toDateString()
                return new Date(a.start_time).toDateString() === today
              }).length || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t.calendar.appointmentsToday}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.calendar.services}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">{t.calendar.activeServices}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.calendar.staff}</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">{t.calendar.activeStaff}</p>
          </CardContent>
        </Card>
      </div>

      {staff && staff.length > 0 ? (
        <CalendarView appointments={appointments || []} staff={staff} />
      ) : (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">{t.calendar.addStaffFirst}</p>
        </Card>
      )}

      {!appointments || appointments.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">{t.calendar.noUpcomingAppointments}</p>
          <AddAppointmentDialog clients={clients || []} services={services || []} staff={staff || []} />
        </Card>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t.calendar.upcomingAppointments}</h2>
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
