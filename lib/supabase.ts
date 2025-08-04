import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are available
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Create a mock client for when Supabase is not configured
const createMockClient = () => ({
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: new Error("Supabase not configured") }),
    signUp: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
    signInWithPassword: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
    signOut: () => Promise.resolve({ error: new Error("Supabase not configured") }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({ single: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }) }),
    }),
    insert: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }),
    update: () => ({ eq: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }) }),
    delete: () => ({ eq: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }) }),
    order: () => Promise.resolve({ data: [], error: new Error("Supabase not configured") }),
  }),
})

// Export either the real client or mock client
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : (createMockClient() as any)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string
          bio: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          bio?: string
          avatar_url?: string | null
        }
        Update: {
          name?: string
          bio?: string
          avatar_url?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          author_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
        }
        Update: {
          content?: string
        }
      }
    }
  }
}
