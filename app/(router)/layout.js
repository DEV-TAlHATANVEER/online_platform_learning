import React from 'react'
import Sidenav from './_component/Sidenav'
import Header from './_component/Header'

export default function layout({children}) {
  return (
    
   
    <div>
       <div className='sm:w-64 fixed  hidden sm:block'>
      <Sidenav />
      
      </div>

      <div className='sm:ml-64'> 
        <Header />
        
        {children}

      </div>
    </div>

   
  )
}
