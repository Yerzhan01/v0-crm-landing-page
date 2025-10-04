import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { getUserProfile } from "@/lib/supabase/helpers"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const profile = await getUserProfile(supabase, user.id)

  if (!profile) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Unable to load profile data</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <AnalyticsCharts />
    </div>
  )
}
