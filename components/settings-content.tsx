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
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Настройки</h1>
        <p className="text-muted-foreground mt-2">Управляйте настройками вашего аккаунта и ArzanCRM</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="company">Компания</TabsTrigger>
          <TabsTrigger value="referral">Реферальная программа</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
              <CardDescription>Обновите информацию вашего профиля</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Полное имя</Label>
                <Input id="fullName" defaultValue={profile?.full_name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || ""} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" defaultValue={profile?.phone || ""} />
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Информация о компании</CardTitle>
              <CardDescription>Управляйте настройками вашей организации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Название компании</Label>
                <Input id="companyName" defaultValue={profile?.tenants?.name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Часовой пояс</Label>
                <Select defaultValue="Asia/Almaty">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Almaty">Алматы (GMT+6)</SelectItem>
                    <SelectItem value="Asia/Aqtobe">Актобе (GMT+5)</SelectItem>
                    <SelectItem value="Europe/Moscow">Москва (GMT+3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referral" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Переходы</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClicks}</div>
                <p className="text-xs text-muted-foreground">Всего кликов по ссылке</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Регистрации</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRegistrations}</div>
                <p className="text-xs text-muted-foreground">Зарегистрировались</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Оплаты</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPaid}</div>
                <p className="text-xs text-muted-foreground">Оплатили подписку</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Заработано</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEarned.toLocaleString()}₸</div>
                <p className="text-xs text-muted-foreground">Всего комиссии</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ваша реферальная ссылка</CardTitle>
              <CardDescription>Делитесь этой ссылкой и получайте 10% от каждой продажи</CardDescription>
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
                  <span className="font-semibold">Как это работает?</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                  <li>• Поделитесь своей реферальной ссылкой</li>
                  <li>• Когда кто-то регистрируется по вашей ссылке, вы получаете 10% от их платежей</li>
                  <li>• Выплаты производятся ежемесячно при достижении минимальной суммы 10,000₸</li>
                </ul>
              </div>

              {pendingEarnings > 0 && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm">
                    <span className="font-semibold">Ожидает выплаты:</span> {pendingEarnings.toLocaleString()}₸
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Будет выплачено после подтверждения оплат рефералами
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {referralStats && referralStats.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Ваши рефералы</CardTitle>
                <CardDescription>Список пользователей, зарегистрированных по вашей ссылке</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Дата регистрации</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead className="text-right">Комиссия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referralStats.map((stat: any) => (
                      <TableRow key={stat.id}>
                        <TableCell>{stat.referred_email}</TableCell>
                        <TableCell>{new Date(stat.created_at).toLocaleDateString("ru-RU")}</TableCell>
                        <TableCell>
                          <Badge variant={stat.status === "paid" ? "default" : "secondary"}>
                            {stat.status === "paid" ? "Оплачено" : "Зарегистрирован"}
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
                <CardTitle>История выплат</CardTitle>
                <CardDescription>Последние 10 выплат реферальных комиссий</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
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
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Управляйте тем, как вы получаете уведомления</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать push уведомления в браузере</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Новые клиенты</Label>
                  <p className="text-sm text-muted-foreground">Уведомлять о новых клиентах</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Новые сделки</Label>
                  <p className="text-sm text-muted-foreground">Уведомлять о новых сделках</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Управляйте настройками безопасности вашего аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Текущий пароль</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Изменить пароль</Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Двухфакторная аутентификация</Label>
                  <p className="text-sm text-muted-foreground">Добавьте дополнительный уровень безопасности</p>
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
