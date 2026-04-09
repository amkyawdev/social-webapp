'use client'

/**
 * Auth Context
 * Provides Supabase authentication state to the entire app
 * @module context/AuthContext
 */

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

/**
 * Auth context value type
 * @interface AuthContextType
 * @property {User | null} user - Current logged in user
 * @property {boolean} loading - Loading state
 * @property {boolean} isAuthenticated - Whether user is logged in
 */

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
})

/**
 * AuthProvider - Wraps app to provide auth state
 * @function AuthProvider
 * @param {ReactNode} children - Child components
 * @returns {JSX.Element} Auth context provider
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth hook to access auth context
 * @function useAuth
 * @returns {AuthContextType} Auth context value
 */
export function useAuth() {
  return useContext(AuthContext)
}