import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import ThreeLoader from '@/components/ui/ThreeLoader'

export const metadata: Metadata = {
  title: 'Social App - Pastel Glassmorphism',
  description: 'A beautiful social webapp with Neo-3D design',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThreeLoader />
        <Navbar />
        <main className="min-h-screen pt-20 px-4 pb-8">
          <div className="page-transition">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}