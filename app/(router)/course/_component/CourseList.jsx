import React, { useEffect, useState } from 'react'
import HyperGraphql from '../../_utils/HyperGraphql'
import { Select, SelectContent,SelectItem,SelectTrigger, SelectValue, } from "@/components/ui/select"
import Course from '../page';
import CourseItem from './CourseItem';
import Link from 'next/link';
function CourseList() {
  const [courses, setCourses] = useState([])
  console.log(courses);
  
  useEffect(() => {
    getAllCourses()
  }, [])

  const getAllCourses = () => {
    HyperGraphql.getallCourseList().then((resp) => {
      setCourses(resp?.courseLists || [])
    })
  }

  return (
    <div className='bg-white p-3 rounded-lg mt-2'>
      <div className=' flex justify-between items-center'>
        <h2 className='text-[20px] font-bold text-blue-500'> All Course</h2>
        <Select>
        <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
             <SelectItem value="system">All</SelectItem>
          <SelectItem value="light">Free</SelectItem>
            <SelectItem value="dark">Paid</SelectItem>
          </SelectContent>
        </Select>

        
      </div>
      <div className='grid grid-col-2 lg:grid-cols-3 gap-4'>
        {courses?.length > 0 ? courses.map((item, index) => (
            <Link href={"/course-perview/"+item.slug} key={index}>
            <div >
              <CourseItem course={item} />
            </div>
            
            </Link>
          )) :
          [1, 2, 3, 4, 5, 6, 7, 8].map((item,key) => (
            <div key={key} className='w-full h-[240px] rounded-xl m-2 bg-slate-200 animate-pulse '>



            </div>
          ))
          }
        
        </div>

    </div>
  )
}

export default CourseList
