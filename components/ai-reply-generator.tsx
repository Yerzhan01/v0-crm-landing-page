"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Copy, RefreshCw } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface AIReplyGeneratorProps {
  conversationHistory: any[]
  clientInfo: any
  onUseReply: (reply: string) => void
}

export function AIReplyGenerator({ conversationHistory, clientInfo, onUseReply }: AIReplyGeneratorProps) {
  const [loading, setLoading] = useState(false)
  const [generatedReply, setGeneratedReply] = useState("")

  const generateReply = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/ai/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationHistory: conversationHistory.slice(-5),
          clientInfo,
          tone: "professional",
        }),
      })

      const data = await response.json()
      setGeneratedReply(data.reply)
    } catch (error) {
      console.error("Error generating reply:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          AI Генератор ответов
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {!generatedReply ? (
          <Button onClick={generateReply} disabled={loading} className="w-full">
            {loading ? "Генерация..." : "Сгенерировать ответ"}
          </Button>
        ) : (
          <>
            <Textarea value={generatedReply} onChange={(e) => setGeneratedReply(e.target.value)} rows={4} />
            <div className="flex gap-2">
              <Button onClick={() => onUseReply(generatedReply)} className="flex-1">
                Использовать
              </Button>
              <Button onClick={copyToClipboard} variant="outline" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
              <Button onClick={generateReply} variant="outline" size="icon" disabled={loading}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
