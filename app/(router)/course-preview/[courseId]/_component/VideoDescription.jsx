'use client'
import HyperGraphql from '@/app/(router)/_utils/HyperGraphql'
import React, { useEffect, useState } from 'react'
import VideoDisplay from './VideoDisplay'
import { useParams, useSearchParams } from 'next/navigation'
import EnrollmentButton from './EnrollmentButton'
import { BookOpen, User, Award, CheckCircle } from 'lucide-react'

function VideoDescription() {
  const params = useParams()
  const searchParams = useSearchParams()
  const [videoCoursedes, setvideoDes] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    const fetchCourse = async () => {
      if (!params?.courseId) return

      try {
        const resp = await HyperGraphql.getallcoursevideousingslug(params.courseId)
        setvideoDes(resp.courseList)
      } catch (error) {
        console.error('Error fetching course data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()

    // Check for payment success
    const isSuccess = searchParams.get('success') === 'true'
    setPaymentSuccess(isSuccess)
    
    if (isSuccess) {
      setShowSuccessMessage(true)
      // Hide success message after 8 seconds but keep paymentSuccess true
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 8000)
    }
  }, [params, searchParams])

  // Skeleton Loader
  if (loading) {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 bg-gray-300 rounded w-2/3"></div>
        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
        <div className="h-[300px] bg-gray-300 rounded-xl w-full mt-4"></div>
        <div className="h-12 bg-gray-300 rounded-xl w-full mt-6"></div>
        <div className="h-7 bg-gray-300 rounded w-1/4 mt-6"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Payment Success Message */}
      {showSuccessMessage && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl flex items-center gap-3 shadow-lg animate-fade-in">
          <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-green-800 text-lg">Payment Successful! 🎉</h3>
            <p className="text-sm text-green-700">
              Your payment has been received. Click "Complete Enrollment" below to activate your course access.
            </p>
          </div>
        </div>
      )}

      {/* Course Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          {videoCoursedes?.free ? (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
              FREE
            </span>
          ) : (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
              PREMIUM
            </span>
          )}
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {videoCoursedes?.chapter?.length || 0} Chapters
          </span>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {videoCoursedes?.name}
        </h2>
        
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">{videoCoursedes?.author}</span>
        </div>
      </div>

      {/* Video Player */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-4">
        <VideoDisplay videolink={videoCoursedes?.chapter?.[0]?.youtubeurl} />
      </div>

      {/* Enrollment Button - Pass payment success state */}
      <EnrollmentButton course={videoCoursedes} paymentSuccess={paymentSuccess} />

      {/* Course Description */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">About this course</h2>
        </div>
        
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
          <p className="text-gray-700 leading-relaxed text-sm">
            {videoCoursedes?.description}
          </p>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg border-2 border-blue-100 hover:border-blue-300 transition-colors">
          <p className="text-gray-500 text-xs font-semibold mb-1">TOTAL CHAPTERS</p>
          <p className="text-2xl font-bold text-blue-600">
            {videoCoursedes?.chapter?.length || 0}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border-2 border-purple-100 hover:border-purple-300 transition-colors">
          <p className="text-gray-500 text-xs font-semibold mb-1">COURSE TYPE</p>
          <p className="text-2xl font-bold text-purple-600">
            {videoCoursedes?.free ? 'Free' : 'Paid'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoDescription
