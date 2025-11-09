'use client'
import React from 'react'
import { Sparkles } from 'lucide-react'

function WelcomeBannerDashboard({ user }) {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className='bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl p-8 text-white shadow-lg'>
      <div className='flex items-center gap-3 mb-2'>
        <Sparkles className='w-8 h-8 animate-pulse' />
        <h2 className='text-3xl font-bold'>
          {getCurrentGreeting()}, {user?.firstName || 'Student'}!
        </h2>
      </div>
      <p className='text-lg opacity-90'>
        Ready to continue your learning journey? Let's achieve your goals today!
      </p>
      <div className='mt-4 flex gap-4'>
        <div className='bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2'>
          <p className='text-sm opacity-80'>Learning Streak</p>
          <p className='text-2xl font-bold'>🔥 0 days</p>
        </div>
        <div className='bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2'>
          <p className='text-sm opacity-80'>Points Earned</p>
          <p className='text-2xl font-bold'>⭐ 0</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBannerDashboard