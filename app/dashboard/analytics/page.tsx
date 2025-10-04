import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AnalyticsCharts } from "@/components/analytics-charts"

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*, tenants(*)").eq("id", user.id).single()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Аналитика</h1>
        <p className="text-muted-foreground mt-2">Отслеживайте эффективность вашего бизнеса</p>
      </div>

      <AnalyticsCharts />
    </div>
  )
}
