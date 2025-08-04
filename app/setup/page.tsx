"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function SetupPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const envTemplate = `NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here`

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup MiniLinkedIn</h1>
          <p className="text-lg text-gray-600">Follow these steps to configure your application with Supabase</p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Create Supabase Project */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                Create a Supabase Project
              </CardTitle>
              <CardDescription>Set up your backend database and authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>
                  Go to{" "}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    supabase.com <ExternalLink className="h-3 w-3" />
                  </a>{" "}
                  and create a free account
                </li>
                <li>Click "New Project" and fill in your project details</li>
                <li>Wait for your database to be created (usually takes 1-2 minutes)</li>
                <li>Go to Settings → API to find your project credentials</li>
              </ol>
            </CardContent>
          </Card>

          {/* Step 2: Get API Keys */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                Get Your API Keys
              </CardTitle>
              <CardDescription>Copy your project URL and anonymous key</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                In your Supabase project dashboard, go to <strong>Settings → API</strong> and copy:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>
                  <strong>Project URL</strong> - This will be your NEXT_PUBLIC_SUPABASE_URL
                </li>
                <li>
                  <strong>anon public key</strong> - This will be your NEXT_PUBLIC_SUPABASE_ANON_KEY
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Step 3: Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                Set Environment Variables
              </CardTitle>
              <CardDescription>Create a .env.local file in your project root</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Create a file named <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> in your project
                root directory and add:
              </p>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">{envTemplate}</pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 bg-gray-800 border-gray-600 text-gray-100 hover:bg-gray-700"
                  onClick={() => copyToClipboard(envTemplate, "env")}
                >
                  {copied === "env" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Alert>
                <AlertDescription>
                  Replace <code>your_supabase_project_url_here</code> and <code>your_supabase_anon_key_here</code> with
                  your actual Supabase credentials.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 4: Database Setup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  4
                </span>
                Set Up Database Tables
              </CardTitle>
              <CardDescription>Run SQL scripts to create the required tables</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                In your Supabase project dashboard, go to <strong>SQL Editor</strong> and run these scripts:
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">1. Create Tables (01-create-tables.sql)</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    This script creates the profiles and posts tables with proper security policies.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">2. Create Functions (02-create-functions.sql)</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    This script creates the function to automatically create user profiles on signup.
                  </p>
                </div>
              </div>
              <Alert>
                <AlertDescription>
                  You can find these SQL scripts in the <code>scripts/</code> folder of your project. Copy and paste
                  them into the Supabase SQL Editor and click "Run".
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Step 5: Restart Development Server */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  5
                </span>
                Restart Your Development Server
              </CardTitle>
              <CardDescription>Apply the environment variable changes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">After setting up your environment variables:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4">
                <li>Stop your development server (Ctrl+C)</li>
                <li>
                  Run <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code> again
                </li>
                <li>Navigate to the home page to test the application</li>
              </ol>
            </CardContent>
          </Card>

          <div className="text-center">
            <Alert className="max-w-2xl mx-auto">
              <AlertDescription>
                <strong>Need help?</strong> Check the README.md file for detailed setup instructions, or create an issue
                on GitHub if you encounter any problems.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}
