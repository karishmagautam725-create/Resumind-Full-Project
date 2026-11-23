import { ArrowRight, BarChart3, CheckCircle2, FileSearch, FileText, ShieldCheck, Sparkles, Upload, Zap } from "lucide-react"
import { Link} from "react-router"
const features = [
  { icon: FileSearch, title: "ATS-ready insights", text: "See exactly how applicant tracking systems read your resume and where you can improve." },
  { icon: BarChart3, title: "Actionable scoring", text: "Get a clear score across impact, keywords, formatting, and role alignment." },
  { icon: Sparkles, title: "AI recommendations", text: "Turn feedback into stronger bullet points with focused, practical suggestions." },
]

const steps = [
  { number: "01", icon: Upload, title: "Upload your resume", text: "Add your current resume in a few seconds." },
  { number: "02", icon: FileSearch, title: "Review your analysis", text: "Understand your strengths and missed opportunities." },
  { number: "03", icon: CheckCircle2, title: "Apply with confidence", text: "Make targeted edits and send a stronger application." },
]

const Landing = () => {
   
  return (
      <div className="min-h-screen bg-background text-foreground">
          <header className="border-b bg-card/80 backdrop-blur">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
                  <Link  to="/" className="flex items-center gap-2.5 text-left">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><FileText className="h-5 w-5" />
                          
                      </span>
                       <span className="font-display text-lg font-bold tracking-tight">Resumind</span>
                  </Link>
                  <nav>
                      <Link to="/login" className="rounded-xl px-3.5 py-2 text-sm font-semibold text-muted transition hover:bg-background hover:text-foreground">Log in</Link>
                     <Link to="/register" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">Get started</Link>
                  </nav>
              </div>
          </header>
          <main>
              <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-2 text-xs font-semibold text-primary"><Sparkles className="h-3.5 w-3.5" /> Smarter resumes. Better opportunities.</div>
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">Your resume should open doors, not close them.</h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted md:text-lg">ResumeIQ helps you understand what recruiters and ATS systems see, then gives you the focused insights to make every application stronger.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/register"  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90">Analyze my resume <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/login"   className="rounded-xl border bg-card px-5 py-3.5 text-sm font-semibold text-foreground transition hover:bg-background">I already have an account</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted"><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" /> Private by design</span><span className="inline-flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" /> Results in seconds</span></div>
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-semibold">Resume overview</p><p className="mt-1 text-xs text-muted">Product Designer Resume.pdf</p></div><span className="rounded-lg bg-success/10 px-2.5 py-1.5 text-xs font-bold text-success">Strong match</span></div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-5 rounded-xl bg-background p-5"><div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-primary/15 border-t-primary border-r-primary"><span className="font-display text-2xl font-bold">86</span></div><div><p className="text-sm font-semibold">ATS compatibility score</p><p className="mt-1 text-xs leading-5 text-muted">Your resume is in great shape. A few targeted edits can make it even more competitive.</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-border"><div className="h-full w-[86%] rounded-full bg-primary" /></div></div></div>
            <div className="mt-4 grid grid-cols-3 gap-3"><div className="rounded-xl border p-3"><p className="text-xs text-muted">Keywords</p><p className="mt-1 text-lg font-bold">92%</p></div><div className="rounded-xl border p-3"><p className="text-xs text-muted">Impact</p><p className="mt-1 text-lg font-bold">84%</p></div><div className="rounded-xl border p-3"><p className="text-xs text-muted">Format</p><p className="mt-1 text-lg font-bold">88%</p></div></div>
          </div>
              </section>
              <section className="border-y bg-card">
                  <div className="mx-auto max-w-7xl px-5 py-16 md:px-8"><div className="max-w-xl">
                      <p className="text-sm font-bold uppercase tracking-widest text-primary">Built for your next move</p>
                      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">Everything you need to make your resume work harder.</h2>
                  </div>
                      <div className="mt-10 grid gap-5 md:grid-cols-3">{features.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border bg-background p-6">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></span>
                          <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
                          <p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}</div></div></section>
              
              <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20"><div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-primary">Simple by design</p>
                  <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">From upload to application-ready.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{steps.map(({ number, icon: Icon, title, text }) => <div key={number} className="relative rounded-2xl border bg-card p-6">
                      <div className="flex items-center justify-between"><span className="font-display text-3xl font-bold text-primary/20">{number}</span><Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mt-6 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
                  </div>
              </section>
              
              <section className="mx-5 mb-10 rounded-2xl bg-sidebar px-6 py-12 text-center text-white md:mx-auto md:max-w-7xl md:px-8"><h2 className="font-display text-3xl font-bold tracking-tight">Ready to build a stronger first impression?</h2>
                  <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-sidebar-muted">Get a clear view of what is working, what is missing, and what to improve next.</p>
                  <Link to="/register"   className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition hover:opacity-90">Start analyzing for free <ArrowRight className="h-4 w-4" />
                  </Link>
              </section>
                    
          </main>
      
    </div>
  )
}

export default Landing
