"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function Core() {
  const ref = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (ref.current) {
      ref.current.rotation.x = t * 0.12
      ref.current.rotation.y = t * 0.18
      ref.current.position.x = s.pointer.x * 0.35
      ref.current.position.y = s.pointer.y * 0.25
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.1
      wire.current.rotation.z = t * 0.05
    }
  })
  return (
    <Float speed={1.2} floatIntensity={0.6} rotationIntensity={0.25}>
      <mesh ref={ref} scale={1.2}>
        <icosahedronGeometry args={[1, 12]} />
        <meshStandardMaterial
          color="#1a0a24"
          emissive="#C64DFF"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.15}
          wireframe={false}
        />
      </mesh>
      <mesh ref={wire} scale={1.45}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#C64DFF" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh scale={1.7} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.008, 12, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </Float>
  )
}

function Panels() {
  const group = useRef<THREE.Group>(null)
  const mats = useMemo(
    () =>
      [-1.8, 0, 1.8].map((x, i) => ({
        x,
        y: i === 1 ? 0.3 : -0.2,
        z: -1.2 - i * 0.15,
        s: 0.7 + i * 0.08,
      })),
    []
  )
  useFrame((s) => {
    if (!group.current) return
    group.current.rotation.y = s.pointer.x * 0.15
    group.current.position.y = s.pointer.y * 0.1
  })
  return (
    <group ref={group}>
      {mats.map((m, i) => (
        <mesh key={i} position={[m.x, m.y, m.z]} scale={m.s} rotation={[0.1, 0.4 * (i - 1), 0]}>
          <boxGeometry args={[1.1, 1.6, 0.04]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={i === 1 ? "#C64DFF" : "#333"}
            emissiveIntensity={i === 1 ? 0.35 : 0.08}
            metalness={0.9}
            roughness={0.25}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

function Particles({ n = 100 }) {
  const pos = useMemo(() => {
    const a = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 10
      a[i * 3 + 1] = (Math.random() - 0.5) * 6
      a[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return a
  }, [n])
  const ref = useRef<THREE.Points>(null)
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.03
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Rig() {
  useFrame((s) => {
    s.camera.position.x = THREE.MathUtils.lerp(s.camera.position.x, s.pointer.x * 0.5, 0.04)
    s.camera.position.y = THREE.MathUtils.lerp(s.camera.position.y, 0.2 + s.pointer.y * 0.3, 0.04)
    s.camera.lookAt(0, 0, 0)
  })
  return null
}

export function AtScene({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0.2, 5.8], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 14]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 4, 2]} intensity={1.2} color="#C64DFF" />
        <pointLight position={[-3, -1, 2]} intensity={0.5} color="#ffffff" />
        <Core />
        <Panels />
        <Particles />
        <Sparkles count={40} scale={7} size={1.5} speed={0.3} opacity={0.35} color="#C64DFF" />
        <Rig />
      </Canvas>
    </div>
  )
}
