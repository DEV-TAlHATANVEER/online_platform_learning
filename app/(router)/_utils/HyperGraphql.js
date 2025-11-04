import { gql, request } from 'graphql-request'

const GOBOAL_API=`https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_HYGRAPH_URL}/master`
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
        youtubeUrl
      }
    }
    free
    description
    sourceCode
    totalChapter
    name
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

export default {getallCourseList, getallbanner}