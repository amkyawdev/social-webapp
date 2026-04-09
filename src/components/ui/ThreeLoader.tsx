'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

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