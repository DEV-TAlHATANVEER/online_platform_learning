'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Bell,
  CreditCard,
  LogOut,
  Menu,
  X,
  Sparkles,
  GraduationCap
} from 'lucide-react'

function Sidenav() {
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashborad',
      requireAuth: true,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'All Courses',
      icon: BookOpen,
      path: '/course',
      requireAuth: false,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Membership',
      icon: Award,
      path: '/membership',
      requireAuth: false,
      gradient: 'from-orange-500 to-red-500',
      badge: 'Premium'
    },
    {
      name: 'Newsletter',
      icon: Bell,
      path: '/newsletter',
      requireAuth: false,
      gradient: 'from-green-500 to-emerald-500',
      badge: 'New'
    }
  ]

  const isActive = (path) => pathname === path

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-500 transition-all"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          w-65 bg-gradient-to-b from-white to-gray-50
          border-r-2 border-gray-200 shadow-xl
          z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
      >
        {/* Logo/Brand */}
        {/* <div className="p-6 border-b-2 border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl">LearnHub</h1>
              <p className="text-white/80 text-xs">Online Learning</p>
            </div>
          </Link>
        </div> */}

        {/* User Info */}
        {isLoaded && user && (
          <div className="p-4 border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-3">
              <img
                src={user.imageUrl}
                alt={user.firstName}
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            // Show all items for now, handle auth in the pages
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  group relative flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 overflow-hidden
                  ${active
                    ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {/* Animated background on hover */}
                {!active && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                )}

                {/* Icon */}
                <div className="relative z-10">
                  <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'} transition-colors`} />
                </div>

                {/* Label */}
                <span className="relative z-10 font-semibold flex-1">
                  {item.name}
                </span>

                {/* Badge */}
                {item.badge && !active && (
                  <span className={`relative z-10 px-2 py-0.5 bg-gradient-to-r ${item.gradient} text-white text-xs font-bold rounded-full`}>
                    {item.badge}
                  </span>
                )}

                {/* Active indicator */}
                {active && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer - Coming Soon Items */}
        <div className="p-4 mt-auto border-t-2 border-gray-200">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-bold text-gray-800 text-sm">Coming Soon</span>
            </div>
            <div className="space-y-1 text-xs text-gray-600">
              <p>🏪 Store</p>
              <p>👨‍🏫 Become Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidenav
