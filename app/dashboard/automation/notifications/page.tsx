"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Mail,
  MessageSquare,
  Bell,
  Edit,
  Trash2,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
  Paperclip,
  Send,
  Settings,
} from "lucide-react"

export default function NotificationsPage() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Приветствие нового клиента",
      type: "email",
      subject: "Добро пожаловать в нашу CRM!",
      enabled: true,
    },
    {
      id: 2,
      name: "Напоминание о встрече",
      type: "sms",
      subject: "Встреча через 1 час",
      enabled: true,
    },
    {
      id: 3,
      name: "Новая сделка",
      type: "push",
      subject: "Создана новая сделка",
      enabled: false,
    },
  ])

  const [testingConnection, setTestingConnection] = useState(false)

  const testGreenAPIConnection = async () => {
    setTestingConnection(true)
    try {
      const response = await fetch("/api/green-api/test-connection")
      const data = await response.json()

      if (data.success) {
        alert("✅ Green API подключен успешно!\n\nСтатус: " + data.status)
      } else {
        alert("❌ Ошибка подключения к Green API\n\n" + data.error)
      }
    } catch (error) {
      alert("❌ Ошибка при проверке подключения")
    } finally {
      setTestingConnection(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Автоматизация уведомлений</h1>
          <p className="text-muted-foreground mt-2">
            Настройте триггеры и шаблоны для автоматической отправки уведомлений
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Создать уведомление
        </Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Все уведомления</TabsTrigger>
          <TabsTrigger value="create">Создать</TabsTrigger>
          <TabsTrigger value="channels">Настройка каналов</TabsTrigger>
          <TabsTrigger value="queue">Очередь отправки</TabsTrigger>
          <TabsTrigger value="stats">Статистика</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {templates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {template.type === "email" && <Mail className="h-5 w-5 text-blue-500" />}
                    {template.type === "sms" && <MessageSquare className="h-5 w-5 text-green-500" />}
                    {template.type === "push" && <Bell className="h-5 w-5 text-purple-500" />}
                    {template.type === "whatsapp" && <Send className="h-5 w-5 text-green-600" />}
                    {template.type === "telegram" && <Send className="h-5 w-5 text-blue-500" />}
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.subject}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={template.enabled ? "default" : "secondary"}>
                      {template.enabled ? "Активен" : "Отключен"}
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Создать автоматическое уведомление</CardTitle>
              <CardDescription>Настройте триггер, шаблон и канал отправки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trigger Settings */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Триггер отправки
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="trigger-type">Тип триггера</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите триггер" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="before_appointment">За N дней/часов до записи</SelectItem>
                      <SelectItem value="deal_created">При создании сделки</SelectItem>
                      <SelectItem value="stage_changed">При изменении этапа</SelectItem>
                      <SelectItem value="service_completed">После завершения услуги</SelectItem>
                      <SelectItem value="payment_overdue">Просрочка оплаты</SelectItem>
                      <SelectItem value="client_birthday">День рождения клиента</SelectItem>
                      <SelectItem value="no_activity">Нет активности N дней</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="time-value">Время</Label>
                    <Input id="time-value" type="number" placeholder="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-unit">Единица</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">Часов</SelectItem>
                        <SelectItem value="days">Дней</SelectItem>
                        <SelectItem value="weeks">Недель</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="trigger-condition">Дополнительное условие (опционально)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Без условий" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Без условий</SelectItem>
                      <SelectItem value="first_time">Только для новых клиентов</SelectItem>
                      <SelectItem value="vip">Только VIP клиенты</SelectItem>
                      <SelectItem value="amount">Сумма сделки больше...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Channel Selection */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold">Канал отправки</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-channel" />
                    <Label htmlFor="email-channel" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-channel" />
                    <Label htmlFor="sms-channel" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      SMS
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="push-channel" />
                    <Label htmlFor="push-channel" className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Push
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="whatsapp-channel" />
                    <Label htmlFor="whatsapp-channel" className="flex items-center gap-2">
                      <Send className="h-4 w-4 text-green-600" />
                      WhatsApp
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="telegram-channel" />
                    <Label htmlFor="telegram-channel" className="flex items-center gap-2">
                      <Send className="h-4 w-4 text-blue-500" />
                      Telegram
                    </Label>
                  </div>
                </div>
              </div>

              {/* Template Selection */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold">Шаблон сообщения</h3>

                <div className="space-y-2">
                  <Label htmlFor="template-preset">Готовый шаблон</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите или создайте свой" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Создать свой</SelectItem>
                      <SelectItem value="appointment_reminder">Напоминание о записи</SelectItem>
                      <SelectItem value="payment_reminder">Напоминание об оплате</SelectItem>
                      <SelectItem value="thank_you">Благодарность за покупку</SelectItem>
                      <SelectItem value="feedback_request">Запрос отзыва</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Тема / Заголовок</Label>
                  <Input id="subject" placeholder="Напоминание о встрече" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Текст сообщения</Label>
                  <Textarea
                    id="content"
                    rows={8}
                    placeholder="Используйте переменные для персонализации"
                    defaultValue={`Здравствуйте, {{client_name}}!

Напоминаем о вашей записи {{appointment_date}} в {{appointment_time}}.

Адрес: {{company_address}}
Специалист: {{manager_name}}

Если нужно перенести, позвоните нам: {{company_phone}}

С уважением,
{{company_name}}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Доступные переменные</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "{{client_name}}",
                      "{{client_phone}}",
                      "{{client_email}}",
                      "{{company_name}}",
                      "{{company_phone}}",
                      "{{company_address}}",
                      "{{manager_name}}",
                      "{{appointment_date}}",
                      "{{appointment_time}}",
                      "{{deal_amount}}",
                      "{{service_name}}",
                      "{{payment_link}}",
                    ].map((variable) => (
                      <Badge
                        key={variable}
                        variant="outline"
                        className="font-mono text-xs cursor-pointer hover:bg-accent"
                      >
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attachments and Buttons */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold">Дополнительно</h3>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Прикрепить файлы</Label>
                  <div className="flex items-center gap-2">
                    <Input id="attachments" type="file" multiple />
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">PDF, изображения, документы (макс. 10 МБ)</p>
                </div>

                <div className="space-y-2">
                  <Label>Добавить кнопки (для Email/WhatsApp)</Label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input placeholder="Текст кнопки" defaultValue="Подтвердить запись" />
                      <Input placeholder="URL" defaultValue="{{confirmation_link}}" />
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm">
                      <Plus className="h-3 w-3 mr-1" />
                      Добавить кнопку
                    </Button>
                  </div>
                </div>
              </div>

              {/* Queue Settings */}
              <div className="space-y-4 p-4 border rounded-lg">
                <h3 className="font-semibold">Настройки очереди</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Асинхронная отправка</Label>
                    <p className="text-sm text-muted-foreground">Использовать очередь Celery</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Повтор при ошибке</Label>
                    <p className="text-sm text-muted-foreground">Автоматически повторять отправку</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retry-count">Количество попыток</Label>
                  <Input id="retry-count" type="number" defaultValue="3" min="1" max="10" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Логирование отправок</Label>
                    <p className="text-sm text-muted-foreground">Сохранять историю всех отправок</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label>Активировать сразу</Label>
                  <p className="text-sm text-muted-foreground">Уведомление начнет работать после создания</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full" size="lg">
                Создать уведомление
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Channels Configuration Tab */}
        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройка каналов отправки</CardTitle>
              <CardDescription>Подключите и настройте каналы для отправки уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Send className="h-5 w-5 text-green-600" />
                    <div>
                      <h3 className="font-semibold">WhatsApp (Green API)</h3>
                      <p className="text-sm text-muted-foreground">
                        Отправка сообщений через Green API WhatsApp Gateway
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600">
                    Готов к настройке
                  </Badge>
                </div>

                <div className="space-y-4 pl-8">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Green API</strong> - это официальный партнер WhatsApp Business API. Получите учетные
                      данные на{" "}
                      <a
                        href="https://green-api.com"
                        target="_blank"
                        className="underline font-medium"
                        rel="noreferrer"
                      >
                        green-api.com
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="green-api-instance-id">Instance ID</Label>
                    <Input id="green-api-instance-id" placeholder="1101000001" />
                    <p className="text-xs text-muted-foreground">ID вашего инстанса WhatsApp (например: 1101000001)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="green-api-token">API Token</Label>
                    <Input
                      id="green-api-token"
                      type="password"
                      placeholder="abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
                    />
                    <p className="text-xs text-muted-foreground">
                      API токен для доступа к Green API (получите в личном кабинете)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="green-api-webhook">Webhook URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="green-api-webhook"
                        readOnly
                        value={`${typeof window !== "undefined" ? window.location.origin : ""}/api/webhooks/green-api`}
                        className="font-mono text-xs"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const url = `${window.location.origin}/api/webhooks/green-api`
                          navigator.clipboard.writeText(url)
                          alert("Webhook URL скопирован в буфер обмена!")
                        }}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Укажите этот URL в настройках webhookUrl в личном кабинете Green API
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="green-api-phone">Номер телефона WhatsApp</Label>
                    <Input id="green-api-phone" placeholder="+7 (999) 123-45-67" defaultValue="+7 (999) 123-45-67" />
                    <p className="text-xs text-muted-foreground">
                      Номер телефона, привязанный к вашему WhatsApp Business аккаунту
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="text-sm font-medium">Настройки Green API</h4>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Входящие сообщения (incomingWebhook)</Label>
                        <p className="text-sm text-muted-foreground">Получать уведомления о входящих сообщениях</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Исходящие сообщения (outgoingWebhook)</Label>
                        <p className="text-sm text-muted-foreground">Получать уведомления об отправленных сообщениях</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Статус сообщений (stateWebhook)</Label>
                        <p className="text-sm text-muted-foreground">Отслеживать доставку и прочтение сообщений</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Автоматически читать сообщения</Label>
                        <p className="text-sm text-muted-foreground">
                          Отмечать входящие сообщения как прочитанные (markIncomingMessagesReaded)
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="delay-messages">Задержка между сообщениями (мс)</Label>
                      <Input id="delay-messages" type="number" defaultValue="3000" min="1000" max="10000" step="1000" />
                      <p className="text-xs text-muted-foreground">
                        Рекомендуется 3000-5000 мс для избежания блокировки (delaySendMessagesMilliseconds)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={testGreenAPIConnection}
                      disabled={testingConnection}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {testingConnection ? "Проверка..." : "Проверить подключение"}
                    </Button>
                    <Button variant="default" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Сохранить настройки
                    </Button>
                  </div>

                  <div className="p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                    <p className="text-sm text-amber-900 dark:text-amber-100">
                      <strong>Важно:</strong> После настройки не забудьте установить webhook URL в личном кабинете Green
                      API через метод setSettings или в веб-интерфейсе.
                    </p>
                  </div>
                </div>
              </div>

              {/* Telegram Settings */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Send className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">Telegram Bot API</h3>
                      <p className="text-sm text-muted-foreground">Отправка сообщений через Telegram бота</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-500">
                    Подключен
                  </Badge>
                </div>

                <div className="space-y-4 pl-8">
                  <div className="space-y-2">
                    <Label htmlFor="telegram-token">Bot Token</Label>
                    <Input
                      id="telegram-token"
                      type="password"
                      placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                      defaultValue="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                    />
                    <p className="text-xs text-muted-foreground">
                      Получите токен у{" "}
                      <a
                        href="https://t.me/BotFather"
                        target="_blank"
                        className="text-primary hover:underline"
                        rel="noreferrer"
                      >
                        @BotFather
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegram-username">Имя бота</Label>
                    <Input id="telegram-username" placeholder="@your_crm_bot" defaultValue="@your_crm_bot" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telegram-webhook">Webhook URL</Label>
                    <Input
                      id="telegram-webhook"
                      placeholder="https://your-domain.com/api/telegram/webhook"
                      defaultValue="https://your-domain.com/api/telegram/webhook"
                    />
                    <p className="text-xs text-muted-foreground">URL для получения входящих сообщений</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Inline кнопки</Label>
                      <p className="text-sm text-muted-foreground">Добавлять интерактивные кнопки к сообщениям</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Markdown форматирование</Label>
                      <p className="text-sm text-muted-foreground">Использовать разметку в сообщениях</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Проверить подключение
                  </Button>
                </div>
              </div>

              {/* Email Settings */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Email (SMTP)</h3>
                      <p className="text-sm text-muted-foreground">Отправка email уведомлений</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-blue-600">
                    Подключен
                  </Badge>
                </div>

                <div className="space-y-4 pl-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-host">SMTP Host</Label>
                      <Input id="smtp-host" placeholder="smtp.gmail.com" defaultValue="smtp.gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">Port</Label>
                      <Input id="smtp-port" placeholder="587" defaultValue="587" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-email">Email отправителя</Label>
                    <Input
                      id="smtp-email"
                      type="email"
                      placeholder="noreply@yourcrm.com"
                      defaultValue="noreply@yourcrm.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">Пароль</Label>
                    <Input id="smtp-password" type="password" placeholder="••••••••" />
                  </div>

                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Отправить тестовое письмо
                  </Button>
                </div>
              </div>

              {/* SMS Settings */}
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-semibold">SMS Gateway</h3>
                      <p className="text-sm text-muted-foreground">Отправка SMS через провайдера</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Не подключен</Badge>
                </div>

                <div className="space-y-4 pl-8">
                  <div className="space-y-2">
                    <Label htmlFor="sms-provider">Провайдер</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите провайдера" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="smsru">SMS.ru</SelectItem>
                        <SelectItem value="smsc">SMSC.ru</SelectItem>
                        <SelectItem value="custom">Свой API</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sms-api-key">API Key</Label>
                    <Input id="sms-api-key" type="password" placeholder="Введите API ключ" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sms-sender">Имя отправителя</Label>
                    <Input id="sms-sender" placeholder="YourCRM" />
                  </div>

                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Подключить SMS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Очередь отправки</CardTitle>
              <CardDescription>Мониторинг асинхронной обработки уведомлений</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">В очереди</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-green-600">156</div>
                      <p className="text-xs text-muted-foreground">Отправлено</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <p className="text-xs text-muted-foreground">Ошибки</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-yellow-600">8</div>
                      <p className="text-xs text-muted-foreground">Повтор</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 1, client: "Иван Петров", type: "Email", status: "pending", time: "2 мин назад" },
                    { id: 2, client: "Мария Сидорова", type: "SMS", status: "sent", time: "5 мин назад" },
                    { id: 3, client: "Алексей Иванов", type: "WhatsApp", status: "error", time: "10 мин назад" },
                    { id: 4, client: "Ольга Смирнова", type: "Telegram", status: "pending", time: "1 мин назад" },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {item.status === "pending" && <Clock className="h-4 w-4 text-yellow-500" />}
                        {item.status === "sent" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {item.status === "error" && <XCircle className="h-4 w-4 text-red-500" />}
                        <div>
                          <p className="font-medium">{item.client}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.type} • {item.time}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          item.status === "sent" ? "default" : item.status === "error" ? "destructive" : "secondary"
                        }
                      >
                        {item.status === "pending" ? "В очереди" : item.status === "sent" ? "Отправлено" : "Ошибка"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Статистика доставляемости</CardTitle>
              <CardDescription>Аналитика эффективности уведомлений</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold">94.2%</div>
                      <p className="text-sm text-muted-foreground">Доставляемость</p>
                      <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                        <TrendingUp className="h-3 w-3" />
                        +2.3%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold">67.8%</div>
                      <p className="text-sm text-muted-foreground">Открываемость</p>
                      <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                        <TrendingUp className="h-3 w-3" />
                        +5.1%
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-3xl font-bold">23.4%</div>
                      <p className="text-sm text-muted-foreground">Клики</p>
                      <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                        <TrendingUp className="h-3 w-3" />
                        +1.2%
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">По каналам</h4>
                  {[
                    { channel: "Email", sent: 1234, delivered: 1156, opened: 834, clicked: 289 },
                    { channel: "SMS", sent: 856, delivered: 842, opened: 612, clicked: 0 },
                    { channel: "WhatsApp", sent: 423, delivered: 418, opened: 356, clicked: 124 },
                    { channel: "Telegram", sent: 567, delivered: 562, opened: 489, clicked: 178 },
                    { channel: "Push", sent: 2341, delivered: 2198, opened: 1456, clicked: 567 },
                  ].map((stat) => (
                    <div key={stat.channel} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{stat.channel}</h5>
                        <Badge>{stat.sent} отправлено</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Доставлено</p>
                          <p className="font-semibold">
                            {stat.delivered} ({((stat.delivered / stat.sent) * 100).toFixed(1)}%)
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Открыто</p>
                          <p className="font-semibold">
                            {stat.opened} ({((stat.opened / stat.delivered) * 100).toFixed(1)}%)
                          </p>
                        </div>
                        {stat.clicked > 0 && (
                          <div>
                            <p className="text-muted-foreground">Клики</p>
                            <p className="font-semibold">
                              {stat.clicked} ({((stat.clicked / stat.opened) * 100).toFixed(1)}%)
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
