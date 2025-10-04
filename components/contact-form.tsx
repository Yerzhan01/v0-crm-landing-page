"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getTranslation, type Language } from "@/lib/translations"

interface ContactFormProps {
  lang: Language
}

export function ContactForm({ lang }: ContactFormProps) {
  const t = getTranslation(lang)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would send the form data to your backend here
    setIsSubmitting(false)
    setStatus("success")

    // Reset form after success
    if (e.target instanceof HTMLFormElement) {
      e.target.reset()
    }

    // Clear success message after 5 seconds
    setTimeout(() => setStatus("idle"), 5000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{t.contactNameLabel}</Label>
        <Input id="name" name="name" required placeholder={t.contactNameLabel} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t.contactEmailLabel}</Label>
        <Input id="email" name="email" type="email" required placeholder="example@email.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">{t.contactPhoneLabel}</Label>
        <Input id="phone" name="phone" type="tel" placeholder="+7 777 123 4567" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t.contactMessageLabel}</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={t.contactMessageLabel}
          rows={5}
          className="resize-none"
        />
      </div>

      {status === "success" && (
        <div className="rounded-lg bg-success/10 border border-success/20 p-4 text-sm text-success-foreground">
          {t.contactSuccessMessage}
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
          {t.contactErrorMessage}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t.contactSendingButton : t.contactSendButton}
      </Button>
    </form>
  )
}
