// Add these new functions to app/(router)/_utils/HyperGraphql.js

import { gql, request } from 'graphql-request'

const GOBOAL_API=`https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_HYGRAPH_URL}/master`

// Existing functions...
const getallCourseList= async ()=>{
const document=gql`
query MyQuery {
  courseLists {
    author
    chapter {
      ... on Chapter {
        id
        name
        chapterNumber
        shortDesc
        youtubeurl
      }
    }
    free
    description
    sourceCode
    totalChapter
    name
    slug
    tag
    banner {
      url
    }
    youtubeUrl
  }
}`
const result = await request(GOBOAL_API, document)
return result
}

const getallbanner = async () => {
  const doc = gql`
    query GetBannner {
    sideBanners {
      id
      banner {
        url
      }
      name
      url
    }
  }
  `
 const result = await request(GOBOAL_API, doc)
return result
}

const getallcoursevideousingslug = async (courseId) => {
 const doc= gql`
query MyQuery {
  courseList(where: {slug: "`+courseId+`"}) {
    id
    author
    name
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        youtubeurl
        chapterNumber
      }
    }
    description
    youtubeUrl
    slug
    free
  }
}
`
   const result = await request(GOBOAL_API, doc)
return result
}

// Check if user is enrolled in a course
const checkUserEnrollment = async (userEmail, courseId) => {
  const query = gql`
    query CheckEnrollment($userEmail: String!, $courseId: String!) {
      userEnrollCourses(where: {userEmail: $userEmail, courseId: $courseId}) {
        id
        userEmail
        courseId
      }
    }
  `
  
  try {
    const result = await request(GOBOAL_API, query, { userEmail, courseId })
    return result.userEnrollCourses?.[0] || null
  } catch (error) {
    console.error('Error checking enrollment:', error)
    return null
  }
}

// Enroll user in a course
const enrollUserInCourse = async (userEmail, courseId, courseListId) => {
  const mutation = gql`
    mutation EnrollCourse($userEmail: String!, $courseId: String!) {
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
  `
  
  try {
    const result = await request(GOBOAL_API, mutation, {
      userEmail,
      courseId
    })
    
    // Publish the newly created enrollment
    const publishMutation = gql`
      mutation PublishEnrollment($id: ID!) {
        publishUserEnrollCourse(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `
    
    await request(GOBOAL_API, publishMutation, { id: result.createUserEnrollCourse.id })
    
    return result.createUserEnrollCourse
  } catch (error) {
    console.error('Error enrolling user:', error)
    throw error
  }
}

// Get all enrolled courses for a user
const getUserEnrolledCourses = async (userEmail) => {
  const query = gql`
    query GetUserEnrollments($userEmail: String!) {
      userEnrollCourses(where: {userEmail: $userEmail}) {
        id
        courseId
        courseList {
          id
          name
          slug
          author
          description
          totalChapter
          free
          banner {
            url
          }
        }
      }
    }
  `
  
  try {
    const result = await request(GOBOAL_API, query, { userEmail })
    return result.userEnrollCourses || []
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return []
  }
}
const getCourseWithDetails = async (courseId) => {
  const doc = gql`
    query GetCourseDetails {
      courseList(where: {slug: "${courseId}"}) {
        id
        author
        name
        banner {
          url
        }
        chapter {
          ... on Chapter {
            id
            name
            youtubeurl
            chapterNumber
            shortDesc
          }
        }
        description
        youtubeUrl
        slug
        free
        totalChapter
        tag
      }
    }
  `
  const result = await request(GOBOAL_API, doc)
  return result
}
// Add to app/(router)/_utils/HyperGraphql.js

// Get user enrolled courses with full details
const getUserEnrolledCoursesWithDetails = async (userEmail) => {
  const query = gql`
    query GetUserEnrollments($userEmail: String!) {
      userEnrollCourses(where: {userEmail: $userEmail}) {
        id
        courseId
        courseList {
          id
          name
          slug
          author
          description
          totalChapter
          free
          banner {
            url
          }
          chapter {
            ... on Chapter {
              id
              name
            }
          }
        }
      }
    }
  `
  
  try {
    const result = await request(GOBOAL_API, query, { userEmail })
    return result.userEnrollCourses || []
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return []
  }
}

// Update the export
export default {
  getallCourseList, 
  getallbanner,
  getallcoursevideousingslug,
  checkUserEnrollment,
  enrollUserInCourse,
  getUserEnrolledCourses,
  getCourseWithDetails,
  getUserEnrolledCoursesWithDetails
}

