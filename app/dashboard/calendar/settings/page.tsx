import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Clock, DollarSign, Calendar, User, Trash2, Edit } from "lucide-react"

export default async function CalendarSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  // Fetch staff and services
  const [{ data: staff }, { data: services }] = await Promise.all([
    supabase.from("staff").select("*").eq("tenant_id", profile?.tenant_id).order("full_name"),
    supabase.from("services").select("*").eq("tenant_id", profile?.tenant_id).order("name"),
  ])

  // Mock data for demonstration
  const mockStaff = staff || [
    {
      id: "1",
      full_name: "Анна Иванова",
      position: "Мастер маникюра",
      phone: "+7 (999) 123-45-67",
      email: "anna@example.com",
      is_active: true,
      work_hours: {
        mon: "09:00-18:00",
        tue: "09:00-18:00",
        wed: "09:00-18:00",
        thu: "09:00-18:00",
        fri: "09:00-18:00",
      },
    },
    {
      id: "2",
      full_name: "Мария Петрова",
      position: "Парикмахер",
      phone: "+7 (999) 234-56-78",
      email: "maria@example.com",
      is_active: true,
      work_hours: { mon: "10:00-19:00", tue: "10:00-19:00", wed: "Выходной", thu: "10:00-19:00", fri: "10:00-19:00" },
    },
  ]

  const mockServices = services || [
    {
      id: "1",
      name: "Маникюр классический",
      description: "Классический маникюр с покрытием",
      duration_minutes: 60,
      price: 1500,
      is_active: true,
      category: "Маникюр",
    },
    {
      id: "2",
      name: "Стрижка женская",
      description: "Женская стрижка любой сложности",
      duration_minutes: 90,
      price: 2500,
      is_active: true,
      category: "Парикмахерские услуги",
    },
    {
      id: "3",
      name: "Окрашивание волос",
      description: "Окрашивание в один тон",
      duration_minutes: 120,
      price: 3500,
      is_active: true,
      category: "Парикмахерские услуги",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Настройки календаря</h1>
          <p className="text-muted-foreground mt-1">Управление мастерами, услугами и расписанием</p>
        </div>
      </div>

      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList>
          <TabsTrigger value="staff">
            <User className="h-4 w-4 mr-2" />
            Мастера
          </TabsTrigger>
          <TabsTrigger value="services">
            <Clock className="h-4 w-4 mr-2" />
            Услуги
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <Calendar className="h-4 w-4 mr-2" />
            Расписание
          </TabsTrigger>
        </TabsList>

        {/* Staff Management */}
        <TabsContent value="staff" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Мастера и специалисты</h2>
              <p className="text-sm text-muted-foreground">Управление персоналом и их расписанием</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить мастера
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mockStaff.map((member) => (
              <Card key={member.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {member.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{member.full_name}</CardTitle>
                        <CardDescription>{member.position}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={member.is_active ? "default" : "secondary"}>
                      {member.is_active ? "Активен" : "Неактивен"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Телефон:</span>
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{member.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Часы работы:</h4>
                    <div className="space-y-1 text-sm">
                      {Object.entries(member.work_hours || {}).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">
                            {
                              {
                                mon: "Понедельник",
                                tue: "Вторник",
                                wed: "Среда",
                                thu: "Четверг",
                                fri: "Пятница",
                                sat: "Суббота",
                                sun: "Воскресенье",
                              }[day]
                            }
                            :
                          </span>
                          <span>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="h-3 w-3 mr-2" />
                      Редактировать
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Services Management */}
        <TabsContent value="services" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Услуги</h2>
              <p className="text-sm text-muted-foreground">Управление услугами, ценами и длительностью</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить услугу
            </Button>
          </div>

          <div className="space-y-3">
            {mockServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{service.name}</h3>
                        <Badge variant="outline">{service.category}</Badge>
                        <Badge variant={service.is_active ? "default" : "secondary"}>
                          {service.is_active ? "Активна" : "Неактивна"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            <span className="font-medium">{service.duration_minutes}</span> минут
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            <span className="font-medium">{service.price.toLocaleString()}</span> ₽
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Schedule Settings */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Общее расписание работы</CardTitle>
              <CardDescription>Настройте рабочие часы для всей компании</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"].map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-32">
                    <Label>{day}</Label>
                  </div>
                  <Switch defaultChecked={day !== "Воскресенье"} />
                  <div className="flex items-center gap-2 flex-1">
                    <Input type="time" defaultValue="09:00" className="w-32" />
                    <span className="text-muted-foreground">—</span>
                    <Input type="time" defaultValue="18:00" className="w-32" />
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Button>Сохранить расписание</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Настройки записи</CardTitle>
              <CardDescription>Дополнительные параметры для системы записи</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Минимальное время до записи (часов)</Label>
                <Input type="number" defaultValue="2" className="w-32" />
                <p className="text-xs text-muted-foreground">
                  Клиенты не смогут записаться менее чем за указанное время
                </p>
              </div>

              <div className="space-y-2">
                <Label>Максимальное время записи вперед (дней)</Label>
                <Input type="number" defaultValue="30" className="w-32" />
                <p className="text-xs text-muted-foreground">Клиенты смогут записаться на указанный период вперед</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Автоматическое подтверждение записей</Label>
                  <p className="text-xs text-muted-foreground">Записи будут автоматически подтверждаться</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Отправлять напоминания</Label>
                  <p className="text-xs text-muted-foreground">Автоматические напоминания за 24 часа до записи</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4">
                <Button>Сохранить настройки</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
