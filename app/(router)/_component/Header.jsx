import { Button } from '@/components/ui/button'
import { BellDot, Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='bg-white p-4  flex justify-between '>
    <div className='flex gap-3 border p-2 rounded-md '>
        <Search />
        <input type='text' placeholder='search..' className='outline-none' />
      
    </div>
    <div className='flex items-center gap-4'>
        <BellDot className='text-gray-500' />
        <Button >Get Started</Button>
    </div>
    </div>
  )
}

export default Header
