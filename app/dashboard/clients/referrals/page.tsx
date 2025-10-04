import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ReferralsContent } from "@/components/referrals-content"

export default async function ReferralsPage() {
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

  const { data: referrals, error: referralsError } = await supabase
    .from("referral_conversions")
    .select("*, user_profiles!referral_conversions_referred_user_id_fkey(id, full_name, tenant_id)")
    .eq("referrer_id", user.id)
    .order("created_at", { ascending: false })

  if (referralsError) {
    console.error("Error loading referrals:", referralsError)
  }

  return <ReferralsContent profile={profile} referralCode={referralCode} referrals={referrals || []} />
}
