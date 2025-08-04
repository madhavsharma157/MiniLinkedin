import { db } from "./db"

export interface AuthResult {
  success: boolean
  user?: any
  session?: any
  error?: string
}

export async function signUp(email: string, password: string, name: string): Promise<AuthResult> {
  try {
    // Check if user already exists
    const existingUser = db.users.findByEmail(email)
    if (existingUser) {
      return { success: false, error: "User with this email already exists" }
    }

    // Create new user
    const user = db.users.create({
      email,
      password, // In production, hash this password
      name,
      bio: "",
    })

    // Create session
    const session = db.sessions.create(user.id)

    return {
      success: true,
      user: { ...user, password: undefined }, // Don't return password
      session,
    }
  } catch (error) {
    return { success: false, error: "Failed to create account" }
  }
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    // Find user
    const user = db.users.findByEmail(email)
    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    // Check password (in production, compare hashed passwords)
    if (user.password !== password) {
      return { success: false, error: "Invalid email or password" }
    }

    // Create session
    const session = db.sessions.create(user.id)

    return {
      success: true,
      user: { ...user, password: undefined }, // Don't return password
      session,
    }
  } catch (error) {
    return { success: false, error: "Failed to sign in" }
  }
}

export async function signOut(sessionId: string): Promise<{ success: boolean }> {
  try {
    db.sessions.delete(sessionId)
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function getCurrentUser(sessionId: string) {
  try {
    const session = db.sessions.findById(sessionId)
    if (!session) return null

    const user = db.users.findById(session.userId)
    if (!user) return null

    return { ...user, password: undefined } // Don't return password
  } catch (error) {
    return null
  }
}
