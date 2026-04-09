/**
 * Group Page Component
 * Server-side rendered page displaying groups and users from JSONL files
 * @module app/group/page
 */

import GlassCard from '@/components/ui/GlassCard'
import { getGroups, getUsers } from '@/lib/data'

/**
 * GroupPage - Main page displaying groups and users from JSONL
 * @async
 * @function GroupPage
 * @returns {Promise<JSX.Element>} Group page with groups and friends
 */
export default async function GroupPage() {
  const groups = getGroups()
  const users = getUsers()

  function getStatusColor(status: string) {
    return status === 'active' ? 'bg-green-400' : 'bg-gray-400'
  }

  function getStatusText(status: string) {
    return status === 'active' ? 'Available' : 'Offline'
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups Section */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#4e3b4b] mb-2">
              👥 Groups
            </h1>
            <p className="text-[#4e3b4b]/70">
              Join communities
            </p>
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
              <h3 className="text-lg font-bold text-[#4e3b4b] mb-4">🤝 Users</h3>
              {users.length === 0 ? (
                <p className="text-[#4e3b4b]/50 text-sm text-center py-4">No users yet</p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-white/20 rounded-xl transition-all">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--pastel-pink)] to-[var(--pastel-lavender)] flex items-center justify-center text-lg font-bold text-[#4e3b4b]">
                          {user.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#4e3b4b] truncate">
                          {user.username || 'Unknown'}
                        </p>
                        <p className="text-xs text-[#4e3b4b]/60">
                          {getStatusText(user.status)}
                        </p>
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