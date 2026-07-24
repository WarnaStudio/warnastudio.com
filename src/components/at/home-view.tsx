"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { siteContent } from "@/lib/content"

/** Active Theory home: full stage + scroll/wheel down enters Work */
export function HomeView() {
  const root = useRef<HTMLElement>(null)
  const router = useRouter()
  const [leaving, setLeaving] = useState(false)
  const locked = useRef(false)

  useEffect(() => {
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hv-rise",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.2 }
      )
      gsap.fromTo(
        ".hv-fade",
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, delay: 0.7, ease: "power3.out" }
      )
    }, root)
    return () => {
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    const goWork = () => {
      if (locked.current) return
      locked.current = true
      setLeaving(true)
      gsap.to(root.current, {
        autoAlpha: 0,
        y: -40,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => router.push("/work"),
      })
    }

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 24) goWork()
    }
    let touchY = 0
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchY - e.changedTouches[0].clientY
      if (dy > 50) goWork()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault()
        goWork()
      }
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("keydown", onKey)
    }
  }, [router])

  return (
    <section
      ref={root}
      className={`relative min-h-[100svh] flex flex-col justify-end pb-16 sm:pb-24 pt-28 px-5 sm:px-8 max-w-[1400px] mx-auto ${
        leaving ? "pointer-events-none" : ""
      }`}
    >
      <p className="hv-fade font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-white/40 mb-7">
        {siteContent.brand} · Creative Digital Experiences
      </p>

      <h1 className="text-[15vw] sm:text-[10vw] lg:text-[7.5rem] font-medium leading-[0.86] tracking-[-0.045em] mb-8">
        <span className="block overflow-hidden">
          <span className="hv-rise block">STOP THE</span>
        </span>
        <span className="block overflow-hidden">
          <span className="hv-rise block text-transparent" style={{ WebkitTextStroke: "1.2px rgba(255,255,255,0.9)" }}>
            SCROLL
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="hv-rise block">MAKE THEM</span>
        </span>
        <span className="block overflow-hidden">
          <span className="hv-rise block">BUY</span>
        </span>
      </h1>

      <p className="hv-fade max-w-md text-white/50 font-light text-base sm:text-lg leading-relaxed mb-10">
        Studio produksi iklan &amp; video berbasis AI — film, short ads, pipeline, kursus &amp; membership.
      </p>

      <div className="hv-fade flex flex-wrap gap-3 mb-6">
        <button
          type="button"
          data-cursor="hover"
          onClick={() => {
            locked.current = true
            setLeaving(true)
            router.push("/work")
          }}
          className="h-12 px-7 bg-white text-black font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#C64DFF] hover:text-white transition-colors"
        >
          Enter work
        </button>
        <a
          href="/contact"
          data-cursor="hover"
          className="h-12 px-7 border border-white/25 inline-flex items-center font-mono text-[11px] tracking-[0.2em] uppercase hover:border-white transition-colors"
        >
          Start project
        </a>
      </div>

      <div className="hv-fade absolute bottom-8 right-5 sm:right-10 flex flex-col items-center gap-3 font-mono text-[9px] tracking-[0.3em] uppercase text-white/35">
        <span>Scroll</span>
        <span className="w-px h-14 bg-gradient-to-b from-[#C64DFF] to-transparent animate-pulse" />
        <span>Work</span>
      </div>
    </section>
  )
}
