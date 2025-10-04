"use client"

import type React from "react"
import { signup } from "@/app/actions/auth"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const defaultCrmType = searchParams.get("type") || "classic"
  const defaultPlan = searchParams.get("plan") || "starter"

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [crmType, setCrmType] = useState(defaultCrmType)
  const [plan, setPlan] = useState(defaultPlan)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)

    const result = await signup(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    if (result?.success) {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Проверьте email</CardTitle>
            <CardDescription>
              Мы отправили письмо с подтверждением на {email}. Пожалуйста, проверьте почту и перейдите по ссылке для
              активации аккаунта.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/auth/login")} className="w-full">
              Вернуться на страницу входа
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Регистрация в CRM</CardTitle>
          <CardDescription>Создайте аккаунт и начните работу</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Полное имя</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Иван Иванов"
                defaultValue={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Название компании</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="ТОО Моя Компания"
                defaultValue={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <input type="hidden" name="crmType" value={crmType} />
            <input type="hidden" name="plan" value={plan} />
            <div className="space-y-2">
              <Label htmlFor="crmType">Тип CRM</Label>
              <Select value={crmType} onValueChange={setCrmType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classic">CRM Классик</SelectItem>
                  <SelectItem value="services">CRM для услуг</SelectItem>
                  <SelectItem value="kaspi">CRM для Kaspi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Тариф</Label>
              <Select value={plan} onValueChange={setPlan}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter - 3000₸/мес</SelectItem>
                  <SelectItem value="professional">Professional - 7000₸/мес</SelectItem>
                  <SelectItem value="enterprise">Enterprise - 15000₸/мес</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Уже есть аккаунт? </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
