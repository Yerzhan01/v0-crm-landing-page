import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ClientsList } from "@/components/clients-list"
import { getUserProfile } from "@/lib/supabase/helpers"

export default async function ClientsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const profile = await getUserProfile(supabase, user.id)

  if (!profile?.tenant_id) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Unable to load profile data</p>
      </div>
    )
  }

  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .eq("tenant_id", profile.tenant_id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error loading clients:", error)
  }

  return <ClientsList clients={clients || []} />
}
