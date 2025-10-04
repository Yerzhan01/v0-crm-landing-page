import { streamText } from "ai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages, context } = await req.json()

  // Build system prompt with CRM context
  const systemPrompt = `Вы - AI ассистент для CRM системы. Вы помогаете пользователям с:
- Анализом клиентов и их поведения
- Генерацией ответов для сообщений клиентам
- Рекомендациями по сделкам и воронкам продаж
- Автоматизацией рутинных задач
- Созданием шаблонов сообщений

Отвечайте на русском языке, будьте профессиональны и полезны.

${context ? `Контекст: ${JSON.stringify(context)}` : ""}`

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}
