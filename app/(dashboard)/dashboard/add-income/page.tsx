"use client"

import { SessionProvider } from "next-auth/react";
import Income from "@/components/Income";

export default function AddIncomePage() {
  

  return (
    <>
    <SessionProvider>
      <Income/>
    </SessionProvider>
    
    </>
  )
  
}

