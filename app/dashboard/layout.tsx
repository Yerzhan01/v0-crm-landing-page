import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { MobileDashboard } from "@/components/mobile-dashboard"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*, tenants(*)").eq("id", user.id).single()

  return (
    <MobileDashboard user={user} profile={profile}>
      {children}
    </MobileDashboard>
  )
}
