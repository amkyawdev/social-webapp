'use client'

/**
 * GroupCreatorClient Component
 * Client-side wrapper for GroupCreator with modal state management
 * @module components/group/GroupCreatorClient
 */

import { useState } from 'react'
import GroupCreator from './GroupCreator'

/**
 * GroupCreatorClient - Button that opens GroupCreator modal
 * @function GroupCreatorClient
 * @returns {JSX.Element} Create group button and modal
 */
export default function GroupCreatorClient() {
  const [isOpen, setIsOpen] = useState(false)

  function handleSuccess() {
    setIsOpen(false)
    window.location.reload()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="pastel-btn"
      >
        ➕ Create Group
      </button>
      
      {isOpen && (
        <GroupCreator 
          onClose={() => setIsOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  )
}