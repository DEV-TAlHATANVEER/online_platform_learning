import React from 'react'
import VideoDescription from './_component/VideoDescription'
import ChapterList from './_component/ChapterList'

function CoursePerview() {
  
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-4 '>
      <div className='col-span-2 bg-white mt-3 rounded-2xl'>
          <VideoDescription/>
      </div>

      <div className='col-span-1 ml-5 mt-3 '>
            <ChapterList />
      </div>
    </div>
  )
}

export default CoursePerview
