/**
 * Group Page Component
 * Server-side rendered page displaying groups and user profiles
 * Includes Group Creator and Friends List with real-time status
 * @module app/group/page
 */

import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'
import GroupCreatorClient from '@/components/group/GroupCreatorClient'

/**
 * Group data interface
 * @interface Group
 * @property {number} id - Unique group identifier
 * @property {string} name - Group name
 * @property {string} description - Group description
 * @property {string} icon_emoji - Group emoji icon
 */

/**
 * Profile data interface from Supabase profiles table
 * @interface Profile
 * @property {string} id - Unique user identifier
 * @property {string} username - User's display name
 * @property {'active' | 'busy' | 'offline'} status - User's current status
 * @property {string} [avatar_url] - Optional avatar image URL
 */

/**
 * Fetches groups from Supabase
 * Retrieves groups ordered by creation date
 * @async
 * @function getGroups
 * @returns {Promise<Group[]>} Array of group objects
 */
interface Group {
  id: number
  name: string
  description: string
  icon_emoji: string
}

async function getGroups() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching groups:', error)
    return []
  }
  return data as Group[] || []
}

/**
 * Fetches all user profiles from Supabase
 * Retrieves profiles ordered alphabetically by username
 * @async
 * @function getProfiles
 * @returns {Promise<Profile[]>} Array of profile objects
 */
interface Profile {
  id: string
  username: string
  status: 'active' | 'busy' | 'offline'
  avatar_url?: string
}

async function getProfiles() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('username', { ascending: true })

  if (error) {
    console.error('Error fetching profiles:', error)
    return []
  }
  return data as Profile[] || []
}

/**
 * Maps status string to Tailwind CSS background color class
 * @function getStatusColor
 * @param {string} status - User status string
 * @returns {string} CSS class for status indicator color
 */
function getStatusColor(status: string) {
  switch (status) {
    case 'active':
      return 'bg-green-400'
    case 'busy':
      return 'bg-red-400'
    default:
      return 'bg-gray-400'
  }
}

/**
 * Maps status string to human-readable status text
 * @function getStatusText
 * @param {string} status - User status string
 * @returns {string} Human-readable status label
 */
function getStatusText(status: string) {
  switch (status) {
    case 'active':
      return 'Available'
    case 'busy':
      return 'Busy'
    default:
      return 'Offline'
  }
}

/**
 * GroupPage - Main page displaying groups and user profiles
 * Includes GroupCreator for creating new groups
 * @async
 * @function GroupPage
 * @returns {Promise<JSX.Element>} Group page with groups and friends
 */
export default async function GroupPage() {
  const groups = await getGroups()
  const profiles = await getProfiles()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups Section */}
        <div className="lg:col-span-2">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#4e3b4b] mb-2">
                👥 Groups
              </h1>
              <p className="text-[#4e3b4b]/70">
                Create and join communities
              </p>
            </div>
            <GroupCreatorClient />
          </div>

          {groups.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h2 className="text-2xl font-bold text-[#4e3b4b] mb-2">
                No groups yet
              </h2>
              <p className="text-[#4e3b4b]/70">
                Create the first group to get started!
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
              {groups.map((group) => (
                <GlassCard key={group.id} className="p-6 text-center neo-3d">
                  <div className="text-5xl mb-4">{group.icon_emoji || '👥'}</div>
                  <h3 className="text-xl font-bold text-[#4e3b4b] mb-2">
                    {group.name}
                  </h3>
                  <p className="text-[#4e3b4b]/70 text-sm">
                    {group.description || 'No description'}
                  </p>
                </GlassCard>
              ))}
            </div>
          )}
        </div>

        {/* Friends Section */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <GlassCard className="p-4">
              <h3 className="text-lg font-bold text-[#4e3b4b] mb-4">🤝 Potential Friends</h3>
              {profiles.length === 0 ? (
                <p className="text-[#4e3b4b]/50 text-sm text-center py-4">No users yet</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center gap-3 p-2 hover:bg-white/20 rounded-xl transition-all">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] flex items-center justify-center text-lg font-bold text-[#4e3b4b]">
                          {profile.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(profile.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#4e3b4b] truncate">
                          {profile.username || 'Unknown'}
                        </p>
                        <p className="text-xs text-[#4e3b4b]/60">
                          {getStatusText(profile.status)}
                        </p>
                      </div>
                      <a 
                        href={`/chat?user=${profile.id}`}
                        className="text-sm px-3 py-1.5 bg-[var(--pastel-lavender)]/30 rounded-lg hover:bg-[var(--pastel-lavender)]/50 transition-all text-[#4e3b4b]"
                      >
                        💬
                      </a>
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