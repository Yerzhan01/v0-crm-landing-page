import { cn } from "@/lib/utils"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Bell, Workflow } from "lucide-react"

export default function AutomationPage() {
  const sections = [
    {
      title: "Чат-боты по намерениям",
      description: "Настройте автоматические ответы на основе намерений клиентов",
      icon: Bot,
      href: "/dashboard/automation/chatbots",
      color: "text-blue-500",
    },
    {
      title: "Настройка AI агента",
      description: "Полная конфигурация AI ассистента: личность, промпты, функции и параметры",
      icon: Workflow,
      href: "/dashboard/automation/ai-agent",
      color: "text-purple-500",
    },
    {
      title: "Шаблоны уведомлений",
      description: "Создавайте и управляйте шаблонами для email, SMS и push уведомлений",
      icon: Bell,
      href: "/dashboard/automation/notifications",
      color: "text-green-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Автоматизация</h1>
        <p className="text-muted-foreground mt-2">
          Настройте автоматические процессы для повышения эффективности работы
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link key={section.href} href={section.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg bg-muted", section.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{section.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
