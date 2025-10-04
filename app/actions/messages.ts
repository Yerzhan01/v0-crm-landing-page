"use server"

import { supabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function sendMessage(conversationId: string, content: string) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const messageData = {
    conversation_id: conversationId,
    sender_type: "user",
    sender_id: user.id,
    content,
    message_type: "text",
    status: "sent",
  }

  const { data, error } = await supabase.from("messages").insert(messageData).select().single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/messages")
  return { data }
}

export async function createConversation(clientId: string, phoneNumber: string) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  if (!profile) {
    return { error: "Profile not found" }
  }

  // Check if conversation already exists
  const { data: existing } = await supabase
    .from("conversations")
    .select("*")
    .eq("tenant_id", profile.tenant_id)
    .eq("client_id", clientId)
    .eq("channel", "whatsapp")
    .single()

  if (existing) {
    return { data: existing }
  }

  const conversationData = {
    tenant_id: profile.tenant_id,
    client_id: clientId,
    channel: "whatsapp",
    phone_number: phoneNumber,
    assigned_to: user.id,
  }

  const { data, error } = await supabase.from("conversations").insert(conversationData).select().single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/messages")
  return { data }
}

export async function markConversationAsRead(conversationId: string) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("conversations").update({ unread_count: 0 }).eq("id", conversationId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/messages")
  return { success: true }
}
