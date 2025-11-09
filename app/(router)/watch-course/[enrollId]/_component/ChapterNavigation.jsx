'use client'
import React from 'react'
import { Check, Play, Lock } from 'lucide-react'

function ChapterNavigation({ chapters, currentChapter, onChapterChange, enrollment }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 sticky top-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Play className="w-5 h-5 text-blue-600" />
        Course Chapters ({chapters.length})
      </h3>

      <div className="space-y-2">
        {chapters.map((chapter, index) => {
          const isActive = currentChapter === index
          const isUnlocked = enrollment !== null

          return (
            <button
              key={chapter.id}
              onClick={() => isUnlocked && onChapterChange(index)}
              disabled={!isUnlocked}
              className={`
                w-full text-left p-4 rounded-lg border-2 transition-all duration-300
                ${isActive 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }
                ${!isUnlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-start gap-3">
                {/* Chapter Number */}
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm flex-shrink-0
                  ${isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {isUnlocked ? (
                    <span>{chapter.chapterNumber || index + 1}</span>
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>

                {/* Chapter Info */}
                <div className="flex-1 min-w-0">
                  <h4 className={`
                    font-semibold text-sm mb-1 line-clamp-2
                    ${isActive ? 'text-blue-700' : 'text-gray-800'}
                  `}>
                    {chapter.name}
                  </h4>
                  {chapter.shortDesc && (
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {chapter.shortDesc}
                    </p>
                  )}
                </div>

                {/* Play Icon */}
                {isActive && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Active Indicator */}
              {isActive && (
                <div className="mt-2 h-1 bg-blue-500 rounded-full"></div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ChapterNavigation
