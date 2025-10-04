import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SettingsContent from "@/components/settings-content"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*, tenants(*)").eq("id", user.id).single()
  const { data: referralCode } = await supabase.from("referral_codes").select("*").eq("user_id", user.id).single()
  const { data: referralStats } = await supabase.from("referral_conversions").select("*").eq("referrer_id", user.id)
  const { data: referralPayouts } = await supabase
    .from("referral_payouts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  const totalClicks = referralStats?.length || 0
  const totalRegistrations = referralStats?.filter((s) => s.status === "registered" || s.status === "paid").length || 0
  const totalPaid = referralStats?.filter((s) => s.status === "paid").length || 0
  const totalEarned = referralStats?.reduce((sum, s) => sum + (s.commission_amount || 0), 0) || 0
  const pendingEarnings =
    referralStats?.filter((s) => s.status === "registered").reduce((sum, s) => sum + (s.commission_amount || 0), 0) || 0

  const referralUrl = referralCode
    ? `${process.env.NEXT_PUBLIC_SITE_URL || "https://v0-crm-landing-page-livid.vercel.app"}?ref=${referralCode.code}`
    : ""

  return (
    <SettingsContent
      user={user}
      profile={profile}
      referralCode={referralCode}
      referralStats={referralStats || []}
      referralPayouts={referralPayouts || []}
      totalClicks={totalClicks}
      totalRegistrations={totalRegistrations}
      totalPaid={totalPaid}
      totalEarned={totalEarned}
      pendingEarnings={pendingEarnings}
      referralUrl={referralUrl}
    />
  )
}
