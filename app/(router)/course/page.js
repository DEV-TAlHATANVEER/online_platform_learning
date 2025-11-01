
import React from 'react'
import WelcomeBanner from './_component/WelcomeBanner'

function Course() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
    <div className='col-span-2'> 
      <WelcomeBanner />
    </div>
    <div className=''>
      right section
    </div>

    </div>
  )
}

export default Course
