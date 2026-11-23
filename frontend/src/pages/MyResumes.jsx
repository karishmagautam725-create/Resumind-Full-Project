import React from 'react'
import { useEffect, useMemo, useState } from "react"
import { Filter, Search, Upload } from "lucide-react"
import { useNavigate } from "react-router"
import axiosInstance from '../lib/axiosInstance'
import ResumeCard from '../components/ResumeCard'

const statusOptions = [
  "All statuses",
  "Analyzed",
  "Needs Review",
  "Analyzing",
]

function getResumeStatus(status) {
  switch (status?.toLowerCase()) {
    case "completed":
    case "analyzed":
      return "Analyzed"

    case "failed":
    case "needs review":
      return "Needs Review"

    case "processing":
    case "pending":
    case "analyzing":
      return "Analyzing"

    default:
      return "Needs Review"
  }
}

function formatDate(date) {
  if (!date) return ""

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}



const MyResumes = () => {
    const navigate = useNavigate()

  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All statuses")
  const [resumes, setResumes] = useState([])

  const [loading, setLoading] = useState(true)
//   const [uploading, setUploading] = useState(false)
    const [error, setError] = useState("")
    const fetchResumes = async () => {
        try {
            setError("")
            const response = await axiosInstance.get('resumes/list/')
            const data = response.data.results ?? response.data
            setResumes(data.map((resume) => ({
                ...resume,
                name:
                    resume.original_filename ||
                    resume.title ||
                    "Untitled Resume",
                uploaded: formatDate(resume.created_at),
                status: getResumeStatus(resume.status),
                score: resume.ats_score ?? null,
            })))
        }catch (err) {
      console.error("Resume fetching error:", err)

      setError(
        err.response?.data?.detail ||
        "Unable to load your resumes. Please try again."
      )
    } finally {
      setLoading(false)
    }
    }
     useEffect(() => {
    fetchResumes()
  }, [])
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`resumes/${id}/`)
            setResumes((current) => current.filter((resume) => resume.id !== id))
        } catch (err) {
             console.error("Delete failed:", err)

      setError(
        err.response?.data?.detail ||
        "Unable to delete resume.")
        }
    }
    const filteredResumes = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        return resumes.filter((resume) => {
            const matchesQuery = !normalizedQuery || `$ {resume.name} ${resume.title || ""}`.toLocaleLowerCase().includes(normalizedQuery)
            const matchedStatus = status === "All statuses" || resume.status === status
            return matchesQuery && matchedStatus
        })

      }, [query, resumes, status])
  return (
    <div>
       <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 md:px-8 md:py-8">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            My Resumes
          </h1>

          <p className="mt-1 text-sm text-muted">
            Manage and review your uploaded resumes.
          </p>
        </div>

        <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
          <Upload className="h-4 w-4" />

          {/* {uploading ? "Uploading..." : "Upload Resume"}

          <input
            type="file"
            accept=".pdf,.docx"
            className="sr-only"
            onChange={handleUpload}
            disabled={uploading}
          /> */}
        </label>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Search and filter */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 sm:flex-row">

        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search resumes or roles…"
            aria-label="Search resumes or roles"
            className="w-full rounded-xl border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:bg-card"
          />
        </div>

        <div className="relative sm:w-52">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Filter by status"
            className="w-full appearance-none rounded-xl border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:bg-card"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-16 text-center text-sm text-muted">
          Loading your resumes...
        </div>
      ) : filteredResumes.length > 0 ? (

        /* Resume cards */
        <section
          aria-label="Resume list"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredResumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              name={resume.name}
              uploaded={resume.uploaded}
              atsScore={resume.score}
              status={resume.status}
              onView={() =>
                navigate("/analysis", {
                  state: { resumeId: resume.id },
                })
              }
              onDelete={() => handleDelete(resume.id)}
            />
          ))}
        </section>

      ) : (

        /* Empty state */
        <div className="rounded-2xl border bg-card px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Search className="h-5 w-5" />
          </div>

          <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
            No resumes found
          </h2>

          <p className="mt-1 text-sm text-muted">
            Try adjusting your search or status filter.
          </p>
        </div>
      )}
    </main>
    </div>
  )
}

export default MyResumes
