import { createClient } from "@/lib/supabase/server"

export interface AutomationSettings {
  enabled: boolean
  ai_agent_enabled: boolean
  chatbot_enabled: boolean
  notifications_enabled: boolean
  updated_at: string
}

export async function getAutomationSettings(tenantId: string): Promise<AutomationSettings> {
  if (!tenantId) {
    throw new Error("Tenant ID is required")
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.from("automation_settings").select("*").eq("tenant_id", tenantId).single()

    if (error) {
      if (error.code === "PGRST116") {
        // Not found - return defaults
        console.log(`No automation settings for tenant ${tenantId}, using defaults`)
        return {
          enabled: true,
          ai_agent_enabled: true,
          chatbot_enabled: true,
          notifications_enabled: true,
          updated_at: new Date().toISOString(),
        }
      }
      // Real error - throw it
      throw error
    }

    return data
  } catch (error) {
    console.error("Error fetching automation settings:", error)
    throw error
  }
}

export async function updateAutomationSettings(
  tenantId: string,
  settings: Partial<AutomationSettings>,
): Promise<boolean> {
  if (!tenantId) {
    throw new Error("Tenant ID is required")
  }

  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const { error } = await supabase
      .from("automation_settings")
      .upsert({
        tenant_id: tenantId,
        ...settings,
        updated_at: new Date().toISOString(),
      })
      .eq("tenant_id", tenantId)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error updating automation settings:", error)
    throw error
  }
}

export async function isAutomationEnabled(tenantId: string): Promise<boolean> {
  const settings = await getAutomationSettings(tenantId)
  return settings.enabled && settings.ai_agent_enabled
}
