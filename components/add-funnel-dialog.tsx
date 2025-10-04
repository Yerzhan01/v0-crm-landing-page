"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { createFunnel } from "@/app/actions/funnels"
import { useRouter } from "next/navigation"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

export function AddFunnelDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const router = useRouter()
  const { t } = useDashboardTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await createFunnel({ name, description })

      if (result.success) {
        setOpen(false)
        setName("")
        setDescription("")
        router.refresh()
      } else {
        alert(result.error || t.error)
      }
    } catch (error) {
      console.error("Error creating funnel:", error)
      alert(t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start h-auto py-4 bg-transparent" size="lg">
          <Plus className="h-4 w-4 mr-2" />
          {t.addFunnel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t.createFunnel}</DialogTitle>
            <DialogDescription>{t.addNewFunnel}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t.funnelName} *</Label>
              <Input
                id="name"
                placeholder={t.funnelNamePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{t.description}</Label>
              <Textarea
                id="description"
                placeholder={t.descriptionPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              {t.cancel}
            </Button>
            <Button type="submit" disabled={loading || !name.trim()}>
              {loading ? t.creating : t.createFunnel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
