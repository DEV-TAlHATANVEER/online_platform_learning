'use client'
import React from 'react'
import { Sparkles, TrendingUp, Target } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

function WelcomeBanner() {
  const { user } = useUser()
  const currentHour = new Date().getHours()
  
  const getGreeting = () => {
    if (currentHour < 12) return '🌅 Good Morning'
    if (currentHour < 18) return '☀️ Good Afternoon'
    return '🌙 Good Evening'
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 mb-8 shadow-2xl">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <span className="text-white/80 font-semibold">{getGreeting()}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Welcome back, {user?.firstName || 'Student'}! 👋
            </h1>
            
            <p className="text-white/90 text-lg mb-6 max-w-2xl">
              Ready to continue your learning journey? You're doing amazing! Keep up the great work.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Keep Learning</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Stay Focused</span>
              </div>
            </div>
          </div>

          {/* Illustration/Icon */}
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-16 h-16 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
    </div>
  )
}

export default WelcomeBanner
