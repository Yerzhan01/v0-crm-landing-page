"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Send, Settings, Paperclip, CheckCircle, MessageSquare } from "lucide-react"

export default function ChannelsPage() {
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
      <div>
        <h1 className="text-3xl font-bold">Каналы связи</h1>
        <p className="text-muted-foreground mt-2">Настройте WhatsApp и Telegram для интеграции с CRM</p>
      </div>

      {/* Integration Overview */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Интеграция с CRM
          </CardTitle>
          <CardDescription>Каналы автоматически интегрируются со всеми модулями системы</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Сообщения</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Клиенты</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Воронки</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">AI Агент</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Уведомления</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Автоматизация</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Аналитика</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm">Webhooks</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp (Green API) */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>WhatsApp Business</CardTitle>
                <CardDescription>Интеграция через Green API</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-green-600">
              Готов к настройке
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>Green API</strong> - официальный партнер WhatsApp Business API. Получите учетные данные на{" "}
              <a href="https://green-api.com" target="_blank" className="underline font-medium" rel="noreferrer">
                green-api.com
              </a>
            </p>
          </div>

          <div className="space-y-4">
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
              <Input id="green-api-phone" placeholder="+7 (999) 123-45-67" />
              <p className="text-xs text-muted-foreground">
                Номер телефона, привязанный к вашему WhatsApp Business аккаунту
              </p>
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="text-sm font-semibold">Настройки Green API</h4>

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
                <p className="text-sm text-muted-foreground">Отмечать входящие сообщения как прочитанные</p>
              </div>
              <Switch />
            </div>

            <div className="space-y-2">
              <Label htmlFor="delay-messages">Задержка между сообщениями (мс)</Label>
              <Input id="delay-messages" type="number" defaultValue="3000" min="1000" max="10000" step="1000" />
              <p className="text-xs text-muted-foreground">Рекомендуется 3000-5000 мс для избежания блокировки</p>
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
            <Button className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Сохранить настройки
            </Button>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm text-amber-900 dark:text-amber-100">
              <strong>Важно:</strong> После настройки установите webhook URL в личном кабинете Green API через метод
              setSettings или в веб-интерфейсе.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Telegram Bot */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Send className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <CardTitle>Telegram Bot</CardTitle>
                <CardDescription>Интеграция через Telegram Bot API</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-blue-500">
              Подключен
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              Создайте бота через{" "}
              <a href="https://t.me/BotFather" target="_blank" className="underline font-medium" rel="noreferrer">
                @BotFather
              </a>{" "}
              и получите токен для интеграции
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telegram-token">Bot Token</Label>
              <Input id="telegram-token" type="password" placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz" />
              <p className="text-xs text-muted-foreground">Получите токен у @BotFather в Telegram</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram-username">Имя бота</Label>
              <Input id="telegram-username" placeholder="@your_crm_bot" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram-webhook">Webhook URL</Label>
              <div className="flex gap-2">
                <Input
                  id="telegram-webhook"
                  readOnly
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/api/webhooks/telegram`}
                  className="font-mono text-xs"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const url = `${window.location.origin}/api/webhooks/telegram`
                    navigator.clipboard.writeText(url)
                    alert("Webhook URL скопирован в буфер обмена!")
                  }}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">URL для получения входящих сообщений от Telegram</p>
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="text-sm font-semibold">Настройки бота</h4>

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

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Уведомления о прочтении</Label>
                <p className="text-sm text-muted-foreground">Отправлять статус "печатает..." при обработке</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Проверить подключение
            </Button>
            <Button className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Сохранить настройки
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Integration Features */}
      <Card>
        <CardHeader>
          <CardTitle>Возможности интеграции</CardTitle>
          <CardDescription>Что происходит после подключения каналов</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Автоматическое создание клиентов</p>
                <p className="text-sm text-muted-foreground">
                  При первом сообщении клиент автоматически добавляется в базу
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Создание сделок в воронках</p>
                <p className="text-sm text-muted-foreground">Новые обращения автоматически попадают в воронку продаж</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">История переписки</p>
                <p className="text-sm text-muted-foreground">Все сообщения сохраняются в карточке клиента</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">AI агент для автоответов</p>
                <p className="text-sm text-muted-foreground">Настройте AI для автоматических ответов клиентам</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Массовые рассылки</p>
                <p className="text-sm text-muted-foreground">Отправляйте уведомления и рекламные сообщения</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Аналитика сообщений</p>
                <p className="text-sm text-muted-foreground">Отслеживайте доставку, прочтение и ответы</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
