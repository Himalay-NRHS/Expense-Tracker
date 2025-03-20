import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession , signIn ,signOut } from "next-auth/react"

export function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <nav className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/dashboard" className="font-bold text-xl">
            ExpenseTracker
          </Link>
          <div className="ml-auto flex items-center space-x-4">
            <span>Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        {session ? (
        <Link href="/dashboard" className="font-bold text-xl">
          ExpenseTracker
        </Link>) :( <Link href="/" className="font-bold text-xl">
          ExpenseTracker
          </Link>)}
        <div className="ml-auto flex items-center space-x-4">
          {session ? (
            <Button variant="ghost" onClick={() => signOut()}>
              LogOut
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => signIn()}>
              SignIn
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
