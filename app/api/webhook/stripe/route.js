import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Simplified enrollment function
async function enrollUserInHygraph(userEmail, courseSlug) {
  const HYGRAPH_API = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_HYGRAPH_URL}/master`
  
  console.log('🔍 Enrolling:', { userEmail, courseSlug })

  try {
    // Step 1: Create enrollment
    const createResponse = await fetch(HYGRAPH_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
              userEmail
              courseId
            }
          }
        `,
        variables: {
          userEmail: userEmail,
          courseId: courseSlug
        }
      })
    })

    const createData = await createResponse.json()
    console.log('📝 Create response:', JSON.stringify(createData, null, 2))

    if (createData.errors) {
      throw new Error(`Hygraph error: ${JSON.stringify(createData.errors)}`)
    }

    const enrollmentId = createData.data?.createUserEnrollCourse?.id

    if (!enrollmentId) {
      throw new Error('No enrollment ID returned')
    }

    console.log('✅ Enrollment created with ID:', enrollmentId)

    // Step 2: Publish enrollment
    const publishResponse = await fetch(HYGRAPH_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation PublishEnrollment($id: ID!) {
            publishUserEnrollCourse(where: { id: $id }, to: PUBLISHED) {
              id
            }
          }
        `,
        variables: {
          id: enrollmentId
        }
      })
    })

    const publishData = await publishResponse.json()
    console.log('📢 Publish response:', JSON.stringify(publishData, null, 2))

    if (publishData.errors) {
      throw new Error(`Publish error: ${JSON.stringify(publishData.errors)}`)
    }

    console.log('✅ Enrollment published successfully')
    return true

  } catch (error) {
    console.error('❌ Enrollment error:', error)
    throw error
  }
}

export async function POST(req) {
  console.log('🎯 Webhook endpoint hit')

  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    console.error('❌ No stripe signature found')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    console.log('✅ Webhook verified:', event.type)
  } catch (err) {
    console.error('❌ Webhook verification failed:', err.message)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }

  // Handle checkout completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    console.log('💳 Checkout completed for:', session.customer_email)
    console.log('📦 Metadata:', session.metadata)

    const { courseSlug, userEmail } = session.metadata

    if (!courseSlug || !userEmail) {
      console.error('❌ Missing metadata:', { courseSlug, userEmail })
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    try {
      await enrollUserInHygraph(userEmail, courseSlug)
      console.log('🎉 User successfully enrolled!')
      
      return NextResponse.json({ 
        received: true, 
        enrolled: true 
      })
    } catch (error) {
      console.error('❌ Failed to enroll user:', error)
      return NextResponse.json({ 
        received: true, 
        enrolled: false,
        error: error.message 
      }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
