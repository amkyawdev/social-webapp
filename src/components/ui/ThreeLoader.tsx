'use client'

/**
 * ThreeLoader Component
 * A 3D loading screen featuring a rotating wireframe icosahedron
 * Uses React Three Fiber for 3D rendering with Three.js
 * Fades out after initial mount to reveal the app content
 * @module components/ui/ThreeLoader
 */

import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

/**
 * RotatingIcosahedron - Internal 3D mesh component
 * Continuously rotates on X and Y axes based on elapsed time
 * Renders as a lavender-colored wireframe structure
 * @returns {JSX.Element} Rotating icosahedron mesh
 */
function RotatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1, 1]}>
      <meshBasicMaterial 
        color="#e7daff" 
        wireframe 
        transparent 
        opacity={0.8}
      />
    </Icosahedron>
  )
}

/**
 * ThreeLoader - Full-screen 3D loading component
 * Displays an animated icosahedron with "Loading..." text
 * Automatically hides after 2.5 seconds with fade-out animation
 * @returns {JSX.Element | null} Loading screen or null if hidden
 */
export default function ThreeLoader() {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!showLoader) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-pastel-gradient loader-fade-out`}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <RotatingIcosahedron />
      </Canvas>
      <div className="absolute bottom-20 text-[#4e3b4b] text-lg font-medium animate-pulse">
        Loading...
      </div>
    </div>
  )
}