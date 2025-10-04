"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Users, DollarSign, TrendingUp, Gift } from "lucide-react"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

interface SettingsContentProps {
  user: any
  profile: any
  referralCode: any
  referralStats: any[]
  referralPayouts: any[]
  totalClicks: number
  totalRegistrations: number
  totalPaid: number
  totalEarned: number
  pendingEarnings: number
  referralUrl: string
}

export default function SettingsContent({
  user,
  profile,
  referralCode,
  referralStats,
  referralPayouts,
  totalClicks,
  totalRegistrations,
  totalPaid,
  totalEarned,
  pendingEarnings,
  referralUrl,
}: SettingsContentProps) {
  const { t } = useDashboardTranslation()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t.settings}</h1>
        <p className="text-muted-foreground mt-2">{t.manageSettings}</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">{t.profile}</TabsTrigger>
          <TabsTrigger value="company">{t.company}</TabsTrigger>
          <TabsTrigger value="referral">{t.referralProgram}</TabsTrigger>
          <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
          <TabsTrigger value="security">{t.security}</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.personalInfo}</CardTitle>
              <CardDescription>{t.updateProfile}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t.fullName}</Label>
                <Input id="fullName" defaultValue={profile?.full_name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input id="email" type="email" defaultValue={user?.email || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t.phone}</Label>
                <Input id="phone" type="tel" defaultValue={profile?.phone || ""} />
              </div>
              <Button>{t.saveChanges}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.companyInfo}</CardTitle>
              <CardDescription>{t.manageCompany}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">{t.companyName}</Label>
                <Input id="companyName" defaultValue={profile?.tenants?.name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">{t.timezone}</Label>
                <Select defaultValue="Asia/Almaty">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Almaty">{t.almaty}</SelectItem>
                    <SelectItem value="Asia/Aqtobe">{t.aqtobe}</SelectItem>
                    <SelectItem value="Europe/Moscow">{t.moscow}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>{t.saveChanges}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referral" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.clicks}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClicks}</div>
                <p className="text-xs text-muted-foreground">{t.totalClicks}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.registrations}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRegistrations}</div>
                <p className="text-xs text-muted-foreground">{t.registeredUsers}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.paid}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPaid}</div>
                <p className="text-xs text-muted-foreground">{t.totalPaid}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.earned}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEarned.toLocaleString()}₸</div>
                <p className="text-xs text-muted-foreground">{t.totalEarned}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t.yourReferralLink}</CardTitle>
              <CardDescription>{t.shareReferralLink}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={referralUrl} readOnly className="font-mono text-sm" />
                <Button size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{t.howItWorks}</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                  <li>• {t.shareYourLink}</li>
                  <li>• {t.referralRegisters}</li>
                  <li>• {t.payoutsMonthly}</li>
                </ul>
              </div>

              {pendingEarnings > 0 && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm">
                    <span className="font-semibold">{t.pendingEarnings}:</span> {pendingEarnings.toLocaleString()}₸
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{t.payoutAfterConfirmation}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {referralStats && referralStats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.yourReferrals}</CardTitle>
                <CardDescription>{t.referralsList}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.email}</TableHead>
                      <TableHead>{t.registrationDate}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead className="text-right">{t.commission}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralStats.map((stat: any) => (
                      <TableRow key={stat.id}>
                        <TableCell>{stat.referred_email}</TableCell>
                        <TableCell>{new Date(stat.created_at).toLocaleDateString("ru-RU")}</TableCell>
                        <TableCell>
                          <Badge variant={stat.status === "paid" ? "default" : "secondary"}>
                            {stat.status === "paid" ? t.paid : t.registered}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{(stat.commission_amount || 0).toLocaleString()}₸</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {referralPayouts && referralPayouts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.payoutHistory}</CardTitle>
                <CardDescription>{t.last10Payouts}</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.date}</TableHead>
                      <TableHead>{t.amount}</TableHead>
                      <TableHead>{t.status}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralPayouts.map((payout: any) => (
                      <TableRow key={payout.id}>
                        <TableCell>{new Date(payout.created_at).toLocaleDateString("ru-RU")}</TableCell>
                        <TableCell>{payout.amount.toLocaleString()}₸</TableCell>
                        <TableCell>
                          <Badge variant={payout.status === "paid" ? "default" : "secondary"}>{payout.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.notificationsSettings}</CardTitle>
              <CardDescription>{t.manageNotifications}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.emailNotifications}</Label>
                  <p className="text-sm text-muted-foreground">{t.receiveEmailNotifications}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.pushNotifications}</Label>
                  <p className="text-sm text-muted-foreground">{t.receivePushNotifications}</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.newCustomers}</Label>
                  <p className="text-sm text-muted-foreground">{t.notifyNewCustomers}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.newDeals}</Label>
                  <p className="text-sm text-muted-foreground">{t.notifyNewDeals}</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.securitySettings}</CardTitle>
              <CardDescription>{t.manageAccountSecurity}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t.currentPassword}</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t.newPassword}</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>{t.changePassword}</Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t.twoFactorAuth}</Label>
                  <p className="text-sm text-muted-foreground">{t.addSecurityLayer}</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
