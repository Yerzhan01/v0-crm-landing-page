"use client"

import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"
import { AddDealDialog } from "@/components/add-deal-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Settings, Plus, MoreVertical } from "lucide-react"
import Link from "next/link"

interface FunnelsPageContentProps {
  funnel: any
  deals: any[]
  stages: any[]
  allFunnels: any[]
  clients: any[]
  users: any[]
}

export function FunnelsPageContent({ funnel, deals, stages, allFunnels, clients, users }: FunnelsPageContentProps) {
  const { t } = useDashboardTranslation()
  const totalAmount = deals?.reduce((sum, deal) => sum + (Number(deal.amount) || 0), 0) || 0

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/dashboard/funnels">
            <Button variant="ghost" size="sm">
              ← {t.back}
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold uppercase">{funnel.name}</h1>
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t.search} className="pl-9 w-full md:w-64" />
          </div>
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {deals?.length || 0} {t.deals}:{" "}
            <span className="font-semibold">{totalAmount.toLocaleString("ru-RU")} ₸</span>
          </span>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Settings className="h-4 w-4" />
          </Button>
          <AddDealDialog funnels={allFunnels || []} clients={clients || []} users={users || []} />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {stages.map((stage: any) => {
          const stageDeals = deals?.filter((deal) => deal.stage_id === stage.id) || []
          const stageAmount = stageDeals.reduce((sum, deal) => sum + (Number(deal.amount) || 0), 0)

          return (
            <div key={stage.id} className="flex-shrink-0 w-72 md:w-80">
              {/* Stage Header */}
              <div className="mb-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm md:text-base uppercase">{stage.name}</h3>
                  <Button variant="ghost" size="icon" className="h-6 w-6 md:h-8 md:w-8">
                    <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                  <span>
                    {stageDeals.length} {t.deals}
                  </span>
                  <span>{stageAmount.toLocaleString("ru-RU")} ₸</span>
                </div>
              </div>

              {/* Deals */}
              <div className="space-y-2">
                {stageDeals.length === 0 && stage.position === 0 && (
                  <Card className="p-4 border-dashed">
                    <p className="text-sm text-center text-muted-foreground">{t.quickAdd}</p>
                  </Card>
                )}

                {stageDeals.map((deal) => (
                  <Card
                    key={deal.id}
                    className="hover:shadow-md transition-shadow cursor-pointer group active:scale-[0.98]"
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-xs md:text-sm text-muted-foreground mb-1">
                            {t.from}: {deal.clients?.full_name || t.unknown}
                          </p>
                          <h4 className="font-medium text-sm md:text-base mb-1">{deal.title}</h4>
                        </div>
                      </div>

                      {deal.created_at && (
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
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
                        <div className="text-sm md:text-base font-semibold">
                          {Number(deal.amount).toLocaleString("ru-RU")} ₸
                        </div>
                      )}

                      {deal.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {deal.tags.split(",").map((tag: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs md:text-sm">
                              {tag.trim()}
                            </Badge>
                          ))}
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
