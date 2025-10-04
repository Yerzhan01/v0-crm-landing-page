import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CalendarPageContent } from "@/components/calendar-page-content"

export default async function CalendarPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  const [{ data: appointments }, { data: clients }, { data: services }, { data: staff }] = await Promise.all([
    supabase
      .from("appointments")
      .select("*, clients(*), services(*), staff(*)")
      .eq("tenant_id", profile?.tenant_id)
      .order("start_time", { ascending: true }),
    supabase.from("clients").select("*").eq("tenant_id", profile?.tenant_id).order("full_name"),
    supabase.from("services").select("*").eq("tenant_id", profile?.tenant_id).eq("is_active", true).order("name"),
    supabase.from("staff").select("*").eq("tenant_id", profile?.tenant_id).eq("is_active", true).order("full_name"),
  ])

  return (
    <CalendarPageContent
      appointments={appointments || []}
      clients={clients || []}
      services={services || []}
      staff={staff || []}
    />
  )
}
