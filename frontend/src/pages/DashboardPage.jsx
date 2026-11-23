// import React from 'react'
// import ChatInput from './components/ChatInput'
// import ChatMessage from './components/ChatMessage'
// import Sidebar from './components/Sidebar'
// import StatCard from './components/StatCard'
// import TopBar from './components/TopBar'


import { useState } from "react"

import Sidebar from "../components/Sidebar"
import TopBar from "../components/TopBar"
import WelcomeBanner from "../components/WelcomeBanner"
import StatsGrid from "../components/StatsGrid"
import RecentResumes from "../components/RecentResumes"
import Recommendations from "../components/Recommendations"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 px-4 py-6 md:px-8 md:py-8">
          <WelcomeBanner />
          <StatsGrid />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
            <div className="xl:col-span-3">
              <RecentResumes />
            </div>

            <div className="xl:col-span-2">
              <Recommendations />
            </div>
                  </div>
                    {/* <Outlet /> */}
        </main>
      </div>
    </div>
  )
}



//  const accessToken=localStorage.getItem('accessToken')
//     useEffect(() => {
//         const fetchProtectedData = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/dashboard/', {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`
//                     }
//                 })
//                 console.log('Success')
//             } catch (error) {
//                 console.error('Error Fetching data',error)
//             }
//         }
//         fetchProtectedData();
//     },[])
