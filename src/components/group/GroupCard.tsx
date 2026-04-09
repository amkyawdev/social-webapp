'use client'

/**
 * GroupCard Component
 * Displays a group with Neo-3D hover effect
 * @module components/group/GroupCard
 */

import Link from 'next/link'
import GlassCard from '@/components/ui/GlassCard'

/**
 * Group data interface
 * @interface Group
 * @property {number} id - Unique group identifier
 * @property {string} name - Group name
 * @property {string} description - Group description
 * @property {string} icon_emoji - Group emoji icon
 * @property {string} created_at - Creation timestamp
 */

/**
 * GroupCard - Displays group info with Neo-3D styling
 * @function GroupCard
 * @param {Group} group - Group data
 * @returns {JSX.Element} Group card with hover effect
 */
interface GroupCardProps {
  group: {
    id: number
    name: string
    description: string
    icon_emoji: string
  }
}

export default function GroupCard({ group }: GroupCardProps) {
  return (
    <Link href={`/group/${group.id}`}>
      <GlassCard className="p-6 text-center hover:scale-105 cursor-pointer">
        <div className="text-5xl mb-4">{group.icon_emoji || '👥'}</div>
        <h3 className="text-xl font-bold text-[#4e3b4b] mb-2">
          {group.name}
        </h3>
        <p className="text-[#4e3b4b]/70 text-sm">
          {group.description || 'No description'}
        </p>
      </GlassCard>
    </Link>
  )
}