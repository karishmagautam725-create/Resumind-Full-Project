// import { useState } from 'react'

// import './App.css'
// import WelcomeBanner from './/components/WelcomeBanner'

import ChatInput from './components/ChatInput'
import ChatMessage from './components/ChatMessage'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import TopBar from './components/TopBar'
import UploadResume from './pages/UploadResume'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import AskAi from './pages/AskAi'
import {BrowserRouter , Routes, Route} from "react-router"
import DashboardPage from './pages/DashboardPage'
import MyResumes from './pages/MyResumes'
import JobDescriptions from './pages/JobDescriptions'
import Analysis from './pages/Analysis'

function App() {
    // const [sidebarOpen, setSidebarOpen] = useState(true)
    // const [activePage, setActivePage] = useState("Dashboard")

  return (
    <>
     <div>
              {/* <Sidebar open={sidebarOpen} activePage={activePage} onNavigate={setActivePage}
              onClose={()=> setSidebarOpen(false)} / > */}
              {/* <TopBar /> */}
              {/* <StatCard /> */}
              <BrowserRouter >
                  <Routes>
                      <Route path='/' element={<Landing />} />
                      <Route path='/register' element={<Register />} />
                      <Route path='/login' element={<Login />} />
                      <Route path='/dashboard' element={<DashboardPage />} />
                      <Route path="/resumes" element={<MyResumes />} />
                      <Route path="/jobs" element={<JobDescriptions />} />
                      <Route path='/upload' element={<UploadResume />} />
                      <Route path="/ask-ai" element={<Analysis />} />
                 </Routes>
                </BrowserRouter>
              {/* <Login /> */}
              {/* <Register /> */}
              {/* <ChatMessage /> */}
              {/* <UploadResume /> */}
              {/* <Analysis /> */}
              {/* <Sidebar /> */}
      {/* <WelcomeBanner /> */}
    </div>
 
    </>
  )
}

export default App
