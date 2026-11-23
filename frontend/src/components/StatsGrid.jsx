import React, { useState } from 'react'
import { useEffect } from 'react'
// import { getDashboard } from '../lib/api'
import StatCard from '../components/StatCard'
import axiosInstance from '../lib/axiosInstance'

const StatsGrid = () => {
    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const response = await axiosInstance.get('dashboard/')
                console.log(response.data)
                setDashboard(response.data)
                
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }  
        loadDashboard()
    }, [])
     if (loading) return <p>Loading dashboard...</p>
  if (error) return <p>Could not load dashboard: {error}</p>
  if (!dashboard) return null
const stats = [
    {
        id: "total",
        trend: "up",
         delta: "+2 this month",
      label: "Total Resumes",
      value: dashboard.total_resumes,
      icon: "FileText",
      tint: "primary",
    },
    {
      id: "average-ats",
      label: "Average ATS Score",
        value: dashboard.average_ats_score,
      delta: "+6 pts",
    trend: "up",
      suffix: "/100",
      icon: "Gauge",
      tint: "success",
    },
    {
      id: "analyzed",
      label: "Analysis Reports",
        value: dashboard.total_analysis_report,
      delta: "3 pending",
    trend: "neutral",
      icon: "ScanSearch",
      tint: "accent",
    },
    {
      id: "highest-ats",
      label: "Highest ATS Score",
        value: dashboard.highest_ats_score,
       delta: "+8 new",
    trend: "up",
      suffix: "/100",
      icon: "Target",
      tint: "warning",
    },
  ]

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id}
          icon={stat.icon}
          tint={stat.tint}
          delta={stat.delta}
          trend={stat.trend}
          label={stat.label}
          value={stat.value}
          suffix={stat.suffix} />
      ))}
    </div>
    </div>
  )
}

export default StatsGrid
