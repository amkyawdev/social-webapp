'use client'

/**
 * Navbar Component
 * Responsive navigation bar with desktop and mobile layouts
 * Features glassmorphism design with blob FAB button for mobile menu
 * Includes authentication state
 * @module components/layout/Navbar
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import NavbarAuth from './NavbarAuth'

/**
 * Navigation item structure
 * @interface NavItem
 * @property {string} label - Display text for navigation link
 * @property {string} href - URL path for the link
 */
interface NavItem {
  label: string
  href: string
}

/**
 * Navigation configuration array
 * @constant {NavItem[]}
 */
const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Posts', href: '/posts' },
  { label: 'Chat', href: '/chat' },
  { label: 'Group', href: '/group' },
]

/**
 * Navbar - Main navigation component with responsive design
 * Desktop: Fixed glass panel with text navigation
 * Mobile: Blob FAB button that opens slide-in sidebar menu
 * Uses usePathname for active link highlighting
 * @function Navbar
 * @returns {JSX.Element} Navigation bar with desktop and mobile layouts
 */
export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Nav - visible on md and above */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 glass-panel mx-4 mt-4 px-6 py-3 items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#4e3b4b]">
          Social
        </Link>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[#4e3b4b] font-medium transition-all hover:scale-105 ${
                pathname === item.href 
                  ? 'text-[#8c64b4] font-bold' 
                  : 'opacity-80'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <NavbarAuth />
        </div>
      </nav>

      {/* Mobile FAB - visible only on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden blob-fab fixed top-4 right-4 w-14 h-14 z-50 flex items-center justify-center"
      >
        <svg 
          className="w-6 h-6 text-[#4e3b4b]" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div 
            className="absolute top-0 right-0 h-full w-72 mobile-menu-overlay slide-in py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end px-4 mb-8">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full"
              >
                <svg className="w-6 h-6 text-[#4e3b4b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col gap-4 px-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-medium text-[#4e3b4b] py-3 px-4 rounded-xl transition-all ${
                    pathname === item.href 
                      ? 'bg-white/30' 
                      : 'hover:bg-white/20'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-4 border-[#4e3b4b]/20" />
              <NavbarAuth />
            </div>
          </div>
        </div>
      )}
    </>
  )
}