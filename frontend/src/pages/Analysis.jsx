import { useEffect, useState } from "react"
import { BrainCircuit, LoaderCircle, RefreshCw } from "lucide-react"
import axiosInstance from '../lib/axiosInstance'

const Analysis = () => {
     const [resumes, setResumes] = useState([])
  const [jobs, setJobs] = useState([])
  const [resumeId, setResumeId] = useState("")
  const [jobId, setJobId] = useState("")
  const [analysis, setAnalysis] = useState(null)

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")
      useEffect(() => {
    async function loadOptions() {
      try {
        const [resumeResponse, jobResponse] = await Promise.all([
          axiosInstance.get("resumes/list/"),
          axiosInstance.get("jobs/list/"),
        ])
          
        const resumeData = resumeResponse.data
        const jobData = jobResponse.data

        setResumes(
          Array.isArray(resumeData)
            ? resumeData
            : resumeData.results ?? []
        )

        setJobs(
          Array.isArray(jobData)
            ? jobData
            : jobData.results ?? []
        )
      } catch {
        setError("Could not load your resumes and job descriptions.")
      } finally {
        setLoading(false)
      }
    }

    loadOptions()
      }, [])
    
    async function handleAnalyze(event) {
    event.preventDefault()
    setError("")
    setAnalysis(null)
    setSubmitting(true)

    try {
      const response = await axiosInstance.post("analyze/analyze/", {
        resume_id: resumeId,
        job_id: jobId,
      })
        
        console.log("ANALYSIS POST RESPONSE:", response.data)
      setAnalysis(response.data)
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Could not start the analysis."
      )
    } finally {
      setSubmitting(false)
    }
    }
    async function refreshAnalysis() {
    if (!analysis?.analysis_id && !analysis?.id) return

    try {
      const id = analysis.analysis_id ?? analysis.id
        const response = await axiosInstance.get(`analyze/${id}/`)
        console.log("Refreshed analysis:", response.data)
      setAnalysis(response.data)
      setError("")
    } catch(error) {
      console.error(err.response?.data || err.message)
    setError("Could not refresh analysis status.")
    }
  }

  const status = String(analysis?.status ?? "").toLowerCase()

  // Automatically check while Celery is processing.
  useEffect(() => {
  const id = analysis?.analysis_id ?? analysis?.id

  // Stop checking if there is no ID or analysis is finished
  if (!id || ["completed", "failed"].includes(status)) {
    return
  }

  const timer = setInterval(async () => {
    try {
      const response = await axiosInstance.get(`analyze/${id}/`)

      console.log("Updated analysis:", response.data)
      console.log("ANALYSIS POST RESPONSE:", response.data)
      setAnalysis(response.data)
      setError("")
    } catch (err) {
      console.error("Polling error:", err.response?.data || err.message)
    }
  }, 3000)

  return () => clearInterval(timer)

}, [analysis?.analysis_id, analysis?.id, status])

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-6 text-slate-500">
        <LoaderCircle className="animate-spin" />
        Loading your data...
      </div>
    )
  }

    
  return (
    <div>
      <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Resume Analysis
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Compare a saved resume against a job description.
        </p>
      </div>

      <form
        onSubmit={handleAnalyze}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Select resume
          </label>

          <select
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500"
          >
            <option value="">Choose a resume</option>

            {resumes.map((resume) => (
              <option
                key={resume.id}
                value={resume.id}
                disabled={
                  resume.status &&
                  !["completed", "ready"].includes(
                    resume.status.toLowerCase()
                  )
                }
              >
                {resume.title ||
                  resume.original_filename ||
                  `Resume ${resume.id}`}
                {resume.status ? ` — ${resume.status} `: ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Select job description
          </label>

          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-violet-500"
          >
            <option value="">Choose a job description</option>

            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        {resumes.length === 0 && (
          <p className="text-sm text-amber-700">
            Upload a resume before starting an analysis.
          </p>
        )}

        {jobs.length === 0 && (
          <p className="text-sm text-amber-700">
            Save a job description before starting an analysis.
          </p>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={
            submitting ||
            !resumeId ||
            !jobId ||
            resumes.length === 0 ||
            jobs.length === 0
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <BrainCircuit size={20} />
          )}

          {submitting ? "Starting analysis..." : "Analyze Resume"}
        </button>
      </form>

      {analysis && (
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Analysis Status
            </h2>

            <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium capitalize text-violet-700">
              {analysis.status ?? "Submitted"}
            </span>
          </div>

          <p className="text-sm text-slate-500">
            Analysis ID: {analysis.analysis_id ?? analysis.id ?? "—"}
          </p>

          {!["completed", "failed"].includes(status) && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <LoaderCircle size={18} className="animate-spin" />
              Your analysis is being processed. This page will check for updates.
            </div>
          )}

          {status === "failed" && (
            <p className="text-sm text-red-600">
              Analysis failed. Check your backend task logs before retrying.
            </p>
          )}

          <button
            type="button"
            onClick={refreshAnalysis}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw size={16} />
            Refresh status
          </button>

          {status === "completed" && (
            <div className="space-y-4 border-t border-slate-200 pt-4">
              <h3 className="font-semibold text-slate-900">
                Analysis Results
              </h3>

              {analysis.results ? (
                <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                  {JSON.stringify(analysis.results, null, 2)}
                </pre>
              ) : (
                <p className="text-sm text-slate-500">
                  Analysis completed. Connect your serializer's score,
                  strengths, weaknesses, and recommendations fields here.
                </p>
              )}
            </div>
          )}
        </section>
      )}
    </div>
    </div>
  )
}

export default Analysis
