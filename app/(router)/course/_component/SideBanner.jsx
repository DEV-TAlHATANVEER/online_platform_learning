
import React, { useEffect, useState } from 'react'
import HyperGraphql from '../../_utils/HyperGraphql'
import Image from 'next/image'

function SideBanner() {
    useEffect(() => { 
        const getallbanner = async () => {
            const getallsidebanner = await HyperGraphql.getallbanner()
            console.log(getallsidebanner?.sideBanners);
            setSideBanner(getallsidebanner?.sideBanners)
        }
        
        getallbanner()
        
    }, [])
    const [SideBanner,setSideBanner]=useState([])
  return (
    <div>
          {SideBanner?.map((banner,index) => (
              <div key={index}>
                  <Image src={banner?.banner.url} width={300} height={300} alt='side banner iamge' className='rounded-xl mt-1 mb-4' onClick={()=>window.open(banner?.url)}/>
             </div>
      ))}
    </div>
  )
}

export default SideBanner
