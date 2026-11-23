import React from 'react'
import { Menu, Search, Bell } from "lucide-react"

const TopBar = ({ onMenuClick }) => {
  return (
    <div>
    <header className='sticky top-0 z-20 flex items-center gap-4 border-b bg-card/80 px-4 py-3.5 backdrop-blur md:px-8'>
              <button type="button" onClick={onMenuClick} className="rounded-lg p-2 text-muted hover:bg-background lg:hidden" aria-label="Open navigation">
             <Menu className="h-5 w-5" />
              </button>
               <div className="relative hidden max-w-md flex-1 sm:block">
        <label htmlFor="global-search" className="sr-only">
          Search resumes, roles, and keywords
        </label>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          id="global-search"
          type="search"
          placeholder="Search resumes, roles, keywords…"
          className="w-full rounded-xl border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/15"
        />
              </div>
              <div className="ml-auto flex items-center gap-2 md:gap-4">
        <button
          type="button"
          className="relative rounded-xl border bg-card p-2.5 text-muted transition hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-danger ring-2 ring-card" aria-label="Unread notifications" />
        </button>

        <div className="flex items-center gap-3 rounded-xl border bg-card py-1.5 pl-1.5 pr-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
            KG
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold leading-tight text-foreground">Karishma Gautam</span>
            <span className="block text-xs leading-tight text-muted">Backend Developer</span>
          </span>
        </div>
      </div>
    </header>
    </div>
  )
}

export default TopBar
