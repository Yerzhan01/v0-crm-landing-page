import { createClient } from "@/lib/supabase/server"
import { ReferralsContent } from "@/components/referrals-content"

export default async function ReferralsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("[v0] Referrals page - user:", user?.id)

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*, tenants(*)")
    .eq("id", user!.id)
    .single()

  console.log("[v0] Referrals page - profile:", profile?.id, "error:", profileError)

  // Get referral code for this user
  const { data: referralCode, error: codeError } = await supabase
    .from("referral_codes")
    .select("*")
    .eq("user_id", user!.id)
    .single()

  console.log("[v0] Referrals page - referralCode:", referralCode?.code, "error:", codeError)

  // Get referrals
  const { data: referrals, error: referralsError } = await supabase
    .from("referral_conversions")
    .select("*, user_profiles!referral_conversions_referred_user_id_fkey(id, full_name, tenant_id)")
    .eq("referrer_id", user!.id)
    .order("created_at", { ascending: false })

  console.log("[v0] Referrals page - referrals count:", referrals?.length, "error:", referralsError)

  return <ReferralsContent profile={profile} referralCode={referralCode} referrals={referrals || []} />
}
