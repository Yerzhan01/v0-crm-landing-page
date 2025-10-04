import type React from "react"
import { FileQuestion } from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center px-4">
      <div className="mb-4 text-muted-foreground">{icon || <FileQuestion className="h-12 w-12" />}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-md">{description}</p>}
    </div>
  )
}
