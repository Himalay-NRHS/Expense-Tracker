import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="font-bold text-xl">
          ExpenseTracker
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/signin">Logout</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
