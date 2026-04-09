import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Auth Middleware
 * Protects routes by redirecting unauthenticated users to login
 * @module middleware
 */

export async function middleware(request: NextRequest) {
  // Public routes that don't require auth
  const publicPaths = ['/auth/login', '/auth/signup', '/_next', '/favicon', '/public']
  
  const path = request.nextUrl.pathname
  
  // Allow public paths
  if (publicPaths.some(p => path.startsWith(p))) {
    return NextResponse.next()
  }

  // Check for auth token in cookies
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        const response = NextResponse.next()
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
        return response
      },
    },
  })

  const { data: { session } } = await supabase.auth.getSession()

  // Redirect to login if not authenticated
  if (!session) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}