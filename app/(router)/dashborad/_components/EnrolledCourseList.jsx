'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock, PlayCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function EnrolledCourseList({ enrolledCourses, loading, onUpdate }) {
  if (loading) {
    return (
      <div className='bg-white rounded-xl p-5 shadow-sm'>
        <h2 className='text-2xl font-bold mb-5'>My Courses</h2>
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='animate-pulse'>
              <div className='flex gap-4'>
                <div className='w-48 h-32 bg-gray-200 rounded-lg' />
                <div className='flex-1 space-y-3'>
                  <div className='h-6 bg-gray-200 rounded w-3/4' />
                  <div className='h-4 bg-gray-200 rounded w-1/2' />
                  <div className='h-4 bg-gray-200 rounded w-full' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className='bg-white rounded-xl p-10 shadow-sm text-center'>
        <BookOpen className='w-16 h-16 mx-auto text-gray-300 mb-4' />
        <h2 className='text-2xl font-bold mb-2'>No Enrolled Courses Yet</h2>
        <p className='text-gray-500 mb-6'>
          Start your learning journey by enrolling in courses that interest you!
        </p>
        <Link href='/course'>
          <Button className='bg-blue-500 hover:bg-blue-600'>
            Browse Courses
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-xl p-5 shadow-sm'>
      <div className='flex justify-between items-center mb-5'>
        <h2 className='text-2xl font-bold'>My Courses</h2>
        <Link href='/course'>
          <Button variant='outline' size='sm'>
            Browse More
          </Button>
        </Link>
      </div>

      <div className='space-y-4'>
        {enrolledCourses.map((course, index) => (
          <Link 
            href={`/course-preview/${course.slug}`} 
            key={index}
          >
            <div className='border rounded-lg p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer'>
              <div className='flex gap-4'>
                {/* Course Image */}
                <div className='relative w-48 h-32 flex-shrink-0'>
                  <Image
                    src={course.banner?.url || '/placeholder-course.png'}
                    alt={course.name}
                    fill
                    className='object-cover rounded-lg'
                  />
                  {course.progress === 100 && (
                    <div className='absolute top-2 right-2 bg-green-500 rounded-full p-1'>
                      <CheckCircle2 className='w-5 h-5 text-white' />
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className='flex-1'>
                  <h3 className='font-bold text-lg mb-1'>{course.name}</h3>
                  <p className='text-sm text-gray-600 mb-2'>
                    By {course.author}
                  </p>
                  
                  <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                    <div className='flex items-center gap-1'>
                      <BookOpen className='w-4 h-4' />
                      <span>{course.totalChapter || course.chapter?.length || 0} Chapters</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <Clock className='w-4 h-4' />
                      <span>
                        {course.progress === 100 
                          ? 'Completed' 
                          : course.progress > 0 
                          ? 'In Progress' 
                          : 'Not Started'
                        }
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className='space-y-1'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-gray-600'>Progress</span>
                      <span className='font-medium text-blue-600'>
                        {course.progress || 0}%
                      </span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className='bg-blue-500 h-2 rounded-full transition-all duration-300'
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <div className='flex items-center'>
                  <Button className='bg-blue-500 hover:bg-blue-600'>
                    <PlayCircle className='w-4 h-4 mr-2' />
                    {course.progress === 100 
                      ? 'Review' 
                      : course.progress > 0 
                      ? 'Continue' 
                      : 'Start'
                    }
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default EnrolledCourseList