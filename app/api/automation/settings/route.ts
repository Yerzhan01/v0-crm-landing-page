import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

    if (!profile?.tenant_id) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }

    const { data: settings } = await supabase
      .from("automation_settings")
      .select("*")
      .eq("tenant_id", profile.tenant_id)
      .single()

    if (!settings) {
      // Return default settings
      return NextResponse.json({
        enabled: true,
        ai_agent_enabled: true,
        chatbot_enabled: true,
        notifications_enabled: true,
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("[v0] Error fetching automation settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

    if (!profile?.tenant_id) {
      return NextResponse.json({ error: "Tenant not found" }, { status: 404 })
    }

    const body = await request.json()

    const { error } = await supabase
      .from("automation_settings")
      .upsert({
        tenant_id: profile.tenant_id,
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("tenant_id", profile.tenant_id)

    if (error) {
      console.error("[v0] Error updating automation settings:", error)
      return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating automation settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
