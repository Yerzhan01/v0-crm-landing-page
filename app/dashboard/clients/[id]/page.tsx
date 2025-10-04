import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { ClientDetailContent } from "@/components/client-detail-content"

export default async function ClientDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: client } = await supabase.from("clients").select("*").eq("id", params.id).single()

  if (!client) {
    notFound()
  }

  return <ClientDetailContent client={client} />
}
