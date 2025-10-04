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

  // Get user profile with tenant info
  const { data: profile } = await supabase.from("profiles").select("*, tenants(*)").eq("id", user.id).single()

  if (!profile) {
    redirect("/login")
  }

  // Get referral code for this user
  const { data: referralCode } = await supabase.from("referral_codes").select("*").eq("user_id", user.id).single()

  // Get referrals (users who signed up with this user's code)
  const { data: referrals } = await supabase
    .from("profiles")
    .select("id, full_name, email, created_at, tenants(status)")
    .eq("referred_by", user.id)
    .order("created_at", { ascending: false })

  return <ReferralsContent profile={profile} referralCode={referralCode} referrals={referrals || []} />
}
