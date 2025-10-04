import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { MessagesPageContent } from "@/components/messages-page-content"

export default async function MessagesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  const { data: conversations } = await supabase
    .from("conversations")
    .select("*, clients(*)")
    .eq("tenant_id", profile?.tenant_id)
    .order("last_message_at", { ascending: false, nullsFirst: false })

  const mockConversations = [
    {
      id: "mock-1",
      phone_number: "+7 (999) 123-45-67",
      last_message_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      unread_count: 3,
      clients: {
        id: "mock-client-1",
        full_name: "Иван Петров",
      },
    },
    {
      id: "mock-2",
      phone_number: "+7 (999) 234-56-78",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      unread_count: 0,
      clients: {
        id: "mock-client-2",
        full_name: "Мария Сидорова",
      },
    },
    {
      id: "mock-3",
      phone_number: "+7 (999) 345-67-89",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      unread_count: 1,
      clients: {
        id: "mock-client-3",
        full_name: "Алексей Иванов",
      },
    },
    {
      id: "mock-4",
      phone_number: "+7 (999) 456-78-90",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      unread_count: 0,
      clients: {
        id: "mock-client-4",
        full_name: "Елена Смирнова",
      },
    },
    {
      id: "mock-5",
      phone_number: "+7 (999) 567-89-01",
      last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      unread_count: 0,
      clients: {
        id: "mock-client-5",
        full_name: "Дмитрий Козлов",
      },
    },
  ]

  const displayConversations = conversations && conversations.length > 0 ? conversations : mockConversations

  return <MessagesPageContent conversations={displayConversations} />
}
