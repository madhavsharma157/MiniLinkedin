"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PostCard } from "@/components/post-card"
import { Edit, Mail, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      checkCurrentUser()
      fetchProfile()
    }
  }, [params.id])

  const checkCurrentUser = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        setCurrentUser(data.user)
      }
    } catch (error) {
      console.error("Error checking current user:", error)
    }
  }

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProfile(data.user)
        setPosts(data.posts)
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      router.push("/")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">The profile you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    )
  }

  const isOwnProfile = currentUser?.id === profile.id

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl">{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h1>

                  <div className="flex items-center justify-center text-gray-600 mb-2">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{profile.email}</span>
                  </div>

                  <div className="flex items-center justify-center text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Joined {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
                    </span>
                  </div>

                  {profile.bio && <p className="text-gray-700 text-sm mb-4 text-left">{profile.bio}</p>}

                  {isOwnProfile && (
                    <Link href="/profile/edit">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Posts */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {isOwnProfile ? "Your Posts" : `${profile.name}'s Posts`}
              </h2>
              <p className="text-gray-600">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </p>
            </div>

            {posts.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      {isOwnProfile ? "You haven't posted anything yet." : "No posts yet."}
                    </p>
                    {isOwnProfile && (
                      <Link href="/create-post">
                        <Button>Create Your First Post</Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
