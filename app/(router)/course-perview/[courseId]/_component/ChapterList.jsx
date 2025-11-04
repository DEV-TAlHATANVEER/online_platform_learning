'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import HyperGraphql from '@/app/(router)/_utils/HyperGraphql'
import { PlayCircle, Play } from 'lucide-react' // using lucide-react icons

function ChapterList({ onSelectChapter }) {
  const params = useParams()
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeChapter, setActiveChapter] = useState(null)

  useEffect(() => {
    const fetchChapters = async () => {
      if (!params?.courseId) return
      try {
        const resp = await HyperGraphql.getallcoursevideousingslug(params.courseId)
        setChapters(resp.courseList?.chapter || [])
        setActiveChapter(resp.courseList?.chapter?.[0] || null) // set first as default
        onSelectChapter?.(resp.courseList?.chapter?.[0]) // send to parent
      } catch (error) {
        console.error('Error fetching chapters:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChapters()
  }, [params])

  const handleSelectChapter = (chapter) => {
    setActiveChapter(chapter)
    onSelectChapter?.(chapter) // callback to parent (to update video)
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-3 p-4 bg-white rounded-xl shadow">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100 ">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
        📘 Course Contents
      </h2>

      {chapters.length > 0 ? (
        <ul className="space-y-2">
          {chapters.map((chapter, index) => {
            const isActive = activeChapter?.id === chapter.id
            return (
              <li
                key={chapter.id || index}
                onClick={() => handleSelectChapter(chapter)}
                className={`p-3 border rounded-lg cursor-pointer flex items-center gap-3 transition 
                  ${isActive ? 'bg-blue-50 border-blue-400' : 'hover:bg-gray-50 border-gray-200'}`}
              >
                {isActive ? (
                  <PlayCircle className="w-5 h-5 text-blue-500" />
                ) : (
                  <Play className="w-4 h-4 text-gray-400" />
                )}
                <div>
                  <h3
                    className={`text-[15px] font-medium leading-tight ${
                      isActive ? 'text-blue-600' : 'text-gray-800'
                    }`}
                  >
                    {index + 1}. {chapter.name}
                  </h3>
                 
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No chapters available for this course.</p>
      )}
    </div>
  )
}

export default ChapterList
