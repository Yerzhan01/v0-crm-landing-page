import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

interface BusinessTypeCardProps {
  icon: string
  title: string
  subtitle: string
  description: string
  features: string[]
  suitableFor: string
  ctaText: string
  href: string
}

export function BusinessTypeCard({
  icon,
  title,
  subtitle,
  description,
  features,
  suitableFor,
  ctaText,
  href,
}: BusinessTypeCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary">
      <CardHeader className="text-center pb-4">
        <div className="text-5xl mb-4">{icon}</div>
        <CardTitle className="text-2xl mb-2">{title}</CardTitle>
        <CardDescription className="text-base font-medium text-foreground/70">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="inline-block text-left mx-auto">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-muted-foreground pt-2 border-t">{suitableFor}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-warning hover:bg-warning/90 text-warning-foreground" size="lg">
          <Link href={href}>{ctaText} →</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
