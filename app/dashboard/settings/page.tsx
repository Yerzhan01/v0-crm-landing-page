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

  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*, tenants(*)")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Error loading profile:", profileError)
  }

  const { data: referralCode, error: codeError } = await supabase
    .from("referral_codes")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (codeError && codeError.code !== "PGRST116") {
    console.error("Error loading referral code:", codeError)
  }

  const { data: referralStats, error: statsError } = await supabase
    .from("referral_conversions")
    .select("*")
    .eq("referrer_id", user.id)

  if (statsError) {
    console.error("Error loading referral stats:", statsError)
  }

  const { data: referralPayouts, error: payoutsError } = await supabase
    .from("referral_payouts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  if (payoutsError) {
    console.error("Error loading referral payouts:", payoutsError)
  }

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
