'use client'
import React, { useState } from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BookOpen, 
  GraduationCap, 
  Bell, 
  Search,
  Menu,
  X,
  Sparkles
} from 'lucide-react'

function Header() {
  const { user, isLoaded } = useUser()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Courses', path: '/course', icon: BookOpen },
    { name: 'Dashboard', path: '/dashborad', icon: GraduationCap, requireAuth: true },
  ]

  const isActive = (path) => pathname === path

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LearnHub
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Online Learning</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              // Skip auth-required links if not logged in
              if (link.requireAuth && !user) return null
              
              const Icon = link.icon
              const active = isActive(link.path)
              
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm
                    transition-all duration-300
                    ${active 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search (Desktop) */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-gray-600">
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Search...</span>
            </button>

            {/* Notifications (if logged in) */}
            {isLoaded && user && (
              <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            )}

            {/* User Button or Sign In */}
            {isLoaded && (
              <div className="flex items-center gap-3">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 rounded-xl ring-2 ring-blue-500 ring-offset-2"
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <Link
                      href="/sign-in"
                      className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold text-sm transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                    >
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <nav className="space-y-2">
              {navLinks.map((link) => {
                if (link.requireAuth && !user) return null
                
                const Icon = link.icon
                const active = isActive(link.path)
                
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl font-semibold
                      transition-all duration-300
                      ${active 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                )
              })}

              {/* Search Mobile */}
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-100 rounded-xl text-gray-700">
                <Search className="w-5 h-5" />
                <span className="font-medium">Search courses...</span>
              </button>

              {/* Auth Buttons Mobile */}
              {!user && (
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Progress Bar (Optional - shows on page navigation) */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform origin-left scale-x-0 transition-transform duration-300"></div>
    </header>
  )
}

export default Header
