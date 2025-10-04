"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { registerUser } from "@/app/actions/register"

interface RegistrationFormProps {
  businessType: "classic" | "services" | "kaspi"
  translations: {
    title: string
    description: string
    fullName: string
    email: string
    phone: string
    plan: string
    starter: string
    professional: string
    enterprise: string
    submit: string
    submitting: string
    success: string
    error: string
  }
}

export function RegistrationForm({ businessType, translations }: RegistrationFormProps) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [plan, setPlan] = useState<"starter" | "professional" | "enterprise">("professional")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const result = await registerUser({
      fullName,
      email,
      phone,
      businessType,
      plan,
    })

    setIsLoading(false)

    if (result.success) {
      setMessage({ type: "success", text: translations.success })
      setFullName("")
      setEmail("")
      setPhone("")
      setPlan("professional")
    } else {
      setMessage({ type: "error", text: result.error || translations.error })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{translations.title}</CardTitle>
        <CardDescription>{translations.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">{translations.fullName}</Label>
            <Input
              id="fullName"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Иван Иванов"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{translations.email}</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ivan@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{translations.phone}</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (777) 123-45-67"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan">{translations.plan}</Label>
            <select
              id="plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value as "starter" | "professional" | "enterprise")}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="starter">{translations.starter}</option>
              <option value="professional">{translations.professional}</option>
              <option value="enterprise">{translations.enterprise}</option>
            </select>
          </div>

          {message && (
            <div
              className={`p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? translations.submitting : translations.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
