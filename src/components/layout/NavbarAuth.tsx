'use client'

/**
 * NavbarAuth Component
 * Shows Login button or user avatar/logout when authenticated
 * Uses Firebase Auth
 * @module components/layout/NavbarAuth
 */

import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

/**
 * NavbarAuth - Authentication-aware navigation element using Firebase
 * @function NavbarAuth
 * @returns {JSX.Element} Login/Logout button with user avatar
 */
export default function NavbarAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  async function handleLogout() {
    await signOut(auth)
    router.push('/auth/login')
  }

  if (loading) {
    return <div className="w-20 h-10 bg-white/20 animate-pulse rounded-xl" />
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] flex items-center justify-center text-sm font-bold text-[#4e3b4b]">
          {user.email?.charAt(0).toUpperCase() || '?'}
        </div>
        <button 
          onClick={handleLogout}
          className="text-sm text-[#4e3b4b] hover:text-[#8c64b4] transition-colors"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => router.push('/auth/login')}
      className="pastel-btn text-sm py-2 px-4"
    >
      Login
    </button>
  )
}