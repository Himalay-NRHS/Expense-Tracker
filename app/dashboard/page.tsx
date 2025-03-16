import { Navbar } from "@/components/Navbar"
import { Dashboard } from "@/components/Dashboard"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Dashboard />
    </div>
  )
}

