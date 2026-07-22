"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const d = dot.current
    const r = ring.current
    if (!d || !r) return

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      d.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const hot = t.closest("a, button, [data-cursor='hover']")
      r.classList.toggle("cursor-hot", Boolean(hot))
    }

    const loop = () => {
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      r.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseover", onOver)
    raf = requestAnimationFrame(loop)
    document.documentElement.classList.add("has-custom-cursor")

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.documentElement.classList.remove("has-custom-cursor")
    }
  }, [])

  return (
    <>
      <div ref={dot} className="ws-cursor-dot" />
      <div ref={ring} className="ws-cursor-ring" />
    </>
  )
}
