"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface Appointment {
  id: string
  title: string
  start_time: string
  duration_minutes: number
  status: string
  clients?: { full_name: string; phone: string }
  staff?: { id: string; full_name: string }
  services?: { name: string }
}

interface Staff {
  id: string
  full_name: string
}

interface CalendarViewProps {
  appointments: Appointment[]
  staff: Staff[]
}

export function CalendarView({ appointments, staff }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const isMobile = useMobile()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
  }

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const dayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.start_time)
    return aptDate.toDateString() === selectedDate.toDateString()
  })

  const getAppointmentForSlot = (staffId: string, hour: number) => {
    return dayAppointments.find((apt) => {
      if (apt.staff?.id !== staffId) return false
      const aptDate = new Date(apt.start_time)
      const aptHour = aptDate.getHours()
      const aptMinutes = aptDate.getMinutes()
      const slotStart = hour * 60
      const aptStart = aptHour * 60 + aptMinutes
      return aptStart >= slotStart && aptStart < slotStart + 60
    })
  }

  const getAppointmentHeight = (duration: number) => {
    return (duration / 60) * 100 // 100% = 1 hour
  }

  const getAppointmentPosition = (startTime: string) => {
    const date = new Date(startTime)
    const minutes = date.getMinutes()
    return (minutes / 60) * 100
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: "bg-blue-100 border-blue-300 text-blue-900",
      confirmed: "bg-green-100 border-green-300 text-green-900",
      completed: "bg-gray-100 border-gray-300 text-gray-900",
      cancelled: "bg-red-100 border-red-300 text-red-900",
      no_show: "bg-orange-100 border-orange-300 text-orange-900",
    }
    return colors[status] || "bg-gray-100 border-gray-300 text-gray-900"
  }

  const getStaffInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (isMobile) {
    return (
      <div className="space-y-4">
        {/* Date navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant={isToday(selectedDate) ? "default" : "outline"} onClick={() => setSelectedDate(new Date())}>
              Сегодня
            </Button>
            <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <h2 className="text-lg font-semibold">{formatDate(selectedDate)}</h2>

        {/* Mobile list view */}
        <div className="space-y-3">
          {dayAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Нет записей на этот день</p>
            </Card>
          ) : (
            dayAppointments
              .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
              .map((appointment) => (
                <Card key={appointment.id} className={cn("p-4", getStatusColor(appointment.status))}>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-semibold">{appointment.title}</div>
                        <div className="text-sm mt-1">
                          {new Date(appointment.start_time).toLocaleTimeString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          ({appointment.duration_minutes} мин)
                        </div>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {appointment.staff ? getStaffInitials(appointment.staff.full_name) : "?"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {appointment.clients && (
                      <div className="text-sm">
                        <div className="font-medium">{appointment.clients.full_name}</div>
                        {appointment.clients.phone && (
                          <div className="text-muted-foreground">{appointment.clients.phone}</div>
                        )}
                      </div>
                    )}
                    {appointment.services && (
                      <div className="text-sm text-muted-foreground">{appointment.services.name}</div>
                    )}
                  </div>
                </Card>
              ))
          )}
        </div>

        {/* Legend */}
        <div className="space-y-2 text-sm">
          <div className="font-medium">Статусы:</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-300" />
              <span className="text-xs">Запланирована</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300" />
              <span className="text-xs">Подтверждена</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-300" />
              <span className="text-xs">Завершена</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-300" />
              <span className="text-xs">Отменена</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Date navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => changeDate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant={isToday(selectedDate) ? "default" : "outline"} onClick={() => setSelectedDate(new Date())}>
            Сегодня
          </Button>
          <Button variant="outline" size="icon" onClick={() => changeDate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-lg font-semibold">{formatDate(selectedDate)}</h2>
      </div>

      {/* Calendar grid */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header with staff */}
              <div
                className="grid border-b bg-muted/50"
                style={{ gridTemplateColumns: "80px repeat(auto-fit, minmax(150px, 1fr))" }}
              >
                <div className="p-4 border-r">
                  <span className="text-sm font-medium text-muted-foreground">Время</span>
                </div>
                {staff.map((member) => (
                  <div key={member.id} className="p-4 border-r last:border-r-0 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{getStaffInitials(member.full_name)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{member.full_name}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <div className="relative">
                {Array.from({ length: 13 }, (_, i) => i + 9).map((hour) => (
                  <div
                    key={hour}
                    className="grid border-b last:border-b-0"
                    style={{ gridTemplateColumns: "80px repeat(auto-fit, minmax(150px, 1fr))" }}
                  >
                    <div className="p-4 border-r bg-muted/30">
                      <span className="text-sm font-medium">{hour}:00</span>
                    </div>
                    {staff.map((member) => {
                      const appointment = getAppointmentForSlot(member.id, hour)
                      return (
                        <div key={member.id} className="border-r last:border-r-0 relative min-h-[80px]">
                          {appointment && (
                            <div
                              className={cn(
                                "absolute left-1 right-1 rounded-md border-2 p-2 overflow-hidden cursor-pointer hover:shadow-md transition-shadow",
                                getStatusColor(appointment.status),
                              )}
                              style={{
                                top: `${getAppointmentPosition(appointment.start_time)}%`,
                                height: `${Math.min(getAppointmentHeight(appointment.duration_minutes), 100)}%`,
                              }}
                            >
                              <div className="text-xs font-semibold truncate">{appointment.title}</div>
                              {appointment.clients && (
                                <div className="text-xs truncate mt-1">{appointment.clients.full_name}</div>
                              )}
                              {appointment.clients?.phone && (
                                <div className="text-xs truncate">{appointment.clients.phone}</div>
                              )}
                              {appointment.services && (
                                <div className="text-xs truncate mt-1 opacity-75">{appointment.services.name}</div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <span className="font-medium">Статусы:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 border-2 border-blue-300" />
          <span>Запланирована</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border-2 border-green-300" />
          <span>Подтверждена</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-100 border-2 border-gray-300" />
          <span>Завершена</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-300" />
          <span>Отменена</span>
        </div>
      </div>
    </div>
  )
}
