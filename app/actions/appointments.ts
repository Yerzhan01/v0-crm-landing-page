"use server"

import { supabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createAppointment(formData: FormData) {
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

  const startTime = new Date(formData.get("start_time") as string)
  const durationMinutes = Number.parseInt(formData.get("duration_minutes") as string) || 60
  const endTime = new Date(startTime.getTime() + durationMinutes * 60000)

  const appointmentData = {
    tenant_id: profile.tenant_id,
    client_id: formData.get("client_id") as string,
    service_id: (formData.get("service_id") as string) || null,
    staff_id: (formData.get("staff_id") as string) || null,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    start_time: startTime.toISOString(),
    end_time: endTime.toISOString(),
    status: "scheduled",
    created_by: user.id,
  }

  const { data, error } = await supabase.from("appointments").insert(appointmentData).select().single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/calendar")
  return { data }
}

export async function updateAppointmentStatus(appointmentId: string, status: string) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", appointmentId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/calendar")
  return { data }
}

export async function deleteAppointment(appointmentId: string) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const { error } = await supabase.from("appointments").delete().eq("id", appointmentId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/dashboard/calendar")
  return { success: true }
}
