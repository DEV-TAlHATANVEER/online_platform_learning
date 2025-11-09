'use client'
import React from 'react'
import Sidenav from './_component/Sidenav'
import Header from './_component/Header'
import { usePathname } from 'next/navigation'

export default function RouterLayout({ children }) {
  const pathname = usePathname()
  
  // Pages that should have sidenav
  const pagesWithSidenav = ['/dashborad', '/membership', '/newsletter']
  const showSidenav = pagesWithSidenav.some(path => pathname.includes(path))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {showSidenav && <Sidenav />}
        <main className={`flex-1 ${showSidenav ? 'lg:ml-0' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}
