import Image from 'next/image'
import React from 'react'

function CourseItem({ course }) {
  
  
  return (
    <div className='border rounded-xl hover:shadow-purple-100 hover:shadow-md hover:cursor-pointer mt-2'>
      <Image src={course?.banner.url} width={300} height={300} alt='images bannner' className='rounded-t-xl' />
      {course?.chapter.length==0? <div className='flex flex-col gap-1'>
      <h2 className='font-medium'>{course?.name}</h2>
      <h2 className='text-[14px] text-gray-800'>{course?.author}</h2>
      <div className='flex gap-2'>
      <Image src={"/youtube.png"} width={20} height={20} alt='youtube icon' />
      <h2 className='text-[14px] text-gray-500'>watch on youtube</h2>
      </div>
      <h2 className='font-medium'>{course?.free?'Free' : 'Paid'}</h2>

      </div>: 
     
      <div className='flex flex-col gap-1'>
      <h2 className='font-medium'>{course?.name}</h2>
      <h2 className='text-[14px] text-gray-800'>{course?.author}</h2>
      <div className='flex gap-2'>
      <Image src={"/chapter.png"} width={20} height={20} alt='chapter icon' />
      
      </div>
      <h2 className='font-medium'>{course?.free?'Free' : 'Paid'}</h2>

      </div>
      }
    </div>
  )
}

export default CourseItem
