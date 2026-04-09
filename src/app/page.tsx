import GlassCard from '@/components/ui/GlassCard'
import Link from 'next/link'

const features = [
  {
    title: 'Posts',
    description: 'Share and discover posts from the community',
    icon: '📝',
    href: '/posts',
    color: 'var(--pastel-peach)'
  },
  {
    title: 'Chat',
    description: 'Real-time messaging with Supabase',
    icon: '💬',
    href: '/chat',
    color: 'var(--pastel-pink)'
  },
  {
    title: 'Group',
    description: 'Connect with friends and groups',
    icon: '👥',
    href: '/group',
    color: 'var(--pastel-lavender)'
  }
]

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-[#4e3b4b] mb-4 float">
          Welcome to Social
        </h1>
        <p className="text-xl text-[#4e3b4b]/70">
          A beautiful social experience with Neo-3D design
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
        {features.map((feature) => (
          <Link key={feature.href} href={feature.href}>
            <GlassCard className="p-6 cursor-pointer text-center">
              <div 
                className="text-5xl mb-4"
                style={{ filter: 'drop-shadow(0 4px 8px var(--pink-shadow))' }}
              >
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold text-[#4e3b4b] mb-2">
                {feature.title}
              </h2>
              <p className="text-[#4e3b4b]/70">
                {feature.description}
              </p>
            </GlassCard>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <GlassCard className="inline-block p-8">
          <h3 className="text-2xl font-bold text-[#4e3b4b] mb-4">
            🚀 Get Started
          </h3>
          <p className="text-[#4e3b4b]/70 mb-4">
            Explore the app features and connect with others!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/posts" className="pastel-btn">
              Browse Posts
            </Link>
            <Link href="/chat" className="pastel-btn">
              Start Chatting
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}