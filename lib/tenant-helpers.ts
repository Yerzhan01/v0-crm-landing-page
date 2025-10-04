"use server"

import { createClient } from "@/lib/supabase/server"

export async function getTenantId(): Promise<string | null> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error("Error getting user:", userError)
      return null
    }

    if (!user) {
      return null
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("tenant_id")
      .eq("id", user.id)
      .maybeSingle()

    if (profileError) {
      console.error("Error getting profile:", profileError)
      return null
    }

    if (!profile?.tenant_id) {
      console.warn(`User ${user.id} has no tenant_id`)
      return null
    }

    return profile.tenant_id
  } catch (error) {
    console.error("Unexpected error in getTenantId:", error)
    return null
  }
}

export async function getTenantIdByChannelSettings(
  channelType: "whatsapp" | "telegram",
  identifier: string,
): Promise<string | null> {
  if (!identifier) {
    console.error("Identifier is required")
    return null
  }

  try {
    const supabase = await createClient()

    let query = supabase
      .from("channel_settings")
      .select("tenant_id")
      .eq("channel_type", channelType)
      .eq("is_active", true)

    if (channelType === "whatsapp") {
      query = query.eq("green_api_instance_id", identifier)
    } else if (channelType === "telegram") {
      query = query.eq("telegram_bot_token", identifier)
    }

    const { data, error } = await query.maybeSingle()

    if (error) {
      console.error("Error getting tenant by channel:", error)
      return null
    }

    return data?.tenant_id || null
  } catch (error) {
    console.error("Unexpected error in getTenantIdByChannelSettings:", error)
    return null
  }
}
