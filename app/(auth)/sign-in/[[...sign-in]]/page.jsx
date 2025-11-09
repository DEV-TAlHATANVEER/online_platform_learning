'use client'
import { SignIn, useUser } from '@clerk/nextjs'
import React from 'react'
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page() {
   const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    // If user is already signed in, redirect to dashboard
    if (isLoaded && isSignedIn) {
      router.replace('/dashborad')
    }
  }, [isLoaded, isSignedIn, router])
  if (!isLoaded || isSignedIn) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-600 mt-4">Redirecting...</p>
      </div>
    </div>
  )
}
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col lg:flex-row h-screen gap-4">
        {/* Left side image section */}
       {/* Left side image section */}
        <div className="relative hidden lg:flex lg:w-3/2  items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"
            alt="Learning background"
            className="absolute inset-0 w-full h-full object-cover rounded-r-3xl"
          />
          {/* Softer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/70 to-transparent rounded-r-3xl" />

          <div className="relative z-10 px-16">
            <h2 className="text-4xl font-extrabold text-[#f9fafb] drop-shadow-md mb-4">
              Talha Learning
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed max-w-md">
              Unlock your potential with expert-led courses.
              <br />
              Learn anywhere, anytime — and grow your skills confidently.
            </p>
            <p className="mt-6 text-sm text-gray-300 italic">
              “Learning never stops — it just gets smarter.”
            </p>
          </div>
        </div>
    

            <div className="justify-between   mt-3">
        <SignIn 
          afterSignInUrl="/sign-in"
          signUpUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-2xl border-2 border-gray-100",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            },
          }}
        />
            </div>
          </div>
        </div>
     
  )
}
