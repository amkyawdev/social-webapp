/**
 * Posts Page Component
 * Server-side rendered page that fetches posts from JSONL file
 * Implements the Pastel Glassmorphism design system with GlassCard components
 * @module app/posts/page
 */

import GlassCard from '@/components/ui/GlassCard'
import { getPosts, getUsers } from '@/lib/data'
import PostUploader from '@/components/post/PostUploader'

/**
 * PostsPage - Main page displaying community posts from JSONL
 * @async
 * @function PostsPage
 * @returns {Promise<JSX.Element>} Posts page with list
 */
export default async function PostsPage() {
  const posts = getPosts()
  const users = getUsers()

  // Map user_id to username
  const getUsername = (userId: string) => {
    const user = users.find(u => u.id === userId)
    return user?.username || 'Unknown'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#4e3b4b] mb-2">
              📝 Posts
            </h1>
            <p className="text-[#4e3b4b]/70">
              Share your thoughts with the community
            </p>
          </div>

          {/* Post Uploader */}
          <PostUploader />

          {/* Post Feed */}
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
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] flex items-center justify-center text-xl font-bold text-[#4e3b4b] flex-shrink-0">
                      {getUsername(post.user_id).charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#4e3b4b]">
                          {getUsername(post.user_id)}
                        </span>
                        <span className="text-[#4e3b4b]/50 text-sm">
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#4e3b4b] mb-2">
                        {post.title}
                      </h3>
                      <p className="text-[#4e3b4b]/80">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <GlassCard className="p-4">
              <h3 className="text-lg font-bold text-[#4e3b4b] mb-4">👥 Friends</h3>
              {users.length === 0 ? (
                <p className="text-[#4e3b4b]/50 text-sm text-center py-4">No users yet</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-2">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] flex items-center justify-center text-lg font-bold text-[#4e3b4b]">
                          {user.username?.charAt(0)}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          user.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#4e3b4b]">{user.username}</p>
                        <p className="text-xs text-[#4e3b4b]/60">{user.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}