import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CalendarPageContent } from "@/components/calendar-page-content"
import { getUserProfile } from "@/lib/supabase/helpers"

export default async function CalendarPage() {
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

  const [appointmentsResult, clientsResult, servicesResult, staffResult] = await Promise.all([
    supabase
      .from("appointments")
      .select("*, clients(*), services(*), staff(*)")
      .eq("tenant_id", profile.tenant_id)
      .order("start_time", { ascending: true }),
    supabase.from("clients").select("*").eq("tenant_id", profile.tenant_id).order("full_name"),
    supabase.from("services").select("*").eq("tenant_id", profile.tenant_id).eq("is_active", true).order("name"),
    supabase.from("staff").select("*").eq("tenant_id", profile.tenant_id).eq("is_active", true).order("full_name"),
  ])

  if (appointmentsResult.error) {
    console.error("Error loading appointments:", appointmentsResult.error)
  }
  if (clientsResult.error) {
    console.error("Error loading clients:", clientsResult.error)
  }
  if (servicesResult.error) {
    console.error("Error loading services:", servicesResult.error)
  }
  if (staffResult.error) {
    console.error("Error loading staff:", staffResult.error)
  }

  return (
    <CalendarPageContent
      appointments={appointmentsResult.data || []}
      clients={clientsResult.data || []}
      services={servicesResult.data || []}
      staff={staffResult.data || []}
    />
  )
}
