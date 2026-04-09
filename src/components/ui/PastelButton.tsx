'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PastelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function PastelButton({ 
  children, 
  variant = 'primary',
  className = '',
  ...props 
}: PastelButtonProps) {
  return (
    <button 
      className={`pastel-btn ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}