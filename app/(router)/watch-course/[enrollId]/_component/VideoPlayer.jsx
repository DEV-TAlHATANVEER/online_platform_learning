'use client'
import React from 'react'
import { Play } from 'lucide-react'

function VideoPlayer({ chapter, courseName }) {
  if (!chapter) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center h-96">
        <div className="text-center">
          <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No chapter selected</p>
        </div>
      </div>
    )
  }

  // Extract YouTube video ID
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url?.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = getYouTubeId(chapter.youtubeurl)

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Video */}
      <div className="relative pt-[56.25%]">
        {videoId ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={chapter.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Video not available</p>
          </div>
        )}
      </div>

      {/* Chapter Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
            Chapter {chapter.chapterNumber}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{chapter.name}</h2>
        {chapter.shortDesc && (
          <p className="text-gray-600 text-sm">{chapter.shortDesc}</p>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
