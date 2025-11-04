'use client'
import HyperGraphql from '@/app/(router)/_utils/HyperGraphql'
import React, { useEffect, useState } from 'react'
import VideoDisplay from './VideoDisplay'
import { useParams } from 'next/navigation'

function VideoDescription() {
  const params = useParams()
  const [videoCoursedes, setvideoDes] = useState(null)
  const [loading, setLoading] = useState(true)

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
  }, [params])

  // Skeleton Loader
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-400 rounded w-2/3"></div>
        <div className="h-4 bg-gray-400 rounded w-1/3"></div>
        <div className="h-[200px] bg-gray-400 rounded-xl w-full"></div>
        <div className="h-6 bg-gray-400 rounded w-1/4 mt-6"></div>
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-[24px] font-semibold">{videoCoursedes?.name}</h2>
      <h2 className="text-gray-500 text-[14px]">{videoCoursedes?.author}</h2>
      <VideoDisplay videolink={videoCoursedes?.chapter?.[0]?.youtubeurl} />
      <h2 className="text-[25px] font-semibold mt-6">About this course</h2>
      <h2 className="text-[12px] text-gray-500 font-bold">
        {videoCoursedes?.description}
      </h2>
    </div>
  )
}

export default VideoDescription
