"use server"

import { supabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createClient(formData: FormData) {
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

  const clientData = {
    tenant_id: profile.tenant_id,
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    source: formData.get("source") as string,
    created_by: user.id,
  }

  const { data, error } = await supabase.from("clients").insert(clientData).select().single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/clients")
  return { data }
}

export async function updateClient(clientId: string, formData: FormData) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const clientData = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    source: formData.get("source") as string,
  }

  const { data, error } = await supabase.from("clients").update(clientData).eq("id", clientId).select().single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/clients")
  revalidatePath(`/dashboard/clients/${clientId}`)
  return { data }
}

export async function deleteClient(clientId: string) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("clients").delete().eq("id", clientId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/clients")
  return { success: true }
}
