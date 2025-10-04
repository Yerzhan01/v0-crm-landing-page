import { getUserProfile as getProfile } from "@/lib/auth-helpers"

export async function getUserProfile(supabase: any, userId: string) {
  return getProfile(userId, supabase)
}
