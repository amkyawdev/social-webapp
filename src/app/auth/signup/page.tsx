'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'
import PastelButton from '@/components/ui/PastelButton'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    // Create profile
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        username,
        status: 'active'
      })
    }

    router.push('/auth/login')
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <GlassCard className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#4e3b4b] mb-2">
            ✨ Sign Up
          </h1>
          <p className="text-[#4e3b4b]/70">
            Create your account to get started!
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-[#4e3b4b] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#4e3b4b]/20 text-[#4e3b4b] focus:outline-none focus:border-[#8c64b4]"
              required
            />
          </div>

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
            {loading ? 'Creating account...' : 'Create Account'}
          </PastelButton>
        </form>

        <p className="text-center mt-6 text-[#4e3b4b]/70">
          Already have an account?{' '}
          <a href="/auth/login" className="text-[#8c64b4] font-medium">
            Sign In
          </a>
        </p>
      </GlassCard>
    </div>
  )
}