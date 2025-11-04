'use client'
import {useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter()
  const { user,isLoaded } = useUser()
  useEffect(() => {
    if (user) {
      router.push('/dashborad')
    }
    else {
      isLoaded&&router.push('/course') 
    }
  },[user])
  return (
   <div>
    
      
   </div>
  );
}
