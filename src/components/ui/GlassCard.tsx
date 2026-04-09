'use client'

import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export default function GlassCard({ children, className = '', hoverEffect = true }: GlassCardProps) {
  return (
    <div className={`neo-card ${hoverEffect ? 'neo-3d' : ''} ${className}`}>
      {children}
    </div>
  )
}