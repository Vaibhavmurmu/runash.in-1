"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Send, Loader2, X, Maximize2, Minimize2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIAssistant({ sellerId = "demo-seller" }: { sellerId?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = [
    "Optimize product listings",
    "Analyze top-performing products",
    "Generate monthly report",
    "Suggest pricing strategy",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          sellerId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      setError("Failed to process your request. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <Card className="border-secondary/30 bg-gradient-to-br from-secondary/5 to-transparent fixed bottom-6 right-6 w-96 z-40">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <span className="ai-badge text-xs">
                <Zap className="w-3 h-3" />
                Ready
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Get AI-powered insights and automate workflows</p>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  handleSuggestionClick(suggestion)
                  setIsOpen(true)
                }}
                className="w-full text-left text-sm p-2 rounded-lg border border-border hover:border-secondary hover:bg-secondary/5 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <Button onClick={() => setIsOpen(true)} className="w-full bg-secondary hover:bg-secondary/90" size="sm">
            <Zap className="w-4 h-4 mr-2" />
            Start Chat
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`border-secondary/30 bg-card fixed z-40 ${
        isExpanded ? "bottom-0 right-0 w-full h-full rounded-none" : "bottom-6 right-6 w-96 max-h-96"
      } flex flex-col transition-all duration-300`}
    >
      <CardHeader className="border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">SellerHub AI Assistant</CardTitle>
            <span className="ai-badge text-xs">
              <Zap className="w-3 h-3" />
              Live
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-muted rounded transition-colors"
              title="Toggle fullscreen"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                setMessages([])
              }}
              className="p-1 hover:bg-muted rounded transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardHeader>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Zap className="w-12 h-12 text-secondary/50 mb-3" />
            <p className="text-sm text-muted-foreground">Start a conversation</p>
            <p className="text-xs text-muted-foreground mt-1">Ask about your business, products, or get insights</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-none"
                  : "bg-muted text-muted-foreground rounded-bl-none"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground/70"
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground rounded-lg rounded-bl-none px-4 py-2 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center">
            <div className="bg-destructive/10 text-destructive rounded-lg px-4 py-2 text-sm">{error}</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border p-4 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
            disabled={isLoading}
            className="flex-1 px-3 py-2 rounded-lg border border-input bg-input text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
          <Button
            size="sm"
            disabled={isLoading || !message.trim()}
            onClick={handleSendMessage}
            className="bg-secondary hover:bg-secondary/90"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </Card>
  )
}
