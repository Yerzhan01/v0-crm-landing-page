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
import { createAppointment } from "@/app/actions/appointments"
import { useRouter } from "next/navigation"
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"

interface AddAppointmentDialogProps {
  clients: any[]
  services: any[]
  staff: any[]
}

export function AddAppointmentDialog({ clients, services, staff }: AddAppointmentDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedService, setSelectedService] = useState("")
  const router = useRouter()
  const { t } = useDashboardTranslation()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const result = await createAppointment(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setOpen(false)
      setLoading(false)
      router.refresh()
    }
  }

  const selectedServiceData = services.find((s) => s.id === selectedService)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t.newAppointment}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.newAppointment}</DialogTitle>
          <DialogDescription>{t.createNewAppointment}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_id">{t.client} *</Label>
              <Select name="client_id" required>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectClient} />
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
            <div className="space-y-2">
              <Label htmlFor="service_id">{t.appointmentService}</Label>
              <Select name="service_id" value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectService} />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="staff_id">{t.staff}</Label>
            <Select name="staff_id">
              <SelectTrigger>
                <SelectValue placeholder={t.selectStaff} />
              </SelectTrigger>
              <SelectContent>
                {staff.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">{t.noStaffAvailable}</div>
                ) : (
                  staff.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.full_name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">{t.title} *</Label>
            <Input
              id="title"
              name="title"
              placeholder={t.appointmentTitle}
              defaultValue={selectedServiceData?.name || ""}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_time">{t.dateTime} *</Label>
              <Input id="start_time" name="start_time" type="datetime-local" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">
                {t.duration} ({t.minutes})
              </Label>
              <Input
                id="duration_minutes"
                name="duration_minutes"
                type="number"
                defaultValue={selectedServiceData?.duration_minutes || 60}
                min="15"
                step="15"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t.description}</Label>
            <Textarea id="description" name="description" placeholder={t.additionalInfo} rows={3} />
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t.cancel}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t.creating : t.create}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
