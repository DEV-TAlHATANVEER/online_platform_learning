import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

async function enrollUser(userEmail, courseSlug) {
  const HYGRAPH_API = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_HYGRAPH_URL}/master`
  
  // Create enrollment
  const createResponse = await fetch(HYGRAPH_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation EnrollUser($userEmail: String!, $courseId: String!) {
          createUserEnrollCourse(
            data: {
              userEmail: $userEmail
              courseId: $courseId
              courseList: { connect: { slug: $courseId } }
            }
          ) {
            id
          }
        }
      `,
      variables: { userEmail, courseId: courseSlug }
    })
  })

  const createData = await createResponse.json()
  
  if (createData.errors) {
    throw new Error(JSON.stringify(createData.errors))
  }

  const enrollmentId = createData.data?.createUserEnrollCourse?.id

  // Publish enrollment
  const publishResponse = await fetch(HYGRAPH_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation PublishEnrollment($id: ID!) {
          publishUserEnrollCourse(where: { id: $id }, to: PUBLISHED) {
            id
          }
        }
      `,
      variables: { id: enrollmentId }
    })
  })

  const publishData = await publishResponse.json()
  
  if (publishData.errors) {
    throw new Error(JSON.stringify(publishData.errors))
  }

  return enrollmentId
}

export async function POST(request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userEmail, courseSlug } = await request.json()

    const enrollmentId = await enrollUser(userEmail, courseSlug)

    return NextResponse.json({ 
      success: true, 
      enrollmentId 
    })
    
  } catch (error) {
    console.error('Enrollment error:', error)
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 })
  }
}
