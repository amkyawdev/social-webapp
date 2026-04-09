'use client'

/**
 * GroupCreator Component
 * Modal/form for creating new groups with GlassCard styling
 * @module components/group/GroupCreator
 */

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'

const EMOJI_OPTIONS = ['👨‍👩‍👧‍👦', '🎮', '📚', '💼', '🎨', '🎵', '🏃', '🍕', '🌍', '❤️']

/**
 * GroupCreator - Form modal for creating new groups
 * Creates group in 'groups' table and adds creator as admin in 'group_members'
 * @function GroupCreator
 * @param {() => void} onClose - Callback to close modal
 * @param {() => void} onSuccess - Callback on successful creation
 * @returns {JSX.Element} Group creation form
 */
interface GroupCreatorProps {
  onClose: () => void
  onSuccess: () => void
}

export default function GroupCreator({ onClose, onSuccess }: GroupCreatorProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [iconEmoji, setIconEmoji] = useState('👨‍👩‍👧‍👦')
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || isLoading) return

    setIsLoading(true)

    // Create the group
    const { data: groupData, error: groupError } = await supabase
      .from('groups')
      .insert({ 
        name: name,
        description: description,
        icon_emoji: iconEmoji
      })
      .select()
      .single()

    if (groupError) {
      console.error('Error creating group:', groupError)
      setIsLoading(false)
      return
    }

    // Add creator as admin in group_members
    if (groupData) {
      await supabase
        .from('group_members')
        .insert({
          group_id: groupData.id,
          user_id: 'anonymous',
          role: 'admin'
        })
    }

    setIsLoading(false)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <GlassCard className="w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full"
        >
          <svg className="w-5 h-5 text-[#4e3b4b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-[#4e3b4b] mb-6">➕ Create Group</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#4e3b4b] font-medium mb-2">Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter group name..."
              className="w-full px-4 py-3 bg-white/30 border border-[#4e3b4b]/20 rounded-xl text-[#4e3b4b] placeholder-[#4e3b4b]/50 focus:outline-none focus:border-[#8c64b4]"
              required
            />
          </div>

          <div>
            <label className="block text-[#4e3b4b] font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this group about?"
              className="w-full h-20 p-4 bg-white/30 border border-[#4e3b4b]/20 rounded-xl text-[#4e3b4b] placeholder-[#4e3b4b]/50 focus:outline-none focus:border-[#8c64b4] resize-none"
            />
          </div>

          <div>
            <label className="block text-[#4e3b4b] font-medium mb-2">Choose Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIconEmoji(emoji)}
                  className={`w-12 h-12 rounded-xl text-2xl transition-all ${
                    iconEmoji === emoji 
                      ? 'bg-[var(--pastel-pink)] scale-110' 
                      : 'bg-white/30 hover:scale-105'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || isLoading}
            className={`pastel-btn w-full mt-6 ${(!name.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Creating...' : '✨ Create Group'}
          </button>
        </form>
      </GlassCard>
    </div>
  )
}