import { type NextRequest, NextResponse } from "next/server"
import { signOut } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const sessionId = request.cookies.get("session")?.value

    if (sessionId) {
      await signOut(sessionId)
    }

    const response = NextResponse.json({ message: "Signed out successfully" })
    response.cookies.delete("session")

    return response
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
