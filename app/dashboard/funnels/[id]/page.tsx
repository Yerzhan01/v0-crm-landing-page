import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { FunnelsPageContent } from "@/components/funnels-page-content"

export default async function FunnelDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  // Fetch funnel with stages
  const { data: funnel } = await supabase
    .from("funnels")
    .select("*, funnel_stages(*)")
    .eq("id", params.id)
    .eq("tenant_id", profile?.tenant_id)
    .single()

  if (!funnel) {
    notFound()
  }

  // Fetch deals for this funnel
  const { data: deals } = await supabase
    .from("deals")
    .select("*, clients(*), funnel_stages(*)")
    .eq("funnel_id", funnel.id)
    .eq("status", "open")
    .order("created_at", { ascending: false })

  // Fetch clients and users for the dialog
  const [{ data: clients }, { data: users }, { data: allFunnels }] = await Promise.all([
    supabase.from("clients").select("*").eq("tenant_id", profile?.tenant_id).order("full_name"),
    supabase.from("user_profiles").select("*").eq("tenant_id", profile?.tenant_id),
    supabase.from("funnels").select("*").eq("tenant_id", profile?.tenant_id).eq("is_active", true),
  ])

  const stages = funnel.funnel_stages?.sort((a: any, b: any) => a.position - b.position) || []

  return (
    <FunnelsPageContent
      funnel={funnel}
      deals={deals || []}
      stages={stages}
      allFunnels={allFunnels || []}
      clients={clients || []}
      users={users || []}
    />
  )
}
