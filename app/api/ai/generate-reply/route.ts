import { generateText } from "ai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { conversationHistory, clientInfo, tone = "professional" } = await req.json()

  const systemPrompt = `Вы - AI ассистент, который помогает генерировать ответы клиентам в CRM системе.

Информация о клиенте: ${JSON.stringify(clientInfo)}

История переписки: ${JSON.stringify(conversationHistory)}

Тон общения: ${tone === "professional" ? "профессиональный" : tone === "friendly" ? "дружелюбный" : "нейтральный"}

Сгенерируйте подходящий ответ клиенту на русском языке. Ответ должен быть:
- Вежливым и профессиональным
- Релевантным контексту переписки
- Кратким (2-3 предложения)
- Без лишних деталей`

  const { text } = await generateText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    prompt: "Сгенерируй ответ клиенту",
  })

  return Response.json({ reply: text })
}
