import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'

interface Post {
  id: number
  title: string
  content: string
  created_at: string
  user_id: string
}

async function getPosts() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  return data as Post[] || []
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#4e3b4b] mb-2">
          📝 Posts
        </h1>
        <p className="text-[#4e3b4b]/70">
          Browse the latest posts from the community
        </p>
      </div>

      {posts.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <div className="text-4xl mb-4">🌸</div>
          <h2 className="text-2xl font-bold text-[#4e3b4b] mb-2">
            No posts yet
          </h2>
          <p className="text-[#4e3b4b]/70">
            Be the first to create a post!
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-4 stagger-children">
          {posts.map((post) => (
            <GlassCard key={post.id} className="p-6">
              <h3 className="text-xl font-bold text-[#4e3b4b] mb-2">
                {post.title}
              </h3>
              <p className="text-[#4e3b4b]/80 mb-3">
                {post.content}
              </p>
              <div className="text-sm text-[#4e3b4b]/50">
                Posted • {new Date(post.created_at).toLocaleDateString()}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}