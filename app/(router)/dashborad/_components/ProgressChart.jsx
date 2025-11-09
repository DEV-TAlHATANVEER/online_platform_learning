'use client'
import React from 'react'
import { TrendingUp, Target } from 'lucide-react'

function ProgressChart({ enrolledCourses }) {
  // Calculate overall progress
  const totalCourses = enrolledCourses.length
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length
  const inProgressCourses = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length
  const notStartedCourses = enrolledCourses.filter(c => !c.progress || c.progress === 0).length

  const completionRate = totalCourses > 0 
    ? Math.round((completedCourses / totalCourses) * 100) 
    : 0

  return (
    <div className='bg-white rounded-xl p-5 shadow-sm'>
      <div className='flex items-center gap-2 mb-4'>
        <TrendingUp className='w-5 h-5 text-blue-500' />
        <h3 className='text-xl font-bold'>Learning Progress</h3>
      </div>

      {/* Overall Completion Circle */}
      <div className='flex flex-col items-center py-6'>
        <div className='relative w-40 h-40'>
          {/* Background Circle */}
          <svg className='w-full h-full transform -rotate-90'>
            <circle
              cx='80'
              cy='80'
              r='70'
              stroke='#e5e7eb'
              strokeWidth='12'
              fill='none'
            />
            {/* Progress Circle */}
            <circle
              cx='80'
              cy='80'
              r='70'
              stroke='#3b82f6'
              strokeWidth='12'
              fill='none'
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - completionRate / 100)}`}
              strokeLinecap='round'
              className='transition-all duration-1000'
            />
          </svg>
          {/* Center Text */}
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-3xl font-bold text-gray-800'>{completionRate}%</span>
            <span className='text-sm text-gray-500'>Complete</span>
          </div>
        </div>
      </div>

      {/* Stats Breakdown */}
      <div className='space-y-3 mt-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-green-500' />
            <span className='text-sm text-gray-600'>Completed</span>
          </div>
          <span className='font-semibold text-gray-800'>{completedCourses}</span>
        </div>
        
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-blue-500' />
            <span className='text-sm text-gray-600'>In Progress</span>
          </div>
          <span className='font-semibold text-gray-800'>{inProgressCourses}</span>
        </div>
        
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-full bg-gray-300' />
            <span className='text-sm text-gray-600'>Not Started</span>
          </div>
          <span className='font-semibold text-gray-800'>{notStartedCourses}</span>
        </div>
      </div>

      {/* Goal Section */}
      <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
        <div className='flex items-center gap-2 mb-2'>
          <Target className='w-4 h-4 text-blue-600' />
          <span className='font-semibold text-blue-900'>Weekly Goal</span>
        </div>
        <p className='text-sm text-blue-700'>
          Complete 3 chapters this week to maintain your streak!
        </p>
      </div>
    </div>
  )
}

export default ProgressChart