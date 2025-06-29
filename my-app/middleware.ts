import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

const secret = "your_dummy_secret"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret })

  if (!token) {
    console.log("🔒 No token, redirecting to login")
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  console.log("✅ Token found:", token)
  return NextResponse.next()
}

export const config = {
  matcher: ["/user"],
}
