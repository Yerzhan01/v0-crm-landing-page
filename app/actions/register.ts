"use server"
import { createClient } from "@/lib/supabase/server"

export async function registerUser(formData: {
  fullName: string
  email: string
  phone: string
  businessType: "classic" | "services" | "kaspi"
  plan: "starter" | "professional" | "enterprise"
}) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("registrations")
      .insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        business_type: formData.businessType,
        plan: formData.plan,
      })
      .select()

    if (error) {
      console.error("[v0] Registration error:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Произошла ошибка",
    }
  }
}
