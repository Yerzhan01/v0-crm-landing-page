import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Archive } from "lucide-react"
import Link from "next/link"
import { AddFunnelDialog } from "@/components/add-funnel-dialog"

export default async function FunnelsListPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  // Fetch all funnels with deal counts
  const { data: funnels } = await supabase
    .from("funnels")
    .select("*, funnel_stages(id)")
    .eq("tenant_id", profile?.tenant_id)
    .eq("is_active", true)
    .order("created_at")

  // Get deal counts for each funnel
  const funnelsWithCounts = await Promise.all(
    (funnels || []).map(async (funnel) => {
      const { count } = await supabase
        .from("deals")
        .select("*", { count: "exact", head: true })
        .eq("funnel_id", funnel.id)
        .eq("status", "open")

      return {
        ...funnel,
        dealCount: count || 0,
      }
    }),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Сделки</h1>
          <p className="text-muted-foreground mt-1">Управление воронками продаж</p>
        </div>
      </div>

      <div className="space-y-3">
        {funnelsWithCounts.map((funnel) => (
          <Link key={funnel.id} href={`/dashboard/funnels/${funnel.id}`}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{funnel.name}</CardTitle>
                  <span className="text-sm text-muted-foreground">Заявки: {funnel.dealCount}</span>
                </div>
                {funnel.description && <CardDescription>{funnel.description}</CardDescription>}
              </CardHeader>
            </Card>
          </Link>
        ))}

        <AddFunnelDialog />
      </div>

      <div className="pt-6 border-t">
        <Link href="/dashboard/funnels/all">
          <Button variant="ghost" className="w-full justify-start">
            Все сделки
          </Button>
        </Link>
        <Link href="/dashboard/funnels/archived">
          <Button variant="ghost" className="w-full justify-start">
            <Archive className="h-4 w-4 mr-2" />
            Архивные воронки
          </Button>
        </Link>
      </div>
    </div>
  )
}
