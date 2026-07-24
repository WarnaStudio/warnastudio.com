"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { usePathname } from "next/navigation"
import * as THREE from "three"

type Mode = "home" | "work" | "detail" | "about" | "contact" | "other"

function modeFromPath(path: string): Mode {
  if (path.startsWith("/work/") && path !== "/work") return "detail"
  if (path.startsWith("/work")) return "work"
  if (path.startsWith("/about")) return "about"
  if (path.startsWith("/contact")) return "contact"
  if (path === "/") return "home"
  return "other"
}

function Scene({ mode }: { mode: Mode }) {
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const grid = useRef<THREE.Group>(null)
  const target = useRef({ z: 6, fov: 32, glow: 0.5, spin: 0.15 })

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    const cfg =
      mode === "home"
        ? { z: 5.6, fov: 30, glow: 0.65, spin: 0.14 }
        : mode === "work"
          ? { z: 7.2, fov: 38, glow: 0.35, spin: 0.06 }
          : mode === "detail"
            ? { z: 4.8, fov: 28, glow: 0.8, spin: 0.2 }
            : mode === "about"
              ? { z: 6.5, fov: 34, glow: 0.4, spin: 0.08 }
              : { z: 6, fov: 32, glow: 0.3, spin: 0.05 }

    target.current.z = THREE.MathUtils.lerp(target.current.z, cfg.z, 0.04)
    target.current.glow = THREE.MathUtils.lerp(target.current.glow, cfg.glow, 0.05)
    target.current.spin = THREE.MathUtils.lerp(target.current.spin, cfg.spin, 0.05)

    state.camera.position.z = target.current.z
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.55, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.15 + state.pointer.y * 0.35, 0.05)
    state.camera.lookAt(0, 0, 0)

    if (core.current) {
      core.current.rotation.x += dt * target.current.spin
      core.current.rotation.y += dt * target.current.spin * 1.3
      const mat = core.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = target.current.glow
    }
    if (ring.current) {
      ring.current.rotation.x = t * 0.08
      ring.current.rotation.y = -t * 0.12
    }
    if (grid.current) {
      grid.current.rotation.y = t * 0.02 + state.pointer.x * 0.1
      grid.current.position.y = Math.sin(t * 0.4) * 0.05
    }
  })

  const particles = useMemo(() => {
    const n = 120
    const a = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 12
      a[i * 3 + 1] = (Math.random() - 0.5) * 8
      a[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return a
  }, [])

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 4, 16]} />
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 3, 2]} intensity={1.4} color="#C64DFF" />
      <pointLight position={[-3, -2, 1]} intensity={0.4} color="#ffffff" />

      <mesh ref={core}>
        <icosahedronGeometry args={[1.05, 16]} />
        <meshStandardMaterial
          color="#120818"
          emissive="#C64DFF"
          emissiveIntensity={0.55}
          metalness={0.9}
          roughness={0.12}
        />
      </mesh>

      <mesh ref={ring} scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#C64DFF" wireframe transparent opacity={0.2} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.85}>
        <torusGeometry args={[1.05, 0.006, 8, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </mesh>

      <group ref={grid}>
        {[-2.2, 0, 2.2].map((x, i) => (
          <mesh key={i} position={[x, i === 1 ? 0.2 : -0.15, -1.4 - i * 0.1]} rotation={[0.12, 0.35 * (i - 1), 0]}>
            <boxGeometry args={[1.15, 1.65, 0.035]} />
            <meshStandardMaterial
              color="#080808"
              emissive={i === 1 ? "#C64DFF" : "#222"}
              emissiveIntensity={i === 1 ? 0.28 : 0.06}
              metalness={0.95}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.018} color="#fff" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
      </points>
    </>
  )
}

/** Persistent WebGL world — stays mounted, reacts to route like Active Theory */
export function AtWorld() {
  const path = usePathname() || "/"
  const mode = modeFromPath(path)

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.2, 6], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene mode={mode} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      <div className="ws-grain absolute inset-0 opacity-[0.07]" />
    </div>
  )
}
