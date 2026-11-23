import { ArrowUp } from "lucide-react"

export default function ChatInput({ value, onChange, onSend, disabled = false }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) {
      event.preventDefault()
      onSend()
    }
  }

  return (
    <div className="flex items-end gap-3 rounded-2xl border bg-card p-2 shadow-sm focus-within:border-primary">
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about this resume..."
        rows={1}
        disabled={disabled}
        aria-label="Ask a question"
        className="max-h-32 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted disabled:cursor-not-allowed"
      />
      <button
        type="button"
        onClick={onSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}
