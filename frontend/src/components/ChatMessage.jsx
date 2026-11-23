import { Bot, User } from "lucide-react"

export default function ChatMessage({ role, content }) {
  const isUser = role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${isUser ? "rounded-br-md bg-primary text-primary-foreground" : "rounded-bl-md border bg-card text-foreground"}`}>
        {content}
      </div>
      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background text-muted">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border bg-card px-4 py-4">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted [animation-delay:300ms]" />
      </div>
    </div>
  )
}
