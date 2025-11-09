'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import HyperGraphql from '@/app/(router)/_utils/HyperGraphql'
import VideoPlayer from './_component/VideoPlayer'
import CourseProgress from './_component/CourseProgress'
import ChapterNavigation from './_component/ChapterNavigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

function WatchCourse() {
  const params = useParams()
  const { user, isLoaded } = useUser()
  const [course, setCourse] = useState(null)
  const [enrollment, setEnrollment] = useState(null)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && user && params?.enrollId) {
      loadCourseData()
    }
  }, [isLoaded, user, params])

  const loadCourseData = async () => {
    try {
      // enrollId is actually the courseSlug
      const courseSlug = params.enrollId
      
      const [courseResp, enrollmentResp] = await Promise.all([
        HyperGraphql.getallcoursevideousingslug(courseSlug),
        HyperGraphql.checkUserEnrollment(
          user.primaryEmailAddress.emailAddress,
          courseSlug
        )
      ])

      if (!enrollmentResp) {
        window.location.href = `/course-preview/${courseSlug}`
        return
      }

      setCourse(courseResp.courseList)
      setEnrollment(enrollmentResp)
    } catch (error) {
      console.error('Error loading course:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChapterChange = (index) => {
    setCurrentChapter(index)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 bg-gray-300 rounded w-48 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-96 bg-gray-300 rounded-xl animate-pulse"></div>
              <div className="h-24 bg-gray-300 rounded-xl animate-pulse"></div>
            </div>
            <div className="h-screen bg-gray-300 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <Link 
          href={`/course-preview/${params.enrollId}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Course</span>
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section */}
          <div className="lg:col-span-2 space-y-4">
            <VideoPlayer 
              chapter={course?.chapter?.[currentChapter]}
              courseName={course?.name}
            />
            <CourseProgress 
              course={course}
              currentChapter={currentChapter}
              totalChapters={course?.chapter?.length || 0}
            />
          </div>

          {/* Chapter Navigation */}
          <div className="lg:col-span-1">
            <ChapterNavigation
              chapters={course?.chapter || []}
              currentChapter={currentChapter}
              onChapterChange={handleChapterChange}
              enrollment={enrollment}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WatchCourse
