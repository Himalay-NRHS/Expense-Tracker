"use client"


import { SessionProvider } from "next-auth/react";
import Expense from "@/components/Expense";

export default function AddExpensePage() {
 

  return (
   <>
   <SessionProvider>
    <Expense/>
   </SessionProvider>
 
   </>
  )
}

