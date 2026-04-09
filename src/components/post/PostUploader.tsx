'use client'

/**
 * PostUploader Component
 * Text-only post creation with GlassCard styling
 * Allows users to create posts and saves to Supabase
 * @module components/post/PostUploader
 */

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'

/**
 * PostUploader - Text input form for creating new posts
 * Features loading state and automatic refresh after posting
 * @function PostUploader
 * @returns {JSX.Element} Post creation form
 */
export default function PostUploader() {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() || isLoading) return

    setIsLoading(true)

    const { error } = await supabase
      .from('posts')
      .insert({ 
        title: content.substring(0, 50),
        content: content,
        user_id: 'anonymous'
      })

    if (!error) {
      setContent('')
      window.location.reload()
    } else {
      console.error('Error creating post:', error)
    }

    setIsLoading(false)
  }

  return (
    <GlassCard className="p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Share something with the community..."
          className="w-full h-24 p-4 bg-white/30 border border-[#4e3b4b]/20 rounded-xl text-[#4e3b4b] placeholder-[#4e3b4b]/50 focus:outline-none focus:border-[#8c64b4] resize-none"
          disabled={isLoading}
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={!content.trim() || isLoading}
            className={`pastel-btn ${(!content.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Posting...' : '📤 Post'}
          </button>
        </div>
      </form>
    </GlassCard>
  )
}