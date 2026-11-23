import React from 'react'
import { FileText, Loader2, Eye, Trash2, ArrowLeftCircleIcon } from "lucide-react"
import { cn } from "../lib/cn.js"

function scoreColor(score) {
     if (score >= 85) return "text-success"
  if (score >= 70) return "text-primary"
  return "text-warning"
}
function statusStyle(status) {
    switch (status) {
        case "Analyzed":
            return "bg-success/10 text-success"
        case "Needs Review":
          return "bg-warning/10 text-warning"
         default:
           return "bg-accent/10 text-accent"
    }
        
}
function ScoreRing({ score }) {
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative h-12 w-12 shrink-0">
      <svg className="h-12 w-12 -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="4"
        />

        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={scoreColor(score)}
        />
      </svg>

      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-xs font-bold",
          scoreColor(score)
        )}
      >
        {score}
      </span>
    </div>
  )
}


const ResumeCard = ({name,
  uploaded,
  atsScore,
  status = "Analyzing",
  onView,
    onDelete, }) => {
    const isAnalyzing = status === "Analyzing"
  const hasScore =
    typeof atsScore === "number" &&
    Number.isFinite(atsScore) &&
    atsScore >= 0 &&
    atsScore <= 100
  return (
      <article className="flex flex-col gap-4 rounded-2xl border bg-card p-5 transition hover:bg-background">

      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {name}
          </p>

          {uploaded && (
            <p className="text-xs text-muted">
              Uploaded {uploaded}
            </p>
          )}
        </div>

        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            statusStyle(status)
          )}
        >
          {isAnalyzing && (
            <Loader2 className="h-3 w-3 animate-spin" />
          )}

          {status}
        </span>
      </div>

      <div className="flex items-center gap-6 border-t pt-4">

        <div className="flex items-center gap-3">
          {isAnalyzing ? (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center text-muted">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : hasScore ? (
            <ScoreRing score={atsScore} />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center text-muted">
              <FileText className="h-5 w-5" />
            </div>
          )}

          <div>
            <p className="text-xs text-muted">ATS Score</p>
            <p className="text-sm font-semibold text-foreground">
              {isAnalyzing
                ? "—"
                : hasScore
                  ? `${atsScore}/100`
                  : "Not available"}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 border-t pt-4">
        <button
          type="button"
          onClick={onView}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-background"
        >
          <Eye className="h-4 w-4" />
          View
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/5"
          aria-label={`Delete ${name}`}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

    </article>
  )
}

export default ResumeCard
