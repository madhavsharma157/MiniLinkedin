import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = db.users.findById(params.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user's posts
    const userPosts = db.posts.findByAuthorId(params.id)
    const postsWithAuthor = userPosts.map((post) => ({
      ...post,
      author: { id: user.id, name: user.name, email: user.email },
    }))

    return NextResponse.json({
      user: { ...user, password: undefined }, // Don't return password
      posts: postsWithAuthor,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
  }
}
