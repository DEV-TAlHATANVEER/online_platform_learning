'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import WelcomeBannerDashboard from './_components/WelcomeBannerDashboard'
import DashboardStats from './_components/DashboardStats'
import EnrolledCourseList from './_components/EnrolledCourseList'
import ProgressChart from './_components/ProgressChart'
import RecentActivity from './_components/RecentActivity'

function Dashboard() {
  const { user, isLoaded } = useUser()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && user) {
      // In a real app, you would fetch enrolled courses from your backend
      // For now, we'll use localStorage to simulate enrolled courses
      loadEnrolledCourses()
    }
  }, [isLoaded, user])

  const loadEnrolledCourses = () => {
    try {
      const stored = localStorage.getItem(`enrolledCourses_${user?.id}`)
      if (stored) {
        setEnrolledCourses(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading enrolled courses:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className='p-5 bg-gray-50 min-h-screen'>
      {/* Welcome Banner */}
      <WelcomeBannerDashboard user={user} />

      {/* Dashboard Stats */}
      <DashboardStats enrolledCourses={enrolledCourses} />

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5'>
        {/* Enrolled Courses - Takes 2 columns */}
        <div className='lg:col-span-2'>
          <EnrolledCourseList 
            enrolledCourses={enrolledCourses} 
            loading={loading}
            onUpdate={loadEnrolledCourses}
          />
        </div>

        {/* Sidebar with Progress and Activity */}
        <div className='space-y-5'>
          <ProgressChart enrolledCourses={enrolledCourses} />
          <RecentActivity enrolledCourses={enrolledCourses} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard