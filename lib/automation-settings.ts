import { createClient } from "@/lib/supabase/server"

export interface AutomationSettings {
  enabled: boolean
  ai_agent_enabled: boolean
  chatbot_enabled: boolean
  notifications_enabled: boolean
  updated_at: string
}

export async function getAutomationSettings(tenantId: string): Promise<AutomationSettings> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("automation_settings").select("*").eq("tenant_id", tenantId).single()

  if (error || !data) {
    // Return default settings if not found
    return {
      enabled: true,
      ai_agent_enabled: true,
      chatbot_enabled: true,
      notifications_enabled: true,
      updated_at: new Date().toISOString(),
    }
  }

  return data
}

export async function updateAutomationSettings(
  tenantId: string,
  settings: Partial<AutomationSettings>,
): Promise<boolean> {
  const supabase = await createClient()

  const { error } = await supabase
    .from("automation_settings")
    .upsert({
      tenant_id: tenantId,
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .eq("tenant_id", tenantId)

  return !error
}

export async function isAutomationEnabled(tenantId: string): Promise<boolean> {
  const settings = await getAutomationSettings(tenantId)
  return settings.enabled && settings.ai_agent_enabled
}
