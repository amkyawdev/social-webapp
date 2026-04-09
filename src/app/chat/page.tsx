'use client'

/**
 * Chat Page Component
 * Simple chat interface with local state
 * @module app/chat/page
 */

import { useState, useEffect, useRef } from 'react'
import GlassCard from '@/components/ui/GlassCard'

interface Message {
  id: number
  content: string
  sender: string
  isMe: boolean
  created_at: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([
      { id: 1, content: 'Hello everyone! 👋', sender: 'KyawKyaw', isMe: false, created_at: '10:00 AM' },
      { id: 2, content: 'Hi! Love the design! 🎨', sender: 'MoeMoe', isMe: false, created_at: '10:01 AM' },
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMessage.trim()) return

    const msg: Message = {
      id: Date.now(),
      content: newMessage,
      sender: 'You',
      isMe: true,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, msg])
    setNewMessage('')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-[#4e3b4b] mb-1">💬 Chat</h1>
        <p className="text-[#4e3b4b]/70">Chat with your friends</p>
      </div>

      <GlassCard className="h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-2xl ${msg.isMe ? 'bg-[var(--pastel-pink)]' : 'bg-[var(--pastel-lavender)]'} text-[#4e3b4b]`}>
                {!msg.isMe && <p className="text-xs font-bold mb-1">{msg.sender}</p>}
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs text-[#4e3b4b]/50 mt-1">{msg.created_at}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t border-[#4e3b4b]/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/50 border border-[#4e3b4b]/20 text-[#4e3b4b]"
            />
            <button type="submit" className="pastel-btn px-6">Send</button>
          </div>
        </form>
      </GlassCard>
    </div>
  )
}