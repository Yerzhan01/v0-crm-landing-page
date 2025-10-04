"use server"

import { supabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createDeal(formData: FormData) {
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

  const dealData = {
    tenant_id: profile.tenant_id,
    funnel_id: formData.get("funnel_id") as string,
    stage_id: formData.get("stage_id") as string,
    client_id: (formData.get("client_id") as string) || null,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    amount: formData.get("amount") ? Number.parseFloat(formData.get("amount") as string) : null,
    probability: formData.get("probability") ? Number.parseInt(formData.get("probability") as string) : 50,
    expected_close_date: (formData.get("expected_close_date") as string) || null,
    assigned_to: (formData.get("assigned_to") as string) || user.id,
    created_by: user.id,
  }

  const { data, error } = await supabase.from("deals").insert(dealData).select().single()

  if (error) {
    return { error: error.message }
  }

  // Create activity
  await supabase.from("deal_activities").insert({
    deal_id: data.id,
    user_id: user.id,
    activity_type: "note",
    content: "Сделка создана",
  })

  revalidatePath("/dashboard/funnels")
  return { data }
}

export async function updateDealStage(dealId: string, newStageId: string) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  // Get old stage
  const { data: oldDeal } = await supabase.from("deals").select("stage_id").eq("id", dealId).single()

  const { data, error } = await supabase
    .from("deals")
    .update({ stage_id: newStageId })
    .eq("id", dealId)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  // Create activity
  if (oldDeal && oldDeal.stage_id !== newStageId) {
    await supabase.from("deal_activities").insert({
      deal_id: dealId,
      user_id: user.id,
      activity_type: "stage_change",
      content: "Этап изменен",
      metadata: { old_stage_id: oldDeal.stage_id, new_stage_id: newStageId },
    })
  }

  revalidatePath("/dashboard/funnels")
  return { data }
}

export async function updateDealStatus(dealId: string, status: string, lostReason?: string) {
  const supabase = await supabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Unauthorized" }
  }

  const updateData: any = { status }
  if (status === "lost" && lostReason) {
    updateData.lost_reason = lostReason
  }

  const { data, error } = await supabase.from("deals").update(updateData).eq("id", dealId).select().single()

  if (error) {
    return { error: error.message }
  }

  // Create activity
  await supabase.from("deal_activities").insert({
    deal_id: dealId,
    user_id: user.id,
    activity_type: "status_change",
    content: `Статус изменен на ${status === "won" ? "Выиграна" : status === "lost" ? "Проиграна" : "Открыта"}`,
  })

  revalidatePath("/dashboard/funnels")
  return { data }
}
