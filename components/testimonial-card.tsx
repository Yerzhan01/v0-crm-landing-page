import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  text: string
  author: string
}

export function TestimonialCard({ quote, text, author }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6 space-y-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-warning text-warning" />
          ))}
        </div>
        <p className="font-semibold text-lg text-balance">{quote}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
        <p className="text-sm font-medium pt-2 border-t">— {author}</p>
      </CardContent>
    </Card>
  )
}
