import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='bg-white p-5 mt-3 shadow-lg rounded-lg    flex gap-3 items-center '>
    <div className='cursor-pointer'>
      <Image src="/panda.jpg" alt='panda image' width={150} height={150} />
        </div>
      <div className=''>
           <h1 className='font-bold text-[27px]'>Welcome to <span className='bg-blue-500 p-1 text-white rounded-sm'>DevGuru</span>  Academy</h1>
           <h2 className='text-gray-400'>Explore learn and build all real Life Project </h2>
      </div>
    </div>
  )
}

export default WelcomeBanner
