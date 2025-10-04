"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Edit, MessageSquare, Bot, Zap, ArrowRight, Brain } from "lucide-react"

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState([
    {
      id: 1,
      name: "Приветствие",
      intent: "greeting",
      trigger: "привет, здравствуйте, добрый день",
      response: "Здравствуйте! Я ваш виртуальный ассистент. Чем могу помочь?",
      enabled: true,
    },
    {
      id: 2,
      name: "Запрос цены",
      intent: "pricing",
      trigger: "цена, стоимость, сколько стоит",
      response: "Наши тарифы начинаются от 990₽/месяц. Хотите узнать подробнее?",
      enabled: true,
    },
    {
      id: 3,
      name: "Техподдержка",
      intent: "support",
      trigger: "помощь, проблема, не работает",
      response: "Я передам ваш запрос в техподдержку. Опишите проблему подробнее.",
      enabled: false,
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Чат-боты по намерениям</h1>
          <p className="text-muted-foreground mt-2">
            Базовый бот распознает намерения и отвечает мгновенно. Если не понял - передает полноценному AI
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Создать интент
        </Button>
      </div>

      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600" />
            Логика работы AI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <span>Сообщение от клиента</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-green-600" />
              <span>Базовый бот распознает интент</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs">
                  Успешно
                </Badge>
                <span>→ Готовый ответ</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Не распознал
                </Badge>
                <span>→</span>
                <Brain className="h-4 w-4 text-purple-600" />
                <span>Полноценный AI + действия в CRM</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Список интентов</TabsTrigger>
          <TabsTrigger value="create">Создать новый</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
          <TabsTrigger value="stats">Статистика</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          {chatbots.map((bot) => (
            <Card key={bot.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-lg">{bot.name}</CardTitle>
                      <CardDescription>Намерение: {bot.intent}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={bot.enabled ? "default" : "secondary"}>
                      {bot.enabled ? "Активен" : "Отключен"}
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
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Триггеры</Label>
                  <p className="text-sm">{bot.trigger}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Ответ</Label>
                  <p className="text-sm">{bot.response}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Создать новый интент</CardTitle>
              <CardDescription>Настройте распознавание намерения и автоматический ответ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Название интента</Label>
                <Input id="bot-name" placeholder="Например: Запрос цены" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="intent">Код намерения (intent)</Label>
                <Input id="intent" placeholder="pricing, support, booking..." />
                <p className="text-xs text-muted-foreground">Используется для идентификации в системе</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="triggers">Триггерные фразы (каждая с новой строки)</Label>
                <Textarea
                  id="triggers"
                  placeholder="сколько стоит&#10;какая цена&#10;стоимость услуг&#10;прайс&#10;тарифы"
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">Бот будет искать эти фразы в сообщениях клиентов</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="response">Автоматический ответ</Label>
                <Textarea id="response" placeholder="Наши тарифы начинаются от 990₽/месяц..." rows={6} />
                <p className="text-xs text-muted-foreground">
                  Этот ответ отправится мгновенно при распознавании интента
                </p>
              </div>

              <div className="space-y-2">
                <Label>Доступные переменные</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "{{client_name}}",
                    "{{manager_name}}",
                    "{{company_name}}",
                    "{{company_phone}}",
                    "{{price_list_link}}",
                  ].map((variable) => (
                    <Badge key={variable} variant="outline" className="font-mono text-xs">
                      {variable}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4 p-4 border rounded-lg">
                <h4 className="font-semibold text-sm">Дополнительные действия</h4>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Создать лид автоматически</Label>
                    <p className="text-xs text-muted-foreground">При срабатывании интента</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Назначить менеджера</Label>
                    <p className="text-xs text-muted-foreground">Уведомить ответственного</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Добавить тег</Label>
                    <p className="text-xs text-muted-foreground">Пометить клиента</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label>Активировать сразу</Label>
                  <p className="text-sm text-muted-foreground">Интент начнет работать после создания</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full">Создать интент</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки базового бота</CardTitle>
              <CardDescription>Параметры работы распознавания интентов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Включить базовый бот</Label>
                  <p className="text-sm text-muted-foreground">Быстрые ответы по интентам</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Порог уверенности (%)</Label>
                <Input type="number" defaultValue="75" min="0" max="100" />
                <p className="text-xs text-muted-foreground">
                  Минимальная уверенность для срабатывания. Ниже - передача полноценному AI
                </p>
              </div>

              <div className="space-y-2">
                <Label>Задержка ответа (секунды)</Label>
                <Input type="number" defaultValue="1" min="0" max="10" />
                <p className="text-xs text-muted-foreground">Имитация "печатает..."</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Передача полноценному AI</CardTitle>
              <CardDescription>Что происходит, когда базовый бот не распознал интент</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Автоматическая передача AI</Label>
                  <p className="text-sm text-muted-foreground">Если интент не распознан</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>AI может совершать действия в CRM</Label>
                  <p className="text-sm text-muted-foreground">Создавать сделки, записи и т.д.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Уведомлять менеджера</Label>
                  <p className="text-sm text-muted-foreground">При передаче AI</p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label>Сообщение при передаче</Label>
                <Textarea
                  defaultValue="Сейчас я передам ваш запрос нашему AI-ассистенту, который поможет вам более детально..."
                  rows={3}
                />
              </div>

              <Button>Сохранить настройки</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Статистика работы ботов</CardTitle>
              <CardDescription>Эффективность распознавания интентов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">1,234</div>
                      <p className="text-xs text-muted-foreground">Всего сообщений</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-green-600">856</div>
                      <p className="text-xs text-muted-foreground">Распознано (69%)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold text-purple-600">378</div>
                      <p className="text-xs text-muted-foreground">Передано AI (31%)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">1.2s</div>
                      <p className="text-xs text-muted-foreground">Ср. время ответа</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Топ интентов</h4>
                  {[
                    { intent: "Запрос цены", count: 234, success: 98 },
                    { intent: "Запись на услугу", count: 189, success: 95 },
                    { intent: "Приветствие", count: 156, success: 100 },
                    { intent: "Техподдержка", count: 89, success: 67 },
                  ].map((stat) => (
                    <div key={stat.intent} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{stat.intent}</p>
                        <p className="text-sm text-muted-foreground">{stat.count} срабатываний</p>
                      </div>
                      <Badge variant={stat.success > 90 ? "default" : "secondary"}>{stat.success}% успешно</Badge>
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
