'use client'
import React from 'react'
import Link from 'next/link'
import { BookOpen, PlayCircle, Clock, Award, ArrowRight } from 'lucide-react'
import Image from 'next/image'

function EnrolledCourseCard({ course, progress = 0 }) {
  const totalChapters = course.courseList?.chapter?.length || 0
  const completedChapters = Math.floor(totalChapters * (progress / 100))

  return (
    <Link href={`/watch-course/${course.courseList.slug}`}>
      <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 transform hover:-translate-y-2">
        {/* Course Banner */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
          {course.courseList.banner?.url ? (
            <img
              src={course.courseList.banner.url}
              alt={course.courseList.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-20 h-20 text-blue-300" />
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform">
              <PlayCircle className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          {/* Badge */}
          <div className="absolute top-4 right-4">
            {course.courseList.free ? (
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                FREE
              </span>
            ) : (
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                PREMIUM
              </span>
            )}
          </div>
        </div>

        {/* Course Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {course.courseList.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {course.courseList.description}
          </p>

          {/* Author */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <Award className="w-4 h-4" />
            <span>{course.courseList.author}</span>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-gray-600">Progress</span>
              <span className="text-xs font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{completedChapters}/{totalChapters}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalChapters * 15}min</span>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EnrolledCourseCard
