import { FileText, Gauge, ScanSearch, Target, ArrowUpRight, Minus } from "lucide-react"
import { cn } from "../lib/cn.js"

const iconMap = { FileText, Gauge, ScanSearch, Target }

const tintMap = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
}

export default function StatCard({ icon, tint = "primary", trend, delta, label, value, suffix }) {
  const Icon = iconMap[icon]

  return (
    <article className="rounded-2xl border bg-card p-5">
      <div className="flex items-start justify-between">
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", tintMap[tint])}>
          {Icon && <Icon className="h-5 w-5" />}
        </span>
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              trend === "up" ? "bg-success/10 text-success" : "bg-background text-muted",
            )}
          >
            {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm font-medium text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold tracking-tight text-foreground">
        {value}
        {suffix && <span className="text-lg font-semibold text-muted">{suffix}</span>}
      </p>
    </article>
  )
}

