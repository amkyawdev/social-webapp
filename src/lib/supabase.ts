/**
 * Supabase Client Configuration
 * Handles browser-side Supabase client creation for authentication and database operations
 * @module lib/supabase
 */

import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates and returns a browser-based Supabase client instance
 * Uses environment variables for URL and anon key configuration
 * @returns {import('@supabase/supabase-js').SupabaseClient} Configured Supabase client
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )
}