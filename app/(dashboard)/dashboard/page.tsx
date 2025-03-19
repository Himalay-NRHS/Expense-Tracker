import { Navbar } from "@/components/Navbar"
import { Dashboard } from "@/components/Dashboard"
import { SessionProvider } from "next-auth/react"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Dashboard />
    </div>
  )
}

