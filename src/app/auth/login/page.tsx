'use client'

import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'
import PastelButton from '@/components/ui/PastelButton'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('Logged in:', userCredential.user.email)
      
      // Create profile if not exists
      await ensureProfile(userCredential.user.uid, userCredential.user.email || undefined)
      
      router.push('/')
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'Invalid login credentials')
      setLoading(false)
    }
  }

  async function ensureProfile(uid: string, email?: string) {
    // Check if profile exists
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .single()

    if (!data) {
      // Create profile
      await supabase.from('profiles').insert({
        id: uid,
        username: email?.split('@')[0] || 'User',
        status: 'active'
      })
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <GlassCard className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4e3b4b] mb-2">
            🔐 Login
          </h1>
          <p className="text-[#4e3b4b]/70">
            Welcome back! Please sign in.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-[#4e3b4b] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#4e3b4b]/20 text-[#4e3b4b] focus:outline-none focus:border-[#8c64b4]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4e3b4b] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#4e3b4b]/20 text-[#4e3b4b] focus:outline-none focus:border-[#8c64b4]"
              required
            />
          </div>

          <PastelButton 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </PastelButton>
        </form>

        <p className="text-center mt-6 text-[#4e3b4b]/70">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-[#8c64b4] font-medium">
            Sign Up
          </a>
        </p>
      </GlassCard>
    </div>
  )
}