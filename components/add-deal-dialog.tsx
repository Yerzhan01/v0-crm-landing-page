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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { createDeal } from "@/app/actions/deals"
import { useRouter } from "next/navigation"

interface AddDealDialogProps {
  funnels: any[]
  clients: any[]
  users: any[]
}

export function AddDealDialog({ funnels, clients, users }: AddDealDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedFunnel, setSelectedFunnel] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await createDeal(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setOpen(false)
      setLoading(false)
      router.refresh()
    }
  }

  const selectedFunnelData = funnels.find((f) => f.id === selectedFunnel)
  const stages = selectedFunnelData?.funnel_stages || []

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Новая сделка
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Новая сделка</DialogTitle>
          <DialogDescription>Создайте новую сделку в воронке продаж</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название сделки *</Label>
            <Input id="title" name="title" placeholder="Продажа CRM системы" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="funnel_id">Воронка *</Label>
              <Select name="funnel_id" value={selectedFunnel} onValueChange={setSelectedFunnel} required>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите воронку" />
                </SelectTrigger>
                <SelectContent>
                  {funnels.map((funnel) => (
                    <SelectItem key={funnel.id} value={funnel.id}>
                      {funnel.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stage_id">Этап *</Label>
              <Select name="stage_id" required disabled={!selectedFunnel}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите этап" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage: any) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client_id">Клиент</Label>
            <Select name="client_id">
              <SelectTrigger>
                <SelectValue placeholder="Выберите клиента" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Сумма (₸)</Label>
              <Input id="amount" name="amount" type="number" placeholder="100000" min="0" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="probability">Вероятность (%)</Label>
              <Input id="probability" name="probability" type="number" defaultValue="50" min="0" max="100" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expected_close_date">Ожидаемая дата закрытия</Label>
            <Input id="expected_close_date" name="expected_close_date" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea id="description" name="description" placeholder="Детали сделки" rows={3} />
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Создание..." : "Создать"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
