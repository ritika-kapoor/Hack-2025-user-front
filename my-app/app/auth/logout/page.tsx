import { NextResponse } from "next/server"

const JWT_COOKIE_NAME = "token"

export async function POST() {
  // Clear cookie by setting empty value + immediate expiry.
  const res = NextResponse.json({ message: "Logged out" })
  res.cookies.set({
    name: JWT_COOKIE_NAME,
    value: "",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0, // expire now
  })
  return res
}
