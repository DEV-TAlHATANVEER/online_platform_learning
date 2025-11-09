'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export default function Home() {
  const { user, isLoaded } = useUser()
  
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        // Hard redirect to dashboard
         
        window.location.replace('/dashborad')
      } else {
        // Hard redirect to courses
        window.location.href = '/course'
      }
    }
  }, [user, isLoaded])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
          <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-600 font-semibold mt-6 text-lg">Loading...</p>
      </div>
    </div>
  )
}
