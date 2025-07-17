"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"

export default function LogoutButton({
  className,
  children = "Logout",
}: {
  className?: string
  children?: React.ReactNode
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    })
    // After clearing cookie, route to login
    startTransition(() => {
      router.push("/auth/login")
      // Force a revalidation in case UI cached authed data
      router.refresh()
    })
  }

  return (
    <Button
      onClick={handleLogout}
      className={className}
      disabled={isPending}
      variant="outline"
    >
      {isPending ? "Logging out..." : children}
    </Button>
  )
}
