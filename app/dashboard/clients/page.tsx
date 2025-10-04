import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ClientsList } from "@/components/clients-list"

export default async function ClientsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .eq("tenant_id", profile?.tenant_id)
    .order("created_at", { ascending: false })

  return <ClientsList clients={clients || []} />
}
