"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, MeshDistortMaterial, Sparkles } from "@react-three/drei"
import * as THREE from "three"

function useMouse() {
  const { viewport } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  useFrame((state) => {
    mouse.current.x = (state.pointer.x * viewport.width) / 2
    mouse.current.y = (state.pointer.y * viewport.height) / 2
  })
  return mouse
}

function PlasmaCore() {
  const ref = useRef<THREE.Mesh>(null)
  const mouse = useMouse()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.15
    ref.current.rotation.y = t * 0.22
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.current.x * 0.08, 0.04)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.current.y * 0.08, 0.04)
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={ref} scale={1.15}>
        <icosahedronGeometry args={[1.05, 16]} />
        <MeshDistortMaterial
          color="#f0c14b"
          emissive="#8a5a00"
          emissiveIntensity={0.45}
          roughness={0.12}
          metalness={0.75}
          distort={0.38}
          speed={2.2}
        />
      </mesh>
      <mesh scale={1.28}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshBasicMaterial color="#ffd978" wireframe transparent opacity={0.18} />
      </mesh>
      <mesh scale={1.55}>
        <torusGeometry args={[1.15, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ffcc4d" transparent opacity={0.35} />
      </mesh>
      <mesh scale={1.55} rotation={[Math.PI / 2.4, 0.4, 0]}>
        <torusGeometry args={[1.15, 0.008, 16, 100]} />
        <meshBasicMaterial color="#fff1c2" transparent opacity={0.22} />
      </mesh>
    </Float>
  )
}

function Ribbon({
  radius,
  tube,
  speed,
  color,
  offset = 0,
}: {
  radius: number
  tube: number
  speed: number
  color: string
  offset?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + offset
    ref.current.rotation.x = t * 0.35
    ref.current.rotation.y = t * 0.55
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.4
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[radius, tube, 220, 16, 2, 3]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        metalness={0.9}
        roughness={0.2}
        transparent
        opacity={0.55}
      />
    </mesh>
  )
}

function MediaShard({
  position,
  rot,
  scale = 1,
}: {
  position: [number, number, number]
  rot: [number, number, number]
  scale?: number
}) {
  const ref = useRef<THREE.Group>(null)
  const mouse = useMouse()

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.x = position[0] + mouse.current.x * 0.04
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.08 + mouse.current.y * 0.03
    ref.current.rotation.y = rot[1] + t * 0.12
  })

  return (
    <group ref={ref} position={position} rotation={rot} scale={scale}>
      <mesh>
        <boxGeometry args={[1.2, 1.8, 0.05]} />
        <meshStandardMaterial color="#0d0d10" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <planeGeometry args={[1.0, 1.55]} />
        <meshStandardMaterial
          color="#1a1205"
          emissive="#d4a017"
          emissiveIntensity={0.55}
          metalness={0.3}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.05, 1.6]} />
        <meshBasicMaterial color="#f5d76e" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  )
}

function FieldParticles({ count = 140 }) {
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      a[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      a[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      a[i * 3 + 2] = r * Math.cos(phi)
    }
    return a
  }, [count])

  const ref = useRef<THREE.Points>(null)
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#ffe6a0" transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.45, 0.04)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.15 + state.pointer.y * 0.25, 0.04)
    state.camera.lookAt(0, 0, 0)
    state.camera.position.z = 5.4 + Math.sin(t * 0.2) * 0.08
  })
  return null
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#050507"]} />
      <fog attach="fog" args={["#050507", 6, 16]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 6, 4]} intensity={1.4} color="#fff3d0" />
      <pointLight position={[-4, 2, 3]} intensity={1.2} color="#ffb000" />
      <pointLight position={[3, -2, -2]} intensity={0.6} color="#ff6a00" />

      <PlasmaCore />
      <Ribbon radius={1.55} tube={0.012} speed={0.35} color="#d4af37" />
      <Ribbon radius={1.85} tube={0.008} speed={-0.22} color="#ffcf5c" offset={1.2} />
      <MediaShard position={[-2.3, 0.35, 0.2]} rot={[0.15, 0.6, -0.1]} scale={0.95} />
      <MediaShard position={[2.35, -0.25, 0.1]} rot={[-0.1, -0.55, 0.12]} scale={1.05} />
      <MediaShard position={[0.2, 1.55, -1.2]} rot={[0.4, 0.2, 0.05]} scale={0.55} />
      <FieldParticles />
      <Sparkles count={50} scale={8} size={2} speed={0.35} opacity={0.45} color="#ffd978" />
      <Environment preset="city" />
      <CameraRig />
    </>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0.15, 5.5], fov: 40 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
