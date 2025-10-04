import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PricingCardProps {
  title: string
  price: string
  features: string[]
  badge?: string
}

export function PricingCard({ title, price, features, badge }: PricingCardProps) {
  return (
    <Card className="relative">
      {badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-success text-success-foreground">{badge}</Badge>
      )}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl mb-2">{title}</CardTitle>
        <div className="text-3xl font-bold text-primary">{price}</div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
