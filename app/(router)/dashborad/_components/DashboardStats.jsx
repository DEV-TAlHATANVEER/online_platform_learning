'use client'
import React from 'react'
import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react'

function DashboardStats({ enrolledCourses }) {
  // Calculate statistics
  const totalCourses = enrolledCourses.length
  const inProgressCourses = enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length
  const completedCourses = enrolledCourses.filter(c => c.progress === 100).length
  const averageProgress = totalCourses > 0 
    ? Math.round(enrolledCourses.reduce((sum, c) => sum + (c.progress || 0), 0) / totalCourses)
    : 0

  const stats = [
    {
      id: 1,
      title: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      change: '+2 this month'
    },
    {
      id: 2,
      title: 'In Progress',
      value: inProgressCourses,
      icon: Clock,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      change: 'Keep going!'
    },
    {
      id: 3,
      title: 'Completed',
      value: completedCourses,
      icon: Award,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      change: 'Well done!'
    },
    {
      id: 4,
      title: 'Avg. Progress',
      value: `${averageProgress}%`,
      icon: TrendingUp,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      change: 'On track'
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5'>
      {stats.map((stat) => (
        <div 
          key={stat.id} 
          className='bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300'
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-gray-500 text-sm mb-1'>{stat.title}</p>
              <h3 className='text-3xl font-bold text-gray-800'>{stat.value}</h3>
              <p className='text-xs text-gray-400 mt-1'>{stat.change}</p>
            </div>
            <div className={`${stat.bgColor} p-4 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats