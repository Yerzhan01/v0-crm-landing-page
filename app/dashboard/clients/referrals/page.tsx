import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ReferralsContent } from "@/components/referrals-content"

export default async function ReferralsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("*, tenants(*)").eq("id", user.id).single()

  if (!profile) {
    redirect("/login")
  }

  // Get referral code for this user
  const { data: referralCode } = await supabase.from("referral_codes").select("*").eq("user_id", user.id).single()

  const { data: referrals } = await supabase
    .from("referral_conversions")
    .select("*, user_profiles!referral_conversions_referred_user_id_fkey(id, full_name, tenant_id)")
    .eq("referrer_id", user.id)
    .order("created_at", { ascending: false })

  return <ReferralsContent profile={profile} referralCode={referralCode} referrals={referrals || []} />
}
