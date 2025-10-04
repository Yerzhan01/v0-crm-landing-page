import type { LucideIcon } from "lucide-react"

interface FeatureItemProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureItem({ icon: Icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="shrink-0">
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
