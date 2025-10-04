"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { sendMessage } from "@/app/actions/messages"
import { useRouter } from "next/navigation"

interface MessageInputProps {
  conversationId: string
}

export function MessageInput({ conversationId }: MessageInputProps) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || loading) return

    setLoading(true)
    const result = await sendMessage(conversationId, content.trim())

    if (!result.error) {
      setContent("")
      router.refresh()
    }
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение..."
        className="min-h-[60px] max-h-[120px] resize-none"
        disabled={loading}
      />
      <Button type="submit" size="icon" disabled={loading || !content.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
