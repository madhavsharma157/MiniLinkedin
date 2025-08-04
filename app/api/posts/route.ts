import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getSession } from "@/lib/session"

export async function GET() {
  try {
    const posts = db.posts.findAll()
    const users = db.users.findAll()

    // Join posts with user data
    const postsWithAuthors = posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId)
      return {
        ...post,
        author: author ? { id: author.id, name: author.name, email: author.email } : null,
      }
    })

    return NextResponse.json(postsWithAuthors)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content } = await request.json()

    if (!content || content.trim().length === 0) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const post = db.posts.create({
      authorId: user.id,
      content: content.trim(),
    })

    return NextResponse.json({
      ...post,
      author: { id: user.id, name: user.name, email: user.email },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
