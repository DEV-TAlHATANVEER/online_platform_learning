'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import HyperGraphql from '../_utils/HyperGraphql'
import WelcomeBanner from './_component/WelcomeBanner'
import DashboardStats from './_component/DashboardStats'
import EnrolledCourseCard from './_component/EnrolledCourseCard'
import RecentActivity from './_component/RecentActivity'
import { BookOpen, Sparkles, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

function Dashboard() {
  const { user, isLoaded } = useUser()
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  console.log(user)
  useEffect(() => {
    if (isLoaded && user) {
      loadEnrolledCourses()
    }
  }, [isLoaded, user])

  const loadEnrolledCourses = async () => {
    try {
      const courses = await HyperGraphql.getUserEnrolledCoursesWithDetails(
        user.primaryEmailAddress.emailAddress
      )
      setEnrolledCourses(courses)
    } catch (error) {
      console.error('Error loading enrolled courses:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate stats
  const stats = {
    enrolled: enrolledCourses.length,
    completed: 0,
    totalChapters: enrolledCourses.reduce((acc, course) => {
      return acc + (course.courseList?.chapter?.length || 0)
    }, 0),
    learningTime: Math.floor(enrolledCourses.reduce((acc, course) => {
      return acc + ((course.courseList?.chapter?.length || 0) * 0.25)
    }, 0))
  }

  // Show loading only if Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeBanner />
        <DashboardStats
          enrolledCount={stats.enrolled}
          completedCount={stats.completed}
          totalChapters={stats.totalChapters}
          totalLearningTime={stats.learningTime}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Continue Learning
              </h2>
              <Link
                href="/course"
                className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group"
              >
                <span>Browse Courses</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolledCourses.map((course) => (
                  <EnrolledCourseCard
                    key={course.id}
                    course={course}
                    progress={Math.floor(Math.random() * 100)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-lg border-2 border-dashed border-gray-200">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Courses Yet
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Start your learning journey today! Explore our courses and enroll in something that interests you.
                </p>
                <Link
                  href="/course"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
