'use client'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs'
import { BellDot, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Header() {
  const {user, isLoaded}=useUser()
  return (
    <div className='bg-white p-4  flex justify-between '>
    <div className='flex gap-3 border p-2 rounded-md '>
        <Search />
        <input type='text' placeholder='search..' className='outline-none' />
      
    </div>
    <div className='flex items-center gap-4'>
        <BellDot className='text-gray-500' />
        {isLoaded && user ? <UserButton afterSwitchSessionUrl="/course" /> :
          <Link href={'/sign-in'}> <Button >Get Started</Button></Link>
         
        
        }
    </div>
    </div>
  )
}

export default Header
