"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, ContactShadows, Stars } from "@react-three/drei"
import * as THREE from "three"

function VideoFrame({
  position,
  rotation,
  scale = 1,
  color = "#d4af37",
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number
  color?: string
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = rotation[2] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.04
  })

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* Outer frame */}
        <mesh ref={ref}>
          <boxGeometry args={[1.6, 2.4, 0.08]} />
          <meshStandardMaterial color="#121214" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Gold rim */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[1.45, 2.2, 0.02]} />
          <meshStandardMaterial color={color} metalness={0.95} roughness={0.18} emissive={color} emissiveIntensity={0.15} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[1.25, 1.95]} />
          <meshStandardMaterial
            color="#1a1208"
            emissive="#c9a227"
            emissiveIntensity={0.35}
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>
        {/* Scan line accent */}
        <mesh position={[0, 0.2, 0.08]}>
          <planeGeometry args={[1.15, 0.03]} />
          <meshBasicMaterial color="#ffe08a" transparent opacity={0.55} />
        </mesh>
      </group>
    </Float>
  )
}

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.25
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
  })

  return (
    <Float speed={1.5} floatIntensity={0.8}>
      <mesh ref={ref} position={[0, 0.1, 0]}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshPhysicalMaterial
          color="#f0d78c"
          metalness={0.85}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.12}
          emissive="#a67c00"
          emissiveIntensity={0.25}
          reflectivity={1}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color="#d4af37" wireframe transparent opacity={0.28} />
      </mesh>
    </Float>
  )
}

function Particles({ count = 80 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [count])

  const ref = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#f0d78c" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#07070a"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#fff4d6" />
      <pointLight position={[-3, 2, 2]} intensity={0.8} color="#d4af37" />
      <spotLight position={[0, 5, 2]} angle={0.4} penumbra={0.8} intensity={1.1} color="#ffd966" />

      <CoreOrb />
      <VideoFrame position={[-1.7, 0.2, -0.4]} rotation={[0.1, 0.45, -0.08]} scale={0.85} />
      <VideoFrame position={[1.75, -0.15, -0.2]} rotation={[-0.08, -0.5, 0.1]} scale={0.9} color="#e0b84a" />
      <VideoFrame position={[0.15, 1.35, -1.1]} rotation={[0.25, 0.1, 0.05]} scale={0.55} color="#c9a227" />

      <Particles />
      <Stars radius={40} depth={30} count={600} factor={2} saturation={0} fade speed={0.4} />
      <ContactShadows position={[0, -1.6, 0]} opacity={0.45} scale={12} blur={2.5} far={4} color="#000" />
      <Environment preset="city" />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 lg:relative lg:inset-auto w-full h-[42vh] sm:h-[48vh] lg:h-full min-h-[320px] lg:min-h-[560px]">
      <Canvas
        camera={{ position: [0, 0.2, 5.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#07070a] lg:via-transparent lg:to-transparent" />
    </div>
  )
}
