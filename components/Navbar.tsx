import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="font-bold text-xl">
          ExpenseTracker
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" asChild className="hidden md:flex">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild className="hidden md:flex">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                <Link href="/signin" className="block px-2 py-1 text-lg">
                  Sign In
                </Link>
                <Link href="/signup" className="block px-2 py-1 text-lg">
                  Sign Up
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

