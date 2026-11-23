import { useRef, useState } from "react"
import { CheckCircle2, CloudUpload, FileText, Loader2, Trash2, Upload, X } from "lucide-react"
import axiosInstance from '../lib/axiosInstance'
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
const UPLOAD_URL = "/api/resumes/upload/"

function isAcceptedFile(file) {
  return ACCEPTED_TYPES.includes(file.type) || /\.(pdf|docx)$/i.test(file.name)
}

export default function UploadResume() {
  const inputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

    const validateFile = (file) => {
        setError("")
        setStatus("idle")
        if (!isAcceptedFile(file)) {
            selectedFile(null)
            setError("Please choose a PDF or DOCX file.")
            return
        }
        if (file.size > MAX_FILE_SIZE) {
               setSelectedFile(null)
                setError("That file is larger than the 5 MB limit.")
               return
        }
        setSelectedFile(file)
    }
    const handleFileChange = (event) => {
        const file = event.target.files?.[0]
        if (file) validateFile(file)
        
        event.target.value=""
    }
    const handleDrop = (event) => {
        event.preventDefault()
        setIsDragging(false)
        const file = event.dataTransfer.files?.[0]
        if (file) validateFile(file)
    }
    const handleRemove = () => {
setSelectedFile(null)
setError("")
setStatus("idle")
    }   
    const handleUpload =async ()=>{
        if (!selectedFile || status === "loading") return 
        setStatus("loading")                    
        setError("")         
        try {
            const formData = new FormData()
            formData.append("file", selectedFile)
            formData.append(
  "title",
  selectedFile.name.replace(/\.[^/.]+$/, "")
)
            const response = await axiosInstance.post("resumes/upload/", formData)
            console.log("Upload successful:", response.data)
            setStatus("success")
        } catch (err) { 
            const data = err.response?.data
            const message =
    data?.detail ||
    data?.file?.[0] ||
    data?.message ||
    "Upload failed. Please try again."
    setError(
    typeof message === "string"
      ? message
      : "Please check your file and try again."
    )
            console.log(err.response?.data)

            setStatus("idle")
            
        }
        
    }
return (
<main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 md:px-8 md:py-8">
<div className="mb-8">
<p className="mb-2 text-sm font-semibold text-primary">
Resume workspace
</p>

    <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
      Upload a resume
    </h1>

    <p className="mt-2 max-w-xl text-sm leading-6 text-muted md:text-base">
      Upload your resume to receive an ATS-friendly analysis and personalized recommendations.
    </p>
  </div>

  <section
    className="rounded-[var(--radius)] border border-border bg-card p-5 shadow-sm md:p-8"
    aria-labelledby="upload-heading"
  >
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-primary">
        <Upload className="h-5 w-5" aria-hidden="true" />
      </div>

      <div>
        <h2
          id="upload-heading"
          className="font-display text-lg font-semibold text-foreground"
        >
          Add your resume
        </h2>

        <p className="mt-1 text-sm text-muted">
          Choose a recent version for the most accurate analysis.
        </p>
      </div>
    </div>

    <div
      className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors md:p-12 ${
        isDragging
          ? "border-primary bg-indigo-50"
          : "border-border bg-background/60 hover:border-primary/50"
      }`}
      onDragOver={(event) => {
        event.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <CloudUpload
        className="mx-auto h-10 w-10 text-primary"
        aria-hidden="true"
      />

      <h3 className="mt-4 text-base font-semibold text-foreground">
        Drag and drop your resume here
      </h3>

      <p className="mt-2 text-sm text-muted">
        or choose a file from your device
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Choose file
      </button>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        className="sr-only"
      />

      <p className="mt-4 text-xs text-muted">
        Accepted formats: PDF, DOCX · Maximum file size: 5 MB
      </p>
    </div>

    {error && (
      <div
        role="alert"
        className="mt-4 flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-danger"
      >
        <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{error}</span>
      </div>
    )}

    {selectedFile && (
      <div className="mt-5 flex flex-col gap-4 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-primary">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {selectedFile.name}
            </p>

            <p className="mt-1 text-xs text-muted">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
        </div>

        {status !== "loading" && status !== "success" && (
          <button
            type="button"
            onClick={handleRemove}
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-muted transition hover:text-danger sm:self-auto"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Remove
          </button>
        )}
      </div>
    )}

    {status === "success" && (
      <div
        role="status"
        className="mt-5 flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-success"
      >
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0"
          aria-hidden="true"
        />

        <div>
          <p className="font-semibold">
            Resume uploaded successfully.
          </p>

          <p className="mt-1 text-xs">
            Your resume is being processed for analysis.
          </p>
        </div>
      </div>
    )}

    <div className="mt-6 flex justify-end">
      <button
        type="button"
        onClick={handleUpload}
        disabled={
          !selectedFile ||
          status === "loading" ||
          status === "success"
        }
        className="inline-flex min-w-32 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            Uploading...
          </>
        ) : status === "success" ? (
          "Uploaded"
        ) : (
          "Upload resume"
        )}
      </button>
    </div>
  </section>
</main>

)
}
