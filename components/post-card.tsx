import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface PostCardProps {
  post: {
    id: string
    content: string
    createdAt: string
    author: {
      id: string
      name: string
      email: string
    }
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Link href={`/profile/${post.author.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
              {post.author.name}
            </Link>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </CardContent>
    </Card>
  )
}
