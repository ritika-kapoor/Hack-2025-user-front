"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

const handleLogin = async () => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 👈 THIS IS IMPORTANT
    body: JSON.stringify({ email, password }),
  })

  if (res.ok) {
    router.push("/user")
  } else {
    setError("Invalid credentials")
  }
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access your account.</p>
        </div>
        <div className="mt-6 space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleLogin} className="w-full">Login</Button>
          <div className="text-center text-sm">
            Don’t have an account? <Link className="text-blue-500" href="/auth/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
