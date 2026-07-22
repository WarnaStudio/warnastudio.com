"use client"

import { useEffect, useRef } from "react"

type Props = {
  src: string
  className?: string
  overlay?: boolean
  priority?: boolean
}

/** Autoplay muted loop video — pause when offscreen to save GPU */
export function VideoCard({ src, className = "", overlay = true, priority = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <video
        ref={ref}
        src={src}
        className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
        muted
        loop
        playsInline
        autoPlay={priority}
        preload={priority ? "auto" : "metadata"}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />
      )}
    </div>
  )
}
