"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  console.log("[v0] Login: Attempting login for", data.email)

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log("[v0] Login: Error", error.message)
    return { error: error.message }
  }

  console.log("[v0] Login: Success, redirecting to dashboard")
  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const headersList = await headers()
  const host = headersList.get("host") || ""
  const protocol = headersList.get("x-forwarded-proto") || "https"
  const origin = `${protocol}://${host}`

  console.log("[v0] Signup: Origin determined as", origin)

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: formData.get("fullName") as string,
        company_name: formData.get("companyName") as string,
        crm_type: formData.get("crmType") as string,
        plan: formData.get("plan") as string,
      },
    },
  }

  console.log("[v0] Signup: Attempting signup for", data.email)
  console.log("[v0] Signup: Email redirect to", data.options.emailRedirectTo)
  console.log("[v0] Signup: User metadata", data.options.data)

  const { data: signupData, error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("[v0] Signup: Error", error.message)
    return { error: error.message }
  }

  if (signupData.user && signupData.session) {
    console.log("[v0] Signup: User auto-confirmed, creating tenant and profile")

    const metadata = data.options.data

    // Create tenant
    const { data: tenant, error: tenantError } = await supabase
      .from("tenants")
      .insert({
        name: metadata.company_name || "My Company",
        crm_type: metadata.crm_type || "classic",
        plan: metadata.plan || "starter",
        status: "trial",
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single()

    if (tenantError) {
      console.log("[v0] Signup: Tenant creation error", tenantError)
      return { error: "Ошибка создания компании" }
    }

    if (tenant) {
      // Create user profile
      const { error: profileError } = await supabase.from("user_profiles").insert({
        id: signupData.user.id,
        tenant_id: tenant.id,
        full_name: metadata.full_name || signupData.user.email?.split("@")[0] || "User",
        role: "owner",
      })

      if (profileError) {
        console.log("[v0] Signup: Profile creation error", profileError)
        return { error: "Ошибка создания профиля" }
      }

      console.log("[v0] Signup: Tenant and profile created successfully")
    }

    console.log("[v0] Signup: Success - user auto-confirmed, redirecting to dashboard")
    revalidatePath("/", "layout")
    redirect("/dashboard")
  }

  console.log("[v0] Signup: Success - check email for confirmation")
  return { success: true }
}
