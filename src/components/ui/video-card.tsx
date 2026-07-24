"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  src: string
  className?: string
  /** 0–100 how dark the veil is. Lower = video more visible */
  dim?: number
  overlay?: boolean
  priority?: boolean
  poster?: string
  active?: boolean
}

function posterFromSrc(src: string) {
  return src.replace(/\.mp4$/i, ".jpg")
}

/** Reliable background video for landing sections */
export function VideoCard({
  src,
  className = "",
  dim = 35,
  overlay = true,
  priority = false,
  poster,
  active = true,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const posterSrc = poster || posterFromSrc(src)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    v.muted = true
    v.defaultMuted = true
    v.playsInline = true
    v.setAttribute("muted", "")
    v.setAttribute("playsinline", "")

    const tryPlay = () => {
      if (!active) {
        v.pause()
        return
      }
      const p = v.play()
      if (p) p.catch(() => {})
    }

    const onCanPlay = () => tryPlay()
    v.addEventListener("canplay", onCanPlay)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && active) tryPlay()
        else v.pause()
      },
      { threshold: 0.05, rootMargin: "80px" }
    )
    io.observe(v)
    tryPlay()

    return () => {
      v.removeEventListener("canplay", onCanPlay)
      io.disconnect()
    }
  }, [src, active])

  return (
    <div className={`absolute inset-0 overflow-hidden bg-zinc-900 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {!failed && (
        <video
          ref={ref}
          src={src}
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay={active}
          preload={priority ? "auto" : "metadata"}
          onError={() => setFailed(true)}
        />
      )}

      {overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, rgba(5,5,7,${Math.min(0.85, dim / 100 + 0.35)}) 0%, rgba(5,5,7,${dim / 100}) 45%, rgba(5,5,7,${Math.max(0.15, dim / 100 - 0.05)}) 100%)`,
          }}
        />
      )}
    </div>
  )
}
