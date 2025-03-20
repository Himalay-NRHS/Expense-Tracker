import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession , signIn ,signOut } from "next-auth/react"
export function Navbar() {
  const {data: session,status} = useSession();
  
  if(session || status=="loading" ){
    return (

    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="font-bold text-xl">
          ExpenseTracker
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" asChild onClick={(()=>signOut())}>
           Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}
else{
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/dashboard" className="font-bold text-xl">
          ExpenseTracker 
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" asChild onClick={() => signIn()}>

          SignIn
          </Button>
        </div>
      </div>
    </nav>
  )
}
}
