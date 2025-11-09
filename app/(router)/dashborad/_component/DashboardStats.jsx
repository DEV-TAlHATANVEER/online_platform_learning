'use client'
import React from 'react'
import { BookOpen, Award, TrendingUp, Clock, Zap } from 'lucide-react'

function DashboardStats({ enrolledCount, completedCount, totalChapters, totalLearningTime }) {
  const stats = [
    {
      icon: BookOpen,
      label: 'Enrolled Courses',
      value: enrolledCount,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Award,
      label: 'Completed',
      value: completedCount,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Zap,
      label: 'Total Chapters',
      value: totalChapters,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Clock,
      label: 'Learning Time',
      value: `${totalLearningTime}h`,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 shadow-lg border-2 border-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group`}
        >
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-full blur-2xl`}></div>
          </div>

          {/* Content */}
          <div className="relative">
            <div className={`${stat.iconBg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-7 h-7 ${stat.iconColor}`} />
            </div>
            
            <h3 className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
              {stat.value}
            </h3>
            
            <p className="text-gray-600 font-medium text-sm">{stat.label}</p>
          </div>

          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
        </div>
      ))}
    </div>
  )
}

export default DashboardStats
