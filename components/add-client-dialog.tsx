"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { createClient } from "@/app/actions/clients"
import { useRouter } from "next/navigation"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

export function AddClientDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { t } = useDashboardTranslation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await createClient(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setOpen(false)
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t.actions.addClient}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t.clients.newClient}</DialogTitle>
          <DialogDescription>{t.clients.addNewClient}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">{t.clients.fullName} *</Label>
            <Input id="full_name" name="full_name" placeholder={t.clients.fullNamePlaceholder} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t.clients.email}</Label>
            <Input id="email" name="email" type="email" placeholder={t.clients.emailPlaceholder} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t.clients.phone} *</Label>
            <Input id="phone" name="phone" type="tel" placeholder={t.clients.phonePlaceholder} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">{t.clients.source}</Label>
            <Select name="source">
              <SelectTrigger>
                <SelectValue placeholder={t.clients.selectSource} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">{t.clients.sourceWebsite}</SelectItem>
                <SelectItem value="referral">{t.clients.sourceReferral}</SelectItem>
                <SelectItem value="social">{t.clients.sourceSocial}</SelectItem>
                <SelectItem value="advertising">{t.clients.sourceAdvertising}</SelectItem>
                <SelectItem value="other">{t.clients.sourceOther}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t.actions.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t.actions.saving : t.actions.save}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
