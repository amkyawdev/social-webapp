'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * PastelButton Props
 * @interface PastelButtonProps
 * @extends ButtonHTMLAttributes<HTMLButtonElement>
 * @property {ReactNode} children - Button label/content
 * @property {'primary' | 'secondary'} [variant] - Button style variant
 */

/**
 * PastelButton - A styled button component matching the Pastel Glassmorphism design
 * Features gradient background with shadow and hover animations
 * @param {PastelButtonProps} props - Button properties including children and variant
 * @returns {JSX.Element} Styled pastel button element
 */
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