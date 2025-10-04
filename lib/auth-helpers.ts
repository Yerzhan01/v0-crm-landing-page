import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function getAuthenticatedUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  return { user, supabase }
}

export async function getUserProfile(userId: string, supabase: any) {
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*, tenants(*)")
    .eq("id", userId)
    .single()

  if (profileError || !profile) {
    console.error("[v0] Profile fetch error:", profileError)
    redirect("/auth/login")
  }

  if (!profile.tenant_id) {
    console.error("[v0] No tenant_id found for user:", userId)
    throw new Error("No tenant assigned to user")
  }

  return profile
}

export async function getAuthenticatedUserWithProfile() {
  const { user, supabase } = await getAuthenticatedUser()
  const profile = await getUserProfile(user.id, supabase)

  return { user, profile, supabase }
}
