
import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router"
import {
  LayoutDashboard,
  FileText,
  Upload,
  Sparkles,
  User,
  LogOut,
  FileSearch,
  X,
} from "lucide-react"

import { cn } from "../lib/cn"


const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "My Resumes", icon: FileText, path: "/resumes" },
  { label: "Job Description", icon: FileText, path: "/jobs" },
  { label: "Upload Resume", icon: Upload, path: "/upload" },
  { label: "Ask AI", icon: Sparkles, path: "/ask-ai" },
  { label: "Profile", icon: User, path: "/profile" },
]

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  // Close the mobile sidebar when the user presses Escape.
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose?.()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open, onClose])

  // Close the logout dialog when the user presses Escape.
  useEffect(() => {
    if (!showLogoutDialog) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loggingOut) {
        setShowLogoutDialog(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showLogoutDialog, loggingOut])

  // Navigate to the selected page.
  const handleNavigate = (path) => {
    navigate(path)
    onClose?.()
  }

  // Log out and clear locally stored tokens.
  const handleLogout = async () => {
    if (loggingOut) return

    setLoggingOut(true)


    
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")

      // Also remove these if your app previously used these key names.
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")

      setLoggingOut(false)
      setShowLogoutDialog(false)

      navigate("/login", { replace: true })
    
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-foreground/50 backdrop-blur-sm transition-opacity lg:hidden",
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar px-5 py-6 text-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleNavigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <FileSearch className="h-5 w-5" />
            </span>

            <span className="font-display text-lg font-bold tracking-tight">
              ResumeIQ
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-sidebar-muted hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="mt-9 flex flex-1 flex-col gap-1" aria-label="Main">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
            Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon

            const isActive =
              location.pathname === item.path ||
              (item.path === "/resumes" &&
                location.pathname.startsWith("/resumes/"))

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.path)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-sidebar-muted hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Upgrade card */}
        <div className="mt-6 rounded-2xl bg-white/5 p-4">
          <p className="font-display text-sm font-semibold">
            Upgrade to Pro
          </p>

          <p className="mt-1 text-xs leading-relaxed text-sidebar-muted">
            Unlimited analyses and AI rewrites for every resume.
          </p>

          <button
            type="button"
            className="mt-3 w-full rounded-lg bg-white py-2 text-xs font-semibold text-sidebar transition hover:bg-white/90"
          >
            Upgrade
          </button>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={() => setShowLogoutDialog(true)}
          className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-muted transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </aside>

      {/* Logout confirmation dialog */}
      {showLogoutDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !loggingOut
            ) {
              setShowLogoutDialog(false)
            }
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-sidebar p-6 text-white shadow-2xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <LogOut className="h-6 w-6" />
            </div>

            <h2
              id="logout-title"
              className="font-display text-lg font-bold"
            >
              Are you sure you want to logout?
            </h2>

            <p
              id="logout-description"
              className="mt-2 text-sm leading-relaxed text-sidebar-muted"
            >
              You will be signed out of your account and need to log
              in again to access your resumes and AI analyses.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={loggingOut}
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loggingOut}
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loggingOut ? "Logging out..." : "Yes, logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar




