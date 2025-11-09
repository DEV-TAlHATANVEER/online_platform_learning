'use client'
import React from 'react'
import { Clock, PlayCircle, CheckCircle2, BookOpen } from 'lucide-react'

function RecentActivity({ enrolledCourses }) {
  // Generate recent activity from enrolled courses
  const generateActivities = () => {
    const activities = []
    
    enrolledCourses.forEach(course => {
      if (course.progress === 100) {
        activities.push({
          type: 'completed',
          icon: CheckCircle2,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          message: `Completed "${course.name}"`,
          time: 'Recently'
        })
      } else if (course.progress > 0) {
        activities.push({
          type: 'progress',
          icon: PlayCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          message: `Continued "${course.name}"`,
          time: 'Today'
        })
      } else {
        activities.push({
          type: 'enrolled',
          icon: BookOpen,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100',
          message: `Enrolled in "${course.name}"`,
          time: '2 days ago'
        })
      }
    })
    
    return activities.slice(0, 5) // Limit to 5 activities
  }

  const activities = generateActivities()

  if (activities.length === 0) {
    return (
      <div className='bg-white rounded-xl p-5 shadow-sm'>
        <div className='flex items-center gap-2 mb-4'>
          <Clock className='w-5 h-5 text-gray-500' />
          <h3 className='text-xl font-bold'>Recent Activity</h3>
        </div>
        <div className='text-center py-8'>
          <Clock className='w-12 h-12 mx-auto text-gray-300 mb-3' />
          <p className='text-gray-500 text-sm'>
            No recent activity yet. Start learning to see your progress here!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-xl p-5 shadow-sm'>
      <div className='flex items-center gap-2 mb-4'>
        <Clock className='w-5 h-5 text-gray-500' />
        <h3 className='text-xl font-bold'>Recent Activity</h3>
      </div>

      <div className='space-y-4'>
        {activities.map((activity, index) => (
          <div key={index} className='flex items-start gap-3'>
            {/* Icon */}
            <div className={`${activity.bgColor} p-2 rounded-lg flex-shrink-0`}>
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            
            {/* Activity Details */}
            <div className='flex-1 min-w-0'>
              <p className='text-sm text-gray-800 font-medium truncate'>
                {activity.message}
              </p>
              <p className='text-xs text-gray-500 mt-1'>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      {activities.length >= 5 && (
        <button className='w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium'>
          View All Activity
        </button>
      )}
    </div>
  )
}

export default RecentActivity