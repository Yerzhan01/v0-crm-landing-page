"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"
import { Gift, Users, TrendingUp, Copy, Check, MessageCircle } from "lucide-react"
import { useState } from "react"

interface ReferralsPageContentProps {
  stats: any[]
  transactions: any[]
}

export function ReferralsPageContent({ stats, transactions }: ReferralsPageContentProps) {
  const { t } = useDashboardTranslation()
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const totalReferrals = stats.reduce((sum, s) => sum + (s.total_referrals || 0), 0)
  const totalBonuses = stats.reduce((sum, s) => sum + (Number.parseFloat(s.bonus_balance) || 0), 0)
  const totalEarned = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + (Number.parseFloat(t.amount) || 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.referrals}</h1>
        <p className="text-muted-foreground">{t.referralStats}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalReferrals}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReferrals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.bonusBalance}</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBonuses.toFixed(0)} ₸</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalEarned}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEarned.toFixed(0)} ₸</div>
          </CardContent>
        </Card>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>{t.howItWorks}</CardTitle>
          <CardDescription>{t.getCodeViaWhatsApp}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <p className="text-sm">{t.referralStep1}</p>
            </div>
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <p className="text-sm">{t.referralStep2}</p>
            </div>
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <p className="text-sm">{t.referralStep3}</p>
            </div>
            <div className="space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                4
              </div>
              <p className="text-sm">{t.referralStep4}</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-2 text-sm">
              <MessageCircle className="h-5 w-5" />
              <span>
                {t.sendKeyword} <code className="rounded bg-background px-2 py-1 font-mono font-bold">ПРОМОКОД</code>{" "}
                {t.toGetCode}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Referrers */}
      <Card>
        <CardHeader>
          <CardTitle>{t.referralStats}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.map((client) => (
              <div key={client.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">{client.full_name}</p>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-sm font-mono">{client.referral_code}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(client.referral_code)}
                      className="h-6 w-6 p-0"
                    >
                      {copiedCode === client.referral_code ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{t.totalReferrals}</div>
                  <div className="text-xl font-bold">{client.total_referrals || 0}</div>
                  <div className="text-sm text-muted-foreground">
                    {Number.parseFloat(client.bonus_balance || 0).toFixed(0)} ₸
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>{t.referralHistory}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{transaction.referrer?.full_name}</p>
                    <Badge variant={transaction.transaction_type === "referral_bonus" ? "default" : "secondary"}>
                      {transaction.transaction_type === "referral_bonus" ? t.referralBonus : t.saleCommission}
                    </Badge>
                  </div>
                  {transaction.referred_client && (
                    <p className="text-sm text-muted-foreground">
                      {t.referredClient}: {transaction.referred_client.full_name}
                    </p>
                  )}
                  {transaction.sale_amount && (
                    <p className="text-sm text-muted-foreground">
                      {t.saleAmount}: {Number.parseFloat(transaction.sale_amount).toFixed(0)} ₸ (
                      {transaction.percentage}%)
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(transaction.created_at).toLocaleDateString("ru-RU")}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    +{Number.parseFloat(transaction.amount).toFixed(0)} ₸
                  </div>
                  <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
