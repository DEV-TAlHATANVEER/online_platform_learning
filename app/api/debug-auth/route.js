import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const { userId } = await auth()
  
  return NextResponse.json({
    authenticated: !!userId,
    userId: userId || 'none',
    timestamp: new Date().toISOString()
  })
}
