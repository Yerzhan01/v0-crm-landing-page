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
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Brain, FileText, Zap, Clock, Mic, Shield, Database, BarChart, Check, CreditCard, Key } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function AIAgentPage() {
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2000])
  const [automationEnabled, setAutomationEnabled] = useState(true)
  const [apiSource, setApiSource] = useState<"own" | "package">("package")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Настройка AI агента</h1>
        <p className="text-muted-foreground mt-2">Полная конфигурация вашего AI ассистента для работы с клиентами</p>
      </div>

      {/* Global automation control card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <div>
                <CardTitle>Глобальное управление автоматизацией</CardTitle>
                <CardDescription>Включить или отключить все автоматические ответы AI</CardDescription>
              </div>
            </div>
            <Switch
              checked={automationEnabled}
              onCheckedChange={setAutomationEnabled}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <div className="flex-1">
              {automationEnabled ? (
                <>
                  <p className="font-medium text-green-600">✓ Автоматизация включена</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI агент автоматически отвечает на входящие сообщения из WhatsApp, Telegram и других каналов.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-orange-600">⚠ Автоматизация отключена</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Все входящие сообщения будут сохраняться в CRM, но AI не будет отвечать автоматически. Только
                    менеджеры смогут отвечать клиентам.
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="personality" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="personality">Личность</TabsTrigger>
          <TabsTrigger value="prompt">Промпт</TabsTrigger>
          <TabsTrigger value="model">Модель</TabsTrigger>
          <TabsTrigger value="functions">Функции</TabsTrigger>
          <TabsTrigger value="knowledge">Знания</TabsTrigger>
          <TabsTrigger value="schedule">Расписание</TabsTrigger>
          <TabsTrigger value="voice">Голос</TabsTrigger>
          <TabsTrigger value="stats">Статистика</TabsTrigger>
        </TabsList>

        {/* Личность и роль */}
        <TabsContent value="personality" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                <CardTitle>Личность и роль AI агента</CardTitle>
              </div>
              <CardDescription>Определите, кто ваш AI и как он общается с клиентами</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-name">Имя AI агента</Label>
                <Input id="ai-name" placeholder="Например: Анна" defaultValue="Анна" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ai-role">Роль</Label>
                <Input id="ai-role" placeholder="Например: Менеджер по продажам" defaultValue="Менеджер по продажам" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="communication-style">Стиль общения</Label>
                <Select defaultValue="friendly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Формальный</SelectItem>
                    <SelectItem value="friendly">Дружелюбный</SelectItem>
                    <SelectItem value="professional">Профессиональный</SelectItem>
                    <SelectItem value="casual">Неформальный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="personality">Описание личности</Label>
                <Textarea
                  id="personality"
                  rows={4}
                  placeholder="Опишите характер и манеру общения AI..."
                  defaultValue="Дружелюбный и профессиональный ассистент, который помогает клиентам быстро решать их вопросы. Всегда вежлив, терпелив и готов помочь."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Цели и задачи</Label>
                <Textarea
                  id="goals"
                  rows={3}
                  placeholder="Что AI должен достигать..."
                  defaultValue="Квалифицировать лиды, отвечать на вопросы о продукте, записывать на встречи, создавать сделки в CRM."
                />
              </div>

              <Button className="w-full">Сохранить личность</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Системный промпт */}
        <TabsContent value="prompt" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <CardTitle>Системный промпт</CardTitle>
              </div>
              <CardDescription>Детальная инструкция для AI агента</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-prompt">Основной промпт</Label>
                <Textarea
                  id="system-prompt"
                  rows={12}
                  placeholder="Введите детальную инструкцию для AI..."
                  defaultValue={`Ты - профессиональный менеджер по продажам CRM системы. Твоя задача:

1. Приветствовать клиентов и выяснять их потребности
2. Отвечать на вопросы о функциях и тарифах
3. Квалифицировать лиды (бюджет, срочность, полномочия)
4. Записывать на демо-встречи
5. Создавать сделки в CRM

Правила общения:
- Будь дружелюбным и профессиональным
- Задавай уточняющие вопросы
- Не обещай то, чего нет в продукте
- Если не знаешь ответ - передай менеджеру
- Используй эмодзи умеренно

Информация о продукте:
- CRM для малого и среднего бизнеса
- Тарифы: Starter (990₽), Professional (2990₽), Enterprise (индивидуально)
- Интеграции: WhatsApp, Telegram, Email
- Пробный период: 14 дней бесплатно`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context-prompt">Контекстный промпт</Label>
                <Textarea
                  id="context-prompt"
                  rows={4}
                  placeholder="Дополнительный контекст, который добавляется к каждому запросу..."
                  defaultValue="Текущее время: {{current_time}}\nИмя клиента: {{client_name}}\nИстория общения: {{conversation_history}}"
                />
              </div>

              <Button className="w-full">Сохранить промпт</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Модель и параметры */}
        <TabsContent value="model" className="space-y-4">
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                <CardTitle>Источник API токенов</CardTitle>
              </div>
              <CardDescription>Выберите, как вы хотите использовать AI модели</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={apiSource} onValueChange={(v) => setApiSource(v as "own" | "package")}>
                <div className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="own" id="own" />
                  <div className="flex-1">
                    <Label htmlFor="own" className="cursor-pointer font-medium">
                      Использовать свой OpenAI API ключ
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Подключите свой ключ от OpenAI. Оплата напрямую через OpenAI по их тарифам.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-muted/50 border-primary bg-primary/5">
                  <RadioGroupItem value="package" id="package" />
                  <div className="flex-1">
                    <Label htmlFor="package" className="cursor-pointer font-medium">
                      Купить пакет токенов у нас
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Готовые стабильные токены с гарантией работы. Без лимитов OpenAI. Выгоднее на 20-35%.
                    </p>
                    <Badge className="mt-2" variant="default">
                      Рекомендуется
                    </Badge>
                  </div>
                </div>
              </RadioGroup>

              {apiSource === "own" && (
                <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                  <div className="space-y-2">
                    <Label htmlFor="own-api-key">Ваш OpenAI API ключ</Label>
                    <div className="flex gap-2">
                      <Input id="own-api-key" type="password" placeholder="sk-proj-..." />
                      <Button>Сохранить</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Получите ключ на{" "}
                      <a
                        href="https://platform.openai.com/api-keys"
                        target="_blank"
                        className="underline"
                        rel="noreferrer"
                      >
                        platform.openai.com
                      </a>
                    </p>
                  </div>

                  <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <span className="text-yellow-600">⚠️</span>
                    <div className="text-sm">
                      <p className="font-medium text-yellow-600">Важно знать:</p>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        <li>• OpenAI может ограничить ваш ключ при высокой нагрузке</li>
                        <li>• Стоимость зависит от использования (непредсказуемо)</li>
                        <li>• Нужна карта для оплаты в OpenAI</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {apiSource === "package" && (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {/* Starter Package */}
                    <Card className="relative overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-lg">Starter</CardTitle>
                        <CardDescription>Для начинающих</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-3xl font-bold">990₽</div>
                          <p className="text-sm text-muted-foreground">100,000 токенов</p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>≈ 2,500 сообщений</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Все модели GPT</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Без лимитов OpenAI</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-transparent" variant="outline">
                          Купить
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Professional Package */}
                    <Card className="relative overflow-hidden border-2 border-primary">
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                        Популярный
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">Professional</CardTitle>
                        <CardDescription>Для активного использования</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-3xl font-bold">3,990₽</div>
                          <p className="text-sm text-muted-foreground">
                            500,000 токенов{" "}
                            <Badge variant="secondary" className="ml-1">
                              -20%
                            </Badge>
                          </p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>≈ 12,500 сообщений</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Все модели GPT + Claude</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Приоритетная поддержка</span>
                          </li>
                        </ul>
                        <Button className="w-full">Купить</Button>
                      </CardContent>
                    </Card>

                    {/* Business Package */}
                    <Card className="relative overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-lg">Business</CardTitle>
                        <CardDescription>Для крупного бизнеса</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-3xl font-bold">12,990₽</div>
                          <p className="text-sm text-muted-foreground">
                            2,000,000 токенов{" "}
                            <Badge variant="secondary" className="ml-1">
                              -35%
                            </Badge>
                          </p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>≈ 50,000 сообщений</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Все модели без ограничений</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Персональный менеджер</span>
                          </li>
                        </ul>
                        <Button className="w-full bg-transparent" variant="outline">
                          Купить
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Enterprise Package */}
                    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                      <CardHeader>
                        <CardTitle className="text-lg">Enterprise</CardTitle>
                        <CardDescription>Безлимитный доступ</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-3xl font-bold">29,990₽</div>
                          <p className="text-sm text-muted-foreground">в месяц</p>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Безлимитные токены</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Все модели + Fine-tuning</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>SLA 99.9% uptime</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Выделенная инфраструктура</span>
                          </li>
                        </ul>
                        <Button className="w-full">Связаться с нами</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex items-start gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <span className="text-green-600">✓</span>
                    <div className="text-sm">
                      <p className="font-medium text-green-600">Преимущества наших пакетов:</p>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        <li>• Стабильная работа без лимитов OpenAI</li>
                        <li>• Предсказуемая стоимость - платите только за пакет</li>
                        <li>• Не нужна карта OpenAI - оплата в рублях</li>
                        <li>• Техподдержка 24/7 на русском языке</li>
                      </ul>
                    </div>
                  </div>

                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-sm">Текущий баланс</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">0 токенов</div>
                          <p className="text-sm text-muted-foreground">Купите пакет для начала работы</p>
                        </div>
                        <Button>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Пополнить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <CardTitle>Модель и параметры</CardTitle>
              </div>
              <CardDescription>Выберите AI модель и настройте параметры генерации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="model">AI Модель</Label>
                <Select defaultValue="gpt-4o">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4o">
                      GPT-4o <Badge className="ml-2">Новейшая</Badge>
                    </SelectItem>
                    <SelectItem value="gpt-4o-mini">GPT-4o Mini (Быстрая и дешевая)</SelectItem>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4 (Классическая)</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Экономная)</SelectItem>
                    <SelectItem value="claude-3.5-sonnet">
                      Claude 3.5 Sonnet <Badge className="ml-2">Топ</Badge>
                    </SelectItem>
                    <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                    <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  GPT-4o - лучший баланс качества и скорости. Claude 3.5 - для сложных задач.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Температура: {temperature[0]}</Label>
                  <Badge variant="outline">
                    {temperature[0] < 0.3 ? "Точный" : temperature[0] < 0.7 ? "Сбалансированный" : "Креативный"}
                  </Badge>
                </div>
                <Slider value={temperature} onValueChange={setTemperature} min={0} max={1} step={0.1} />
                <p className="text-xs text-muted-foreground">
                  Низкая температура = более предсказуемые ответы. Высокая = более креативные.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Максимум токенов: {maxTokens[0]}</Label>
                  <Badge variant="outline">{Math.round(maxTokens[0] * 0.75)} слов</Badge>
                </div>
                <Slider value={maxTokens} onValueChange={setMaxTokens} min={500} max={4000} step={100} />
                <p className="text-xs text-muted-foreground">
                  Максимальная длина ответа AI. Больше токенов = дороже запрос.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API ключ</Label>
                <div className="flex gap-2">
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="sk-..."
                    defaultValue="sk-proj-*********************"
                  />
                  <Button variant="outline">Изменить</Button>
                </div>
                <p className="text-xs text-muted-foreground">Используйте свой ключ или общий (лимиты применяются)</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Мультимодальность</Label>
                  <p className="text-sm text-muted-foreground">Работа с фото, PDF, аудио</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full">Сохранить параметры</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Функции */}
        <TabsContent value="functions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                <CardTitle>Функции и действия</CardTitle>
              </div>
              <CardDescription>Что AI может делать в вашей CRM</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "create_deal", label: "Создавать сделки", enabled: true },
                { name: "update_client", label: "Обновлять данные клиента", enabled: true },
                { name: "schedule_meeting", label: "Записывать на встречи", enabled: true },
                { name: "check_availability", label: "Проверять доступность", enabled: true },
                { name: "send_email", label: "Отправлять email", enabled: false },
                { name: "create_task", label: "Создавать задачи", enabled: true },
                { name: "search_knowledge", label: "Искать в базе знаний", enabled: true },
                { name: "transfer_to_human", label: "Передавать менеджеру", enabled: true },
              ].map((func) => (
                <div key={func.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="font-mono text-sm">{func.name}</Label>
                    <p className="text-sm text-muted-foreground">{func.label}</p>
                  </div>
                  <Switch defaultChecked={func.enabled} />
                </div>
              ))}

              <Button className="w-full bg-transparent" variant="outline">
                Добавить функцию
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Источники знаний */}
        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle>Источники знаний</CardTitle>
              </div>
              <CardDescription>Документы и данные, которые AI использует для ответов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Загруженные документы</Label>
                <div className="space-y-2">
                  {[
                    { name: "Презентация продукта.pdf", size: "2.4 MB", status: "Обработан" },
                    { name: "FAQ.docx", size: "156 KB", status: "Обработан" },
                    { name: "Прайс-лист.xlsx", size: "89 KB", status: "Обработан" },
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.size} • {doc.status}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Удалить
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                Загрузить документ
              </Button>

              <div className="space-y-2">
                <Label htmlFor="website-url">URL сайта для парсинга</Label>
                <div className="flex gap-2">
                  <Input id="website-url" placeholder="https://example.com" />
                  <Button>Добавить</Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Использовать данные CRM</Label>
                  <p className="text-sm text-muted-foreground">Клиенты, сделки, история</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Расписание */}
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <CardTitle>Расписание работы</CardTitle>
              </div>
              <CardDescription>Когда AI агент активен и отвечает клиентам</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Работать 24/7</Label>
                  <p className="text-sm text-muted-foreground">AI всегда доступен</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3">
                <Label>Рабочие часы</Label>
                {["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"].map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <Switch defaultChecked={day !== "Воскресенье"} />
                    <span className="w-32 text-sm">{day}</span>
                    <Input type="time" defaultValue="09:00" className="w-32" />
                    <span className="text-muted-foreground">—</span>
                    <Input type="time" defaultValue="18:00" className="w-32" />
                  </div>
                ))}
              </div>

              <Button className="w-full">Сохранить расписание</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Голос и естественность */}
        <TabsContent value="voice" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                <CardTitle>Голос и естественность</CardTitle>
              </div>
              <CardDescription>Настройки для более естественного общения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voice">Голос для озвучки</Label>
                <Select defaultValue="alloy">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alloy">Alloy (Нейтральный)</SelectItem>
                    <SelectItem value="echo">Echo (Мужской)</SelectItem>
                    <SelectItem value="fable">Fable (Британский)</SelectItem>
                    <SelectItem value="onyx">Onyx (Глубокий)</SelectItem>
                    <SelectItem value="nova">Nova (Женский)</SelectItem>
                    <SelectItem value="shimmer">Shimmer (Мягкий)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Задержка перед ответом (секунды)</Label>
                <Input type="number" defaultValue="1" min="0" max="5" step="0.5" />
                <p className="text-xs text-muted-foreground">Имитация времени на обдумывание для естественности</p>
              </div>

              <div className="space-y-2">
                <Label>Размер буфера сообщений</Label>
                <Input type="number" defaultValue="10" min="5" max="50" />
                <p className="text-xs text-muted-foreground">Сколько последних сообщений AI помнит в контексте</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Печатающий эффект</Label>
                  <p className="text-sm text-muted-foreground">Показывать "печатает..."</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Использовать эмодзи</Label>
                  <p className="text-sm text-muted-foreground">Добавлять эмодзи в ответы</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full">Сохранить настройки</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Контроль менеджера</CardTitle>
              </div>
              <CardDescription>Управление работой AI агента</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Требовать подтверждения для сделок</Label>
                  <p className="text-sm text-muted-foreground">Менеджер проверяет перед созданием</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Автоматическая передача менеджеру</Label>
                  <p className="text-sm text-muted-foreground">Если AI не может помочь</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Лимит сообщений до передачи</Label>
                <Input type="number" defaultValue="5" min="1" max="20" />
              </div>

              <Button className="w-full" variant="destructive">
                Остановить AI агента
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Статистика */}
        <TabsContent value="stats" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Всего диалогов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+12% за месяц</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Стоимость</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₽4,567</div>
                <p className="text-xs text-muted-foreground">За текущий месяц</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Сэкономлено времени</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156 ч</div>
                <p className="text-xs text-muted-foreground">≈ ₽78,000</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Удовлетворенность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">892 оценки</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5" />
                <CardTitle>Детальная статистика</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Успешно обработано</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "87%" }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Передано менеджеру</span>
                  <span className="font-medium">13%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: "13%" }} />
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <h4 className="font-medium">Топ функций</h4>
                {[
                  { name: "create_deal", count: 234, percent: 45 },
                  { name: "schedule_meeting", count: 189, percent: 36 },
                  { name: "search_knowledge", count: 98, percent: 19 },
                ].map((func) => (
                  <div key={func.name} className="flex items-center justify-between text-sm">
                    <span className="font-mono">{func.name}</span>
                    <span className="text-muted-foreground">{func.count} раз</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
