import { BadgeIcon, BookOpen, GraduationCap } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


const menu =[
    {
        id:1,
        name:"All Course",
        icon:BookOpen
    },
    {
        id:2,
        name:"Membership",
        icon:BadgeIcon
    },
    {
        id:3,
        name:"Be Instructor",
        icon: GraduationCap
    },
]
function Sidenav() {
  return (
    <div className='shadow-lg bg-white h-screen border'>
        <div className='flex items-center mt-1 gap-0.5 shadow-lg bg-blue-300 text-amber-100'> 
        <Image src="/logo.png" alt='logo' width={40} height={40} ></Image>
        <span className='text-1xl text-amber-50 font-medium '>online-course</span>
        </div>
        <hr className='mt-7'/>
        <div>
                {menu.map((item,index)=>(
                    <div key={index} className='flex gap-3 mt-2 p-2 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-primary   hover:text-white rounded-2xl 
                    transition-all ease-in-out duration-500 group
                    '> 
                        <item.icon className='group-hover:animate-bounce' />
                        <h2>{item.name}</h2>
                    </div>

                ))}

            </div>
    </div>
    
  )
}

export default Sidenav
