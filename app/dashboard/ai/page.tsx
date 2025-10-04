import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MessageSquare, TrendingUp, Users } from "lucide-react"

export default async function AIPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Ассистент</h1>
        <p className="text-muted-foreground mt-1">Автоматизация и интеллектуальная помощь в работе с CRM</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <CardTitle>AI Чат-ассистент</CardTitle>
            </div>
            <CardDescription>Задавайте вопросы и получайте помощь в реальном времени</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Используйте AI чат в правом нижнем углу для получения помощи по работе с CRM, анализу данных и
              автоматизации задач.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Анализ клиентов и их поведения</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Рекомендации по сделкам</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Помощь в принятии решений</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>Генерация ответов</CardTitle>
            </div>
            <CardDescription>Автоматическое создание ответов клиентам</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              AI анализирует историю переписки и генерирует подходящие ответы с учетом контекста и тона общения.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Профессиональный тон общения</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Учет контекста переписки</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Быстрые и релевантные ответы</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle>Анализ клиентов</CardTitle>
            </div>
            <CardDescription>Глубокий анализ поведения и потребностей клиентов</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              AI анализирует все взаимодействия с клиентом и предоставляет инсайты для улучшения работы.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Оценка уровня вовлеченности</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Выявление рисков и возможностей</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Персонализированные рекомендации</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <CardTitle>Прогнозирование</CardTitle>
            </div>
            <CardDescription>Предсказание результатов сделок и поведения клиентов</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              AI использует исторические данные для прогнозирования успешности сделок и оптимизации воронки продаж.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Вероятность закрытия сделки</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Оптимальное время для контакта</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                <span>Рекомендации по следующим шагам</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
