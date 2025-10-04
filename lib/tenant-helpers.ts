"use server"

import { createClient } from "@/lib/supabase/server"

export async function getTenantId(): Promise<string | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  return profile?.tenant_id || null
}

export async function getTenantIdByChannelSettings(
  channelType: "whatsapp" | "telegram",
  identifier: string,
): Promise<string | null> {
  const supabase = await createClient()

  let query = supabase
    .from("channel_settings")
    .select("tenant_id")
    .eq("channel_type", channelType)
    .eq("is_active", true)
    .single()

  if (channelType === "whatsapp") {
    query = query.eq("green_api_instance_id", identifier)
  } else if (channelType === "telegram") {
    query = query.eq("telegram_bot_token", identifier)
  }

  const { data } = await query

  return data?.tenant_id || null
}
