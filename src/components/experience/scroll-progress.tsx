"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bar.current
    if (!el) return
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        el.style.transform = `scaleX(${self.progress})`
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent pointer-events-none">
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-600"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  )
}
