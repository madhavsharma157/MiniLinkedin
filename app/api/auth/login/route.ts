import { type NextRequest, NextResponse } from "next/server"
import { signIn } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const result = await signIn(email, password)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    // Set session cookie
    const response = NextResponse.json({
      user: result.user,
      message: "Signed in successfully",
    })

    response.cookies.set("session", result.session!.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
