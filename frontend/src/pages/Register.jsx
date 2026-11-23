
import { useState } from "react";
import { Link , useNavigate } from "react-router";
import { Eye, EyeOff, FileText, ArrowLeft, LoaderCircle } from "lucide-react"
import axios from 'axios'

export default function Register() {
  // Store form input values
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const[loading,setloading]=useState("")
    const navigate=useNavigate()
  // Control password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Handle form submission
const handleRegistration = async  (e) => {
    e.preventDefault();
    setloading(true)

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      email: email,
     full_name: fullname,
    password: password,
      confirm_password:confirmPassword,
    }
    try {
          const response = await axios.post('http://127.0.0.1:8000/api/users/register/', userData)
        //   localStorage.setItem('accessToken', response.data.access)
        //   localStorage.setItem('refreshToken', response.data.refresh)
        console.log("response data=>", response.data)
          console.log('Register successful successful')
          navigate('/dashboard')
      } catch (error) {
          console.error("Regestration Error", error)
    } finally {
        setloading(false)
      }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-10">
      <div className="w-full max-w-md">

        {/* Back to home */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Registration card */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">

          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <FileText className="h-5 w-5" />
            </div>

            <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-muted">
              Start turning your resume into your next opportunity.
            </p>
          </div>

          {/* Registration form */}
          <form onSubmit={handleRegistration} className="space-y-4">

            {/* Full name */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Full name
              </span>

              <input
                type="text"
                placeholder="Alex Morgan"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary"
              />
            </label>

            {/* Email */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Email address
              </span>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary"
              />
            </label>

            {/* Password */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Password
              </span>

              <span className="relative block">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border bg-card px-4 py-3 pr-11 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </span>
            </label>

            {/* Confirm password */}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">
                Confirm password
              </span>

              <span className="relative block">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border bg-card px-4 py-3 pr-11 text-sm outline-none transition placeholder:text-muted/70 focus:border-primary"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </span>
            </label>

                      {/* Submit button */}
            
            <button
              type="submit"
             disabled={loading}
             className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
          {loading && (<LoaderCircle className="h-4 w-4 animate-spin" />)}

              {loading ? "Creating account..." : "Create account"}
</button>
            {/* Login link */}
            <p className="text-center text-sm text-muted">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline"
              >
                Log in
              </Link>
            </p>

          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted">
          ResumeIQ · Resume intelligence for your next opportunity
        </p>

      </div>
    </div>
  );
}
