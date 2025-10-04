import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  console.log("[v0] Callback: Received code?", !!code)

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    console.log("[v0] Callback: Exchange code error?", error)

    if (!error) {
      // Get user data
      const {
        data: { user },
      } = await supabase.auth.getUser()

      console.log("[v0] Callback: User after exchange?", !!user, user?.email)

      if (user) {
        // Check if user profile exists
        const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

        console.log("[v0] Callback: Profile exists?", !!profile)

        // If no profile, create tenant and profile
        if (!profile) {
          const metadata = user.user_metadata

          // Create tenant
          const { data: tenant, error: tenantError } = await supabase
            .from("tenants")
            .insert({
              name: metadata.company_name || "My Company",
              crm_type: metadata.crm_type || "classic",
              plan: metadata.plan || "starter",
              status: "trial",
              trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days trial
            })
            .select()
            .single()

          console.log("[v0] Callback: Tenant created?", !!tenant, "Error?", tenantError)

          if (!tenantError && tenant) {
            // Create user profile
            const { error: profileError } = await supabase.from("user_profiles").insert({
              id: user.id,
              tenant_id: tenant.id,
              full_name: metadata.full_name || user.email?.split("@")[0] || "User",
              role: "owner",
            })

            console.log("[v0] Callback: Profile created? Error?", profileError)
          }
        }
      }

      console.log("[v0] Callback: Redirecting to dashboard")
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  console.log("[v0] Callback: Redirecting to login - no code or error")
  return NextResponse.redirect(`${origin}/auth/login`)
}
