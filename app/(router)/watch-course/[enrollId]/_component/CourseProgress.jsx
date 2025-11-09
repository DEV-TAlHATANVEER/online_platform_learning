'use client'
import React from 'react'
import { Award, BookOpen, TrendingUp } from 'lucide-react'

function CourseProgress({ course, currentChapter, totalChapters }) {
  const progress = totalChapters > 0 ? ((currentChapter + 1) / totalChapters) * 100 : 0

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        Your Progress
      </h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Chapter {currentChapter + 1} of {totalChapters}
          </span>
          <span className="text-sm font-bold text-purple-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <p className="text-xs text-gray-600 font-semibold">COMPLETED</p>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {currentChapter + 1}/{totalChapters}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-purple-600" />
            <p className="text-xs text-gray-600 font-semibold">REMAINING</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {totalChapters - (currentChapter + 1)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CourseProgress
