import { cookies } from "next/headers"
import { getCurrentUser } from "./auth"

export async function getSession() {
  const cookieStore = cookies()
  const sessionId = cookieStore.get("session")?.value

  if (!sessionId) return null

  return await getCurrentUser(sessionId)
}

export function setSessionCookie(sessionId: string) {
  const cookieStore = cookies()
  cookieStore.set("session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

export function clearSessionCookie() {
  const cookieStore = cookies()
  cookieStore.delete("session")
}
