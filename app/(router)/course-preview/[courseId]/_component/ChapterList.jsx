'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import HyperGraphql from '@/app/(router)/_utils/HyperGraphql'
import { useUser } from '@clerk/nextjs'
import { Play, Lock, ArrowRight } from 'lucide-react'

function ChapterList() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const [chapters, setChapters] = useState([])
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(true)

  // Function to fetch data
  const fetchData = async () => {
    if (!params?.courseId) return

    try {
      const resp = await HyperGraphql.getallcoursevideousingslug(params.courseId)
      setChapters(resp.courseList?.chapter || [])

      if (isLoaded && user) {
        const enrollmentData = await HyperGraphql.checkUserEnrollment(
          user.primaryEmailAddress.emailAddress,
          params.courseId
        )
        setEnrollment(enrollmentData)
      }
    } catch (error) {
      console.error('Error fetching chapters:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [params, isLoaded, user])

  // Listen for enrollment events (custom events from EnrollmentButton)
  useEffect(() => {
    const handleEnrollmentUpdate = () => {
      console.log('📢 Enrollment event detected, refreshing chapter list...')
      fetchData()
    }

    window.addEventListener('enrollment-updated', handleEnrollmentUpdate)

    return () => {
      window.removeEventListener('enrollment-updated', handleEnrollmentUpdate)
    }
  }, [])

  // Also periodically check enrollment status if user is logged in but not enrolled
  useEffect(() => {
    if (isLoaded && user && !enrollment && !loading) {
      const interval = setInterval(() => {
        console.log('🔄 Periodic check for enrollment...')
        fetchData()
      }, 5000) // Check every 5 seconds

      return () => clearInterval(interval)
    }
  }, [isLoaded, user, enrollment, loading])

  const handleStartCourse = () => {
    if (enrollment) {
      router.push(`/watch-course/${params.courseId}`)
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Play className="w-5 h-5 text-blue-600" />
          Course Content ({chapters.length})
        </h2>
      </div>

      {/* Start Learning Button - Prominent if enrolled */}
      {enrollment && (
        <button
          onClick={handleStartCourse}
          className="w-full mb-4 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-base hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
        >
          <Play className="w-5 h-5 group-hover:animate-pulse" />
          <span>Start Learning Now</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      )}
      
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`
              p-4 rounded-lg border-2 transition-all duration-300
              ${enrollment 
                ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer' 
                : 'border-gray-200 bg-gray-50'
              }
            `}
            onClick={() => enrollment && handleStartCourse()}
          >
            <div className="flex items-start gap-3">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0
                ${enrollment 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                {enrollment ? (
                  <span>{chapter.chapterNumber || index + 1}</span>
                ) : (
                  <Lock className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`
                  font-semibold text-sm mb-1 line-clamp-2
                  ${enrollment ? 'text-gray-800' : 'text-gray-500'}
                `}>
                  {chapter.name}
                </h3>
                {chapter.shortDesc && (
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {chapter.shortDesc}
                  </p>
                )}
              </div>

              {enrollment && (
                <Play className="w-5 h-5 text-blue-600 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>

      {!enrollment && chapters.length > 0 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-yellow-700" />
            <h3 className="font-bold text-yellow-800">Course Locked</h3>
          </div>
          <p className="text-sm text-yellow-700">
            Enroll now to unlock all {chapters.length} chapters and start your learning journey!
          </p>
        </div>
      )}
    </div>
  )
}

export default ChapterList
