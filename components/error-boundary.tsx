"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, RefreshCw } from "lucide-react"
import Link from "next/link"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.message?.includes("supabaseUrl is required") ||
        event.error?.message?.includes("NEXT_PUBLIC_SUPABASE_URL")
      ) {
        setHasError(true)
        setError(event.error)
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.message?.includes("supabaseUrl is required") ||
        event.reason?.message?.includes("NEXT_PUBLIC_SUPABASE_URL")
      ) {
        setHasError(true)
        setError(event.reason)
      }
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  if (hasError || fallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Configuration Required</CardTitle>
            <CardDescription>Your application needs to be configured with Supabase credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Missing Environment Variables:</strong> The application cannot connect to Supabase because the
                required environment variables are not set.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">What you need to do:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Create a Supabase project at supabase.com</li>
                <li>Get your project URL and API key</li>
                <li>Create a .env.local file with your credentials</li>
                <li>Restart your development server</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/setup">
                <Button className="w-full sm:w-auto">View Setup Guide</Button>
              </Link>
              <Button variant="outline" onClick={() => window.location.reload()} className="w-full sm:w-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Connection
              </Button>
            </div>

            {error && (
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                  Show technical details
                </summary>
                <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-auto text-red-600">{error.message}</pre>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
