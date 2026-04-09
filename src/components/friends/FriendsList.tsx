'use client'

/**
 * FriendsList Component
 * Displays user profiles with real-time status from Supabase
 * @module components/friends/FriendsList
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'

/**
 * Profile data interface
 * @interface Profile
 * @property {string} id - Unique user identifier
 * @property {string} username - User's display name
 * @property {string} status - User status (active/busy/offline)
 * @property {string} avatar_url - Avatar image URL
 */

/**
 * FriendsList - Shows all registered users as potential friends
 * Uses Supabase real-time for live status updates
 * @function FriendsList
 * @returns {JSX.Element} Friends list with status indicators
 */
export default function FriendsList() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Fetch initial profiles
    async function fetchProfiles() {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('username', { ascending: true })
      
      if (data) setProfiles(data)
    }

    fetchProfiles()

    // Subscribe to real-time updates
    const channel = supabase
      .channel('profiles-status')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles' },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setProfiles(prev => prev.map(p => 
              p.id === payload.new.id ? { ...p, ...payload.new } : p
            ))
          } else if (payload.eventType === 'INSERT') {
            setProfiles(prev => [...prev, payload.new])
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  function getStatusColor(status: string) {
    switch (status) {
      case 'active': return 'bg-green-400'
      case 'busy': return 'bg-red-400'
      default: return 'bg-gray-400'
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case 'active': return 'Available'
      case 'busy': return 'Busy'
      default: return 'Offline'
    }
  }

  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#4e3b4b]">👥 Friends</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${isConnected ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
          {isConnected ? 'Live' : '...'}
        </span>
      </div>

      {profiles.length === 0 ? (
        <p className="text-[#4e3b4b]/50 text-sm text-center py-4">No users yet</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex items-center gap-3 p-2 hover:bg-white/20 rounded-xl transition-all">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] flex items-center justify-center text-lg font-bold text-[#4e3b4b]">
                  {profile.username?.charAt(0).toUpperCase() || '?'}
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(profile.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#4e3b4b] truncate">
                  {profile.username || 'Unknown'}
                </p>
                <p className="text-xs text-[#4e3b4b]/60">
                  {getStatusText(profile.status)}
                </p>
              </div>
              <Link 
                href={`/chat?user=${profile.id}`}
                className="text-sm px-3 py-1.5 bg-[var(--pastel-lavender)]/30 rounded-lg hover:bg-[var(--pastel-lavender)]/50 transition-all text-[#4e3b4b]"
              >
                💬
              </Link>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  )
}