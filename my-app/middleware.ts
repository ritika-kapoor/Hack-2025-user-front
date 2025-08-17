import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = "your_dummy_secret" // TODO: process.env.NEXT_PUBLIC_...? (actually server env)
const JWT_COOKIE_NAME = "token"

export function middleware(req: NextRequest) {
  console.log("🔍 Middleware triggered")

  const token = req.cookies.get(JWT_COOKIE_NAME)?.value
  if (!token) {
    console.log("🔒 No token cookie, redirecting to login")
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  try {
    // Verify signature & expiry
    jwt.verify(token, JWT_SECRET)
    console.log("✅ Token valid")
    return NextResponse.next()
  } catch (err) {
    console.error("❌ Invalid/expired token:", err)
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }
}

// Apply to /user and any nested routes under it
export const config = {
  matcher: ["/user/"],
}
