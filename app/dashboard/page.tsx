import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardStats } from "@/components/dashboard-stats"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile and tenant
  const { data: profile } = await supabase.from("user_profiles").select("*, tenants(*)").eq("id", user.id).single()

  // Get basic stats
  const { count: clientsCount } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("tenant_id", profile?.tenant_id)

  return <DashboardStats profile={profile} clientsCount={clientsCount || 0} />
}
