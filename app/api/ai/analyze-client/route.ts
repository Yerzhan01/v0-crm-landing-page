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

  const { clientId } = await req.json()

  // Fetch client data with related info
  const [{ data: client }, { data: deals }, { data: appointments }, { data: messages }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", clientId).single(),
    supabase.from("deals").select("*").eq("client_id", clientId),
    supabase.from("appointments").select("*").eq("client_id", clientId),
    supabase.from("messages").select("*, conversations!inner(*)").eq("conversations.client_id", clientId).limit(10),
  ])

  const systemPrompt = `Вы - AI аналитик CRM системы. Проанализируйте данные клиента и предоставьте:
1. Краткую характеристику клиента
2. Уровень вовлеченности (высокий/средний/низкий)
3. Рекомендации по работе с клиентом
4. Потенциальные риски или возможности

Данные клиента:
- Основная информация: ${JSON.stringify(client)}
- Количество сделок: ${deals?.length || 0}
- Количество записей: ${appointments?.length || 0}
- Количество сообщений: ${messages?.length || 0}

Предоставьте анализ на русском языке в структурированном виде.`

  const { text } = await generateText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    prompt: "Проанализируй клиента",
  })

  return Response.json({ analysis: text })
}
