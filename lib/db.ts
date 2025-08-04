// Simple in-memory database for demo purposes
// In production, you'd use a real database like PostgreSQL, MongoDB, etc.

export interface User {
  id: string
  email: string
  password: string // In production, this would be hashed
  name: string
  bio: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  authorId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface UserSession {
  id: string
  userId: string
  expiresAt: Date
}

// In-memory storage (resets on server restart)
const users: User[] = [
  {
    id: "demo-user-1",
    email: "demo@example.com",
    password: "demo123", // In production, this would be hashed
    name: "Demo User",
    bio: "Welcome to MiniLinkedIn! This is a demo account to showcase the platform.",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "demo-user-2",
    email: "john@example.com",
    password: "john123",
    name: "John Smith",
    bio: "Software Engineer passionate about building great products and connecting with fellow developers.",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
]

const posts: Post[] = [
  {
    id: "post-1",
    authorId: "demo-user-1",
    content:
      "Welcome to MiniLinkedIn! 🎉 This is a demo platform showcasing a LinkedIn-like community experience. Feel free to create posts, explore profiles, and connect with others!",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    updatedAt: new Date("2024-01-01T10:00:00Z"),
  },
  {
    id: "post-2",
    authorId: "demo-user-2",
    content:
      "Just joined this amazing community! Looking forward to connecting with fellow professionals and sharing insights about software development. What's everyone working on? 💻",
    createdAt: new Date("2024-01-02T14:30:00Z"),
    updatedAt: new Date("2024-01-02T14:30:00Z"),
  },
  {
    id: "post-3",
    authorId: "demo-user-1",
    content:
      "Pro tip: Building a strong professional network isn't just about collecting connections - it's about creating meaningful relationships and providing value to others. Quality over quantity! 🤝",
    createdAt: new Date("2024-01-03T09:15:00Z"),
    updatedAt: new Date("2024-01-03T09:15:00Z"),
  },
]

let sessions: UserSession[] = []

// Helper functions
export const db = {
  // Users
  users: {
    findAll: () => users,
    findById: (id: string) => users.find((user) => user.id === id),
    findByEmail: (email: string) => users.find((user) => user.email === email),
    create: (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => {
      const user: User = {
        ...userData,
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      users.push(user)
      return user
    },
    update: (id: string, updates: Partial<Omit<User, "id" | "createdAt">>) => {
      const userIndex = users.findIndex((user) => user.id === id)
      if (userIndex === -1) return null

      users[userIndex] = {
        ...users[userIndex],
        ...updates,
        updatedAt: new Date(),
      }
      return users[userIndex]
    },
  },

  // Posts
  posts: {
    findAll: () => posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    findById: (id: string) => posts.find((post) => post.id === id),
    findByAuthorId: (authorId: string) =>
      posts.filter((post) => post.authorId === authorId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    create: (postData: Omit<Post, "id" | "createdAt" | "updatedAt">) => {
      const post: Post = {
        ...postData,
        id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      posts.push(post)
      return post
    },
    update: (id: string, updates: Partial<Omit<Post, "id" | "authorId" | "createdAt">>) => {
      const postIndex = posts.findIndex((post) => post.id === id)
      if (postIndex === -1) return null

      posts[postIndex] = {
        ...posts[postIndex],
        ...updates,
        updatedAt: new Date(),
      }
      return posts[postIndex]
    },
    delete: (id: string) => {
      const postIndex = posts.findIndex((post) => post.id === id)
      if (postIndex === -1) return false

      posts.splice(postIndex, 1)
      return true
    },
  },

  // Sessions
  sessions: {
    create: (userId: string) => {
      const session: UserSession = {
        id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
      sessions.push(session)
      return session
    },
    findById: (id: string) => {
      const session = sessions.find((s) => s.id === id && s.expiresAt > new Date())
      return session
    },
    delete: (id: string) => {
      const sessionIndex = sessions.findIndex((s) => s.id === id)
      if (sessionIndex === -1) return false

      sessions.splice(sessionIndex, 1)
      return true
    },
    cleanup: () => {
      sessions = sessions.filter((s) => s.expiresAt > new Date())
    },
  },
}

// Cleanup expired sessions periodically
setInterval(
  () => {
    db.sessions.cleanup()
  },
  60 * 60 * 1000,
) // Every hour
