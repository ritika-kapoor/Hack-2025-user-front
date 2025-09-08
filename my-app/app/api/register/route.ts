import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, name } = body

    // Simple validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      )
    }

    // In a real app, you would save this to a database
    // For now, we'll just return success
    console.log("User registration:", { email, name })

    return NextResponse.json({
      message: "Registration successful",
      data: {
        id: "1",
        email,
        name,
      }
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 