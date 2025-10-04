import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { AddDealDialog } from "@/components/add-deal-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Settings, Plus, MoreVertical } from "lucide-react"
import Link from "next/link"

export default async function FunnelDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("user_profiles").select("tenant_id").eq("id", user.id).single()

  // Fetch funnel with stages
  const { data: funnel } = await supabase
    .from("funnels")
    .select("*, funnel_stages(*)")
    .eq("id", params.id)
    .eq("tenant_id", profile?.tenant_id)
    .single()

  if (!funnel) {
    notFound()
  }

  // Fetch deals for this funnel
  const { data: deals } = await supabase
    .from("deals")
    .select("*, clients(*), funnel_stages(*)")
    .eq("funnel_id", funnel.id)
    .eq("status", "open")
    .order("created_at", { ascending: false })

  // Fetch clients and users for the dialog
  const [{ data: clients }, { data: users }, { data: allFunnels }] = await Promise.all([
    supabase.from("clients").select("*").eq("tenant_id", profile?.tenant_id).order("full_name"),
    supabase.from("user_profiles").select("*").eq("tenant_id", profile?.tenant_id),
    supabase.from("funnels").select("*").eq("tenant_id", profile?.tenant_id).eq("is_active", true),
  ])

  const stages = funnel.funnel_stages?.sort((a: any, b: any) => a.position - b.position) || []

  // Calculate total amount
  const totalAmount = deals?.reduce((sum, deal) => sum + (Number(deal.amount) || 0), 0) || 0

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/funnels">
            <Button variant="ghost" size="sm">
              ← Назад
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold uppercase">{funnel.name}</h1>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Поиск и фильтр" className="pl-9 w-64" />
          </div>
          <span className="text-sm text-muted-foreground">
            {deals?.length || 0} сделок: <span className="font-semibold">{totalAmount.toLocaleString("ru-RU")} ₸</span>
          </span>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <AddDealDialog funnels={allFunnels || []} clients={clients || []} users={users || []} />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage: any) => {
          const stageDeals = deals?.filter((deal) => deal.stage_id === stage.id) || []
          const stageAmount = stageDeals.reduce((sum, deal) => sum + (Number(deal.amount) || 0), 0)

          return (
            <div key={stage.id} className="flex-shrink-0 w-80">
              {/* Stage Header */}
              <div className="mb-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm uppercase">{stage.name}</h3>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {stageDeals.length > 0 ? `${stageDeals.length} сделка` : "Заявки"}: {stageDeals.length}
                  </span>
                  <span>{stageAmount.toLocaleString("ru-RU")} ₸</span>
                </div>
              </div>

              {/* Deals */}
              <div className="space-y-2">
                {stageDeals.length === 0 && stage.position === 0 && (
                  <Card className="p-4 border-dashed">
                    <p className="text-sm text-center text-muted-foreground">Быстрое добавление</p>
                  </Card>
                )}

                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">
                            от: {deal.clients?.full_name || "Неизвестно"}
                          </p>
                          <h4 className="font-medium text-sm mb-1">{deal.title}</h4>
                        </div>
                      </div>

                      {deal.created_at && (
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(deal.created_at).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}

                      {deal.amount && (
                        <div className="text-sm font-semibold">{Number(deal.amount).toLocaleString("ru-RU")} ₸</div>
                      )}

                      {deal.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {deal.tags.split(",").map((tag: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {deal.probability && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {deal.probability > 0 && `+${deal.probability}`}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
