'use client'



import { BadgeIcon, BookOpen, GraduationCap, LayoutDashboard, Mail, Store } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'


function Sidenav() {
    const {user} =useUser()
    const menu = [
        {
            id:1,
            name:"DashBorad",
            icon: LayoutDashboard,
            path: '/dashborad',
            auth:user
        },
        {
            id:6,
            name:"All Course",
            icon: BookOpen,
            path: '/course',
            auth:true
        },
        {
            id:5,
            name:"Store",
            icon: Store,
            path: '/store',
            auth:true
        },
        {
            id:2,
            name:"Membership",
            icon: BadgeIcon,
            path: '/membership',
            auth:true
        },
        {
            id:3,
            name:"Be Instructor",
            icon: GraduationCap,
            path: '/instructor',
            auth:true
        },
        {
            id:4,
            name:"Newsletter",
            icon: Mail,
            path: '/newsletter',
            auth:true
        },
    ]
    const path = usePathname()
    useEffect(() => {
        console.log(path);
        
    },[])
  return (
      <div className='shadow-lg bg-white h-screen border'>
          
        <div className='flex items-center mt-1 gap-0.5 shadow-lg bg-blue-300 text-amber-100'> 
        <Image src="/logo.png" alt='logo' width={40} height={40} ></Image>
        <span className='text-1xl text-amber-50 font-medium '>online-course</span>
        </div>
        <hr className='mt-7'/>
          <div>
                {menu.map((item,index)=>item.auth&&(
                    <Link href={item.path} key={index}>
                        <div className={`flex gap-3 mt-2 p-2 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-primary   hover:text-white rounded-2xl 
                    transition-all ease-in-out duration-500 group
                    ${path.includes(item.path)&&'bg-primary text-white '} `}> 
                        <item.icon className='group-hover:animate-bounce' />
                        <h2>{item.name}</h2>
                    </div>

          </Link>
                ))}

            </div>
    </div>
    
  )
}

export default Sidenav
