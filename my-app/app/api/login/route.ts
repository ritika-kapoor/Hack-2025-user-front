import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const dummyUser = {
  email: "test@example.com",
  password: "123456",
}

const JWT_SECRET = "your_dummy_secret"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  if (email === dummyUser.email && password === dummyUser.password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" })

    const response = NextResponse.json({ message: "Login successful" })
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1 hour
       sameSite: "lax",
    })

    return response
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
}
