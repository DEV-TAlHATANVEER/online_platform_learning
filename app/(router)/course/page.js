'use client'
import React from 'react'
import WelcomeBanner from './_component/WelcomeBanner'
import CourseList from './_component/CourseList'
import SideBanner from './_component/SideBanner'

function Course() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 p-5 gap-4'>
    <div className='col-span-3'> 
      <WelcomeBanner />
      <CourseList />
    </div>
    <div className='p-5 bg-white rounded-xl'>
      <SideBanner />
    </div>

    </div>
  )
}

export default Course
