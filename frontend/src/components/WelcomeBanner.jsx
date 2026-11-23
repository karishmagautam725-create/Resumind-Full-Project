import React from 'react'
import { Upload, Sparkles } from "lucide-react"

const WelcomeBanner = () => {
  return (
    <div className='flex flex-col gap-5 rounded-2xl border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8'>
          <div>
              <p className='text-sm font-medium text-primary'>
                  Welcome Back
              </p>
              <h1 className='mt-1 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
                  Hi Karishma let's improve your resume
              </h1>
              <p className='mt-2 max-w-xl text-sm leading-relaxed text-muted'>
                   Upload a resume to get an instant ATS score, keyword analysis, and tailored
                   recommendations to help you land more interviews.
              </p>
          </div>
           <div className="flex flex-wrap items-center gap-3">
        <button 
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:brightness-110"
        >
          <Upload className="h-4 w-4" />
          Upload Resume
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-background"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          Analyze with AI
        </button>
      </div>
    </div>
  )
}

export default WelcomeBanner
