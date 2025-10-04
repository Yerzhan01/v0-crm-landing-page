import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AnalyticsCharts } from "@/components/analytics-charts"

export default async function AnalyticsPage() {
  console.log("[v0] Analytics page loading...")

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("[v0] User:", user?.id)

  if (!user) {
    console.log("[v0] No user, redirecting to login")
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*, tenants(*)").eq("id", user.id).single()

  console.log("[v0] Profile loaded:", profile?.id)

  return (
    <div className="space-y-8">
      <AnalyticsCharts />
    </div>
  )
}
