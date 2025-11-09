'use client'
import React from 'react'
import { Clock, BookOpen, CheckCircle, Play } from 'lucide-react'

function RecentActivity() {
  const activities = [
    {
      icon: Play,
      color: 'blue',
      title: 'Started "Introduction to React"',
      time: '2 hours ago',
      description: 'Chapter 1: Getting Started'
    },
    {
      icon: CheckCircle,
      color: 'green',
      title: 'Completed "JavaScript Basics"',
      time: '1 day ago',
      description: 'Finished all 12 chapters'
    },
    {
      icon: BookOpen,
      color: 'purple',
      title: 'Enrolled in "Next.js Masterclass"',
      time: '2 days ago',
      description: 'Premium course unlocked'
    }
  ]

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-200'
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      border: 'border-purple-200'
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="w-6 h-6 text-blue-600" />
          Recent Activity
        </h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const colors = colorClasses[activity.color]
          return (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 ${colors.border} bg-gradient-to-r ${colors.bg}/30 hover:${colors.bg}/50 transition-all duration-300 group cursor-pointer`}
            >
              <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <activity.icon className={`w-6 h-6 ${colors.text}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </div>
  )
}

export default RecentActivity
