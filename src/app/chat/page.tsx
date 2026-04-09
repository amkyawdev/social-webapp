'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'

interface Message {
  id: number
  content: string
  sender_id: string
  created_at: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    // Fetch initial messages
    async function fetchMessages() {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50)
      
      if (data) {
        setMessages(data as Message[])
      }
    }

    fetchMessages()

    // Subscribe to real-time updates
    const channel = supabase
      .channel('chat-messages')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED')
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim()) return

    const { error } = await supabase
      .from('messages')
      .insert({ 
        content: newMessage,
        sender_id: 'anonymous'
      })

    if (!error) {
      setNewMessage('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#4e3b4b] mb-1">
            💬 Chat
          </h1>
          <p className="text-[#4e3b4b]/70">
            Real-time messaging powered by Supabase
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${
          isConnected 
            ? 'bg-green-200 text-green-800' 
            : 'bg-yellow-200 text-yellow-800'
        }`}>
          {isConnected ? '🟢 Connected' : '🟡 Connecting...'}
        </div>
      </div>

      <GlassCard className="h-[500px] flex flex-col">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-[#4e3b4b]/50 py-8">
              <div className="text-4xl mb-2">💭</div>
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.sender_id === 'anonymous' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.sender_id === 'anonymous'
                    ? 'bg-[var(--pastel-pink)] text-[#4e3b4b]'
                    : 'bg-[var(--pastel-lavender)] text-[#4e3b4b]'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-[#4e3b4b]/50 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={sendMessage} className="p-4 border-t border-[#4e3b4b]/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-[#4e3b4b]/20 text-[#4e3b4b] placeholder-[#4e3b4b]/50 focus:outline-none focus:border-[#8c64b4]"
            />
            <button 
              type="submit"
              className="pastel-btn px-6"
            >
              Send
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  )
}