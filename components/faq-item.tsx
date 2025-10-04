import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FaqItemProps {
  question: string
  answer: string
  value: string
}

export function FaqItem({ question, answer, value }: FaqItemProps) {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-left font-semibold">{question}</AccordionTrigger>
      <AccordionContent className="text-muted-foreground leading-relaxed">{answer}</AccordionContent>
    </AccordionItem>
  )
}
