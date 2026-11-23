
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, FileText } from "lucide-react"
import { Link , useNavigate } from "react-router"
import axios from 'axios'
export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [emailaddress, setemailaddress] = useState("")
    const [password, setpassword] = useState("")
    const navigate=useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        const userData = {
           email: emailaddress,
        password: password,
        }
        try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', userData)
            localStorage.setItem('accessToken', response.data.access)
            localStorage.setItem('refreshToken', response.data.refresh)
            console.log('Login successful successful')
            navigate('/dashboard')
    } catch (error) {
        console.error("Regestration Error", error.response.data)
    }
    }
    
    
    return <AuthLayout title="Welcome back" subtitle="Sign in to continue improving your resume." >
        <form onSubmit={handleLogin} className="space-y-5">
            <label className="block">
                <span className="mb-2 block text-sm font-semibold">Email address</span>
                <input type="email" value={emailaddress} placeholder="you@example.com" onChange={(e)=> setemailaddress(e.target.value)} className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary" />
            </label>
            <label className="block">
                <span className="mb-2 block text-sm font-semibold">Password</span>
                <span className="relative block"><input type={showPassword ? "text" : "password"} value={password} placeholder="Enter your password" onChange={(e)=> setpassword(e.target.value)} className="w-full rounded-xl border bg-card px-4 py-3 pr-11 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></span></label>
            <div className="flex justify-end"><button type="button" className="text-xs font-semibold text-primary hover:underline">Forgot password?</button>
            </div>
            <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">Log in</button>
            <p className="text-center text-sm text-muted">Don't have an account? < Link to="/register" className="font-semibold text-primary hover:underline">Create one</Link></p>
        </form>
    </AuthLayout>
}

function AuthLayout({ title, subtitle, children }) {
    return <div className="flex min-h-screen items-center justify-center bg-background px-5 py-10"><div className="w-full max-w-md"><Link to ='/' className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to home</Link><div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"><div className="mb-8 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground"><FileText className="h-5 w-5" /></div><h1 className="mt-5 font-display text-2xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-sm text-muted">{subtitle}</p></div>{children}</div><p className="mt-6 text-center text-xs text-muted">Resumind · Resume intelligence for your next opportunity</p></div></div>
}