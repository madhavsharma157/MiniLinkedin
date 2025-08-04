"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, UserIcon, Home, Plus } from "lucide-react"

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/auth/login")
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600">
              MiniLinkedIn
            </Link>

            {user && (
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link href="/create-post" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <Plus className="h-4 w-4" />
                  <span>Post</span>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <>
                <Link
                  href={`/profile/${user.id}`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <UserIcon className="h-4 w-4" />
                  <span>{user.name}</span>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
