import { NextResponse } from 'next/server'
import { request, gql } from 'graphql-request'

const HYGRAPH_API = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_HYGRAPH_URL}/master`

export async function POST(req) {
  try {
    const { userEmail, courseSlug } = await req.json()

    const enrollMutation = gql`
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
    `

    const result = await request(HYGRAPH_API, enrollMutation, {
      userEmail,
      courseId: courseSlug,
    })

    const publishMutation = gql`
      mutation PublishEnrollment($id: ID!) {
        publishUserEnrollCourse(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `

    await request(HYGRAPH_API, publishMutation, { id: result.createUserEnrollCourse.id })

    return NextResponse.json({ success: true, id: result.createUserEnrollCourse.id })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
