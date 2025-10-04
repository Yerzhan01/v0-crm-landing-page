"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, UserPlus, Users, TrendingUp } from "lucide-react"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

interface ReferralsContentProps {
  profile: any
  referralCode: any
  referrals: any[]
}

export function ReferralsContent({ profile, referralCode, referrals }: ReferralsContentProps) {
  const { t, locale } = useDashboardTranslation()
  const [copied, setCopied] = useState(false)

  const referralLink = referralCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/register?ref=${referralCode.code}`
    : ""

  const handleCopyLink = async () => {
    if (referralLink) {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const activeReferrals = referrals.filter((r) => r.status === "paid").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t.referralProgram}</h1>
        <p className="text-muted-foreground mt-2">{t.referralDescription}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.totalReferrals}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referrals.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.activeReferrals}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeReferrals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t.referralBonus}</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referralCode?.commission_rate || 10}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.inviteFriends}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {referralCode && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.referralCode}</label>
                <div className="flex gap-2">
                  <Input value={referralCode.code} readOnly className="font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{t.referralLink}</label>
                <div className="flex gap-2">
                  <Input value={referralLink} readOnly className="flex-1" />
                  <Button onClick={handleCopyLink} variant="outline">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        {t.linkCopied}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        {t.copyReferralLink}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.yourReferrals}</CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">{t.noReferrals}</p>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{referral.user_profiles?.full_name || referral.referred_email}</p>
                    <p className="text-sm text-muted-foreground">{referral.referred_email}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.referralDate}:{" "}
                      {new Date(referral.registered_at || referral.created_at).toLocaleDateString(locale)}
                    </p>
                  </div>
                  <Badge variant={referral.status === "paid" ? "default" : "secondary"}>
                    {referral.status === "paid" ? t.referralActive : t.referralInactive}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
