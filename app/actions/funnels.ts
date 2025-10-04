"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createFunnel({ name, description }: { name: string; description?: string }) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "Не авторизован" }
    }

    const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

    if (!profile?.tenant_id) {
      return { success: false, error: "Профиль не найден" }
    }

    // Create funnel
    const { data: funnel, error: funnelError } = await supabase
      .from("funnels")
      .insert({
        name,
        description,
        tenant_id: profile.tenant_id,
        is_active: true,
        is_default: false,
      })
      .select()
      .single()

    if (funnelError) {
      console.error("Error creating funnel:", funnelError)
      return { success: false, error: "Ошибка при создании воронки" }
    }

    // Create default stages
    const defaultStages = [
      { name: "Неразобранное", color: "#94a3b8", position: 0, is_final: false },
      { name: "Квалификация", color: "#3b82f6", position: 1, is_final: false },
      { name: "Предложение", color: "#8b5cf6", position: 2, is_final: false },
      { name: "Переговоры", color: "#f59e0b", position: 3, is_final: false },
      { name: "Успешно", color: "#10b981", position: 4, is_final: true },
      { name: "Проиграно", color: "#ef4444", position: 5, is_final: true },
    ]

    const stages = defaultStages.map((stage) => ({
      ...stage,
      funnel_id: funnel.id,
    }))

    const { error: stagesError } = await supabase.from("funnel_stages").insert(stages)

    if (stagesError) {
      console.error("Error creating stages:", stagesError)
      // Delete the funnel if stages creation failed
      await supabase.from("funnels").delete().eq("id", funnel.id)
      return { success: false, error: "Ошибка при создании этапов воронки" }
    }

    revalidatePath("/dashboard/funnels")
    return { success: true, funnel }
  } catch (error) {
    console.error("Error in createFunnel:", error)
    return { success: false, error: "Неизвестная ошибка" }
  }
}
