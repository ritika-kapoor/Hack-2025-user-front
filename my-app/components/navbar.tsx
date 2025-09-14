"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Hide navbar on home, camera, and loading pages
  const shouldHideNavbar = () => {
    // Check if we're on the main homepage
    if (pathname === '/') {
      return true
    }
    // Check if we're on the user home page (which handles camera and loading states)
    if (pathname === '/user') {
      return true
    }
    return false
  }

  if (shouldHideNavbar()) {
    return null
  }

  if (pathname === '/auth/login') {
    return null
  }

  if (pathname === '/auth/register') {
    return null
  }

  return (
    <nav className="fixed left-0 right-0 bottom-0 w-[390px] mx-auto bg-stone-100 border-t z-50">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/user"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/user") && !isActive("/user/recipes") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <span><img src="/images/not-clicked-home.svg" alt="home" className="h-5 w-5" /></span>
          <span className="text-xs mt-1">ホーム</span>
        </Link>

        <Link
          href="/user/recipes"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/user/recipes") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {isActive("/user/recipes") && !isActive("/user/recipes/store-recipes") ? <span><img src="/images/clicked-recipe.svg" alt="clicked-recipe" className="h-5 w-5" /></span>: <span><img src="/images/not-clicked-recipe.svg" alt="recipe" className="h-5 w-5" /></span>}
          <span className="text-xs mt-1">レシピ</span>
        </Link>

        <Link
          href="/user/recipes/store-recipes"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/user/recipes/store-recipes") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {isActive("/user/recipes/store-recipes") ? <span><img src="/images/clicked-store.svg" alt="clicked-store" className="h-5 w-5" /></span> : <span><img src="/images/not-clicked-bookmark.svg" alt="store" className="h-5 w-5" /></span>}
          <span className="text-xs mt-1">保存リスト</span>
        </Link>

        <Link
          href="/user/profile"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/user/profile") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {isActive("/user/profile") ? <span><img src="/images/clicked-mypage.svg" alt="clicked-mypage" className="h-5 w-5" /></span> : <span><img src="/images/not-clicked-profile.svg" alt="profile" className="h-5 w-5" /></span>}
          <span className="text-xs mt-1">マイページ</span>
        </Link>
      </div>
    </nav>
  )
}
