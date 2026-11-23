import React, { useEffect, useState } from 'react'
import { BriefcaseBusiness, Plus, LoaderCircle } from "lucide-react"
import axiosInstance from '../lib/axiosInstance'

const JobDescriptions = () => {
    const [jobs, setJobs] = useState([])
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    async function loadJobs() {
        setLoading(true)
        setError("")
        try {
            const response = await axiosInstance.get("/jobs/list/")
            const data = response.data
            setJobs(Array.isArray(data)? data: data.results ?? [])
        } catch (error) {
             setError("Could not load job descriptions.")
        }  finally {
      setLoading(false)
    }
    }
    useEffect(() => {
      loadJobs()  
    },[])
    const handleSubmit = async (event) => {
          event.preventDefault()
    setSaving(true)
    setError("")
        setMessage("")
        try {
            const response = await axiosInstance.post('jobs/create/', {
                title:title,
                company_name:company,
                job_description:description
            })
            
             setTitle("")
      setCompany("")
      setDescription("")
      setMessage("Job description saved successfully.")
        await loadJobs()
        } catch (err) {
            setError(
        err.response?.data?.detail ||
        "Could not save the job description."
      )
        }finally {
      setSaving(false)
    }
    }
  return (
      <div className="mx-auto max-w-5xl space-y-6 p-6">
          <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Job Descriptions
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Save job descriptions and reuse them for different resumes.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Plus size={20} className="text-violet-600" />
          Add a job description
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job title"
            required
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
          />

          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name (optional)"
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
          />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          rows={7}
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-500"
        />

        {error && (
          <p role="alert" className="text-sm text-red-600">{error}</p>
        )}

        {message && (
          <p className="text-sm text-green-700">{message}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {saving && <LoaderCircle size={18} className="animate-spin" />}
          {saving ? "Saving..." : "Save Job Description"}
        </button>
      </form>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Saved job descriptions
        </h2>

        {loading && (
          <p className="text-sm text-slate-500">Loading jobs...</p>
        )}

        {!loading && jobs.length === 0 && !error && (
          <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
            No job descriptions saved yet.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <BriefcaseBusiness className="mb-3 text-violet-600" />

              <h3 className="font-semibold text-slate-900">
                {job.title}
              </h3>

              {job.company && (
                <p className="mt-1 text-sm text-slate-500">
                  {job.company}
                </p>
              )}

              <p className="mt-3 line-clamp-4 whitespace-pre-line text-sm text-slate-600">
                {job.description}
              </p>
            </article>
          ))}
        </div>
      </section>
      
    </div>
  )
}

export default JobDescriptions
