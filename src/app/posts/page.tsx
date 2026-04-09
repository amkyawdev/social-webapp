/**
 * Posts Page Component
 * Server-side rendered page that fetches and displays posts from Supabase database
 * Implements the Pastel Glassmorphism design system with GlassCard components
 * Includes PostUploader for creating new posts
 * @module app/posts/page
 */

import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'
import PostUploader from '@/components/post/PostUploader'
import FriendsList from '@/components/friends/FriendsList'

/**
 * Post data interface from Supabase posts table
 * @interface Post
 * @property {number} id - Unique post identifier
 * @property {string} title - Post title
 * @property {string} content - Post body content
 * @property {string} created_at - ISO timestamp of creation
 * @property {string} user_id - Author's user ID
 */

/**
 * Fetches posts from Supabase 'posts' table with author profiles
 * Retrieves up to 20 most recent posts ordered by creation date (descending)
 * @async
 * @function getPosts
 * @returns {Promise<Post[]>} Array of post objects or empty array on error
 */
interface Post {
  id: number
  title: string
  content: string
  created_at: string
  user_id: string
  profiles?: {
    username: string
    avatar_url: string
  }
}

async function getPosts() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(username, avatar_url)')
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  return data as Post[] || []
}

/**
 * PostsPage - Main page component displaying community posts
 * Fetches posts server-side and renders using GlassCard components
 * Includes PostUploader form and FriendsList sidebar
 * Shows empty state if no posts exist in the database
 * @async
 * @function PostsPage
 * @returns {Promise<JSX.Element>} Posts page with list or empty state
 */
export default async function PostsPage() {
  const posts = await getPosts()

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
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] flex items-center justify-center text-xl font-bold text-[#4e3b4b] flex-shrink-0">
                      {post.profiles?.username?.charAt(0).toUpperCase() || post.user_id?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#4e3b4b]">
                          {post.profiles?.username || post.user_id || 'Anonymous'}
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
            <FriendsList />
          </div>
        </div>
      </div>
    </div>
  )
}