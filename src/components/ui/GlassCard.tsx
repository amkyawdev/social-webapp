'use client'

import { ReactNode } from 'react'

/**
 * GlassCard Component Props
 * @interface GlassCardProps
 * @property {ReactNode} children - Content to display inside the card
 * @property {string} [className] - Additional CSS classes
 * @property {boolean} [hoverEffect] - Enable Neo-3D hover animation (default: true)
 */

/**
 * GlassCard - A glassmorphism card component with Neo-3D hover effects
 * Implements the Pastel Glassmorphism design system with translucent backgrounds
 * and perspective-based 3D transforms
 * @param {GlassCardProps} props - Component properties
 * @returns {JSX.Element} Glass-styled card with optional 3D hover effect
 */
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