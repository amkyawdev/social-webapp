/**
 * Group Page Component
 * Server-side rendered page displaying user profiles with online status
 * Fetches from Supabase profiles table with status indicators
 * @module app/group/page
 */

import { createClient } from '@/lib/supabase'
import GlassCard from '@/components/ui/GlassCard'

/**
 * Profile data interface from Supabase profiles table
 * @interface Profile
 * @property {string} id - Unique user identifier
 * @property {string} username - User's display name
 * @property {'active' | 'busy' | 'offline'} status - User's current status
 * @property {string} [avatar_url] - Optional avatar image URL
 */

/**
 * Fetches all user profiles from Supabase
 * Retrieves profiles ordered alphabetically by username
 * @async
 * @function getProfiles
 * @returns {Promise<Profile[]>} Array of profile objects or empty array on error
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
 * GroupPage - Main page displaying user profiles with status indicators
 * Fetches profiles server-side and renders profile cards with status
 * @async
 * @function GroupPage
 * @returns {Promise<JSX.Element>} Group page with profile cards
 */
export default async function GroupPage() {
  const profiles = await getProfiles()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#4e3b4b] mb-2">
          👥 Groups & Friends
        </h1>
        <p className="text-[#4e3b4b]/70">
          See who's online and connect with friends
        </p>
      </div>

      {profiles.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <div className="text-4xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold text-[#4e3b4b] mb-2">
            No profiles yet
          </h2>
          <p className="text-[#4e3b4b]/70">
            Profiles will appear here when users join!
          </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
          {profiles.map((profile) => (
            <GlassCard key={profile.id} className="p-4 flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] flex items-center justify-center text-2xl font-bold text-[#4e3b4b]">
                  {profile.username?.charAt(0).toUpperCase() || '?'}
                </div>
                <span 
                  className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(profile.status)}`}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#4e3b4b]">
                  {profile.username || 'Unknown User'}
                </h3>
                <p className="text-sm text-[#4e3b4b]/60">
                  {getStatusText(profile.status)}
                </p>
              </div>
              <button className="pastel-btn text-sm py-2 px-4">
                Message
              </button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}