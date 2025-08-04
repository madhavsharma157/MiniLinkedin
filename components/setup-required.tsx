"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, RefreshCw, ExternalLink } from "lucide-react"
import Link from "next/link"

export function SetupRequired() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Setup Required</CardTitle>
          <CardDescription>Configure your MiniLinkedIn application with Supabase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Environment Variables Missing:</strong> Your application needs Supabase credentials to function
              properly.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Quick Setup Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Create a free Supabase project at{" "}
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  supabase.com <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>Get your Project URL and API key from Settings → API</li>
              <li>
                Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file in your project root
              </li>
              <li>Add your credentials and restart the development server</li>
            </ol>
          </div>

          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Add this to your .env.local file:</p>
            <pre className="text-sm">
              {`NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here`}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/setup">
              <Button className="w-full sm:w-auto">View Detailed Setup Guide</Button>
            </Link>
            <Button variant="outline" onClick={() => window.location.reload()} className="w-full sm:w-auto">
              <RefreshCw className="h-4 w-4 mr-2" />
              Check Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
