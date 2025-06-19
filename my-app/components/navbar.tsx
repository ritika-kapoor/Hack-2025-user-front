"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Heart, User, Bookmark } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/user"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/user") && !isActive("/user/recipes") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/user/recipes"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/user/recipes") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1">Recipes</span>
        </Link>

        <Link
          href="/user/favorites"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/user/favorites") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Bookmark className="h-5 w-5" />
          <span className="text-xs mt-1">Grocery</span>
        </Link>

        <Link
          href="/user/profile"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/user/profile") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  )
}
