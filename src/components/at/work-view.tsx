"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteContent } from "@/lib/content"
import { VideoCard } from "@/components/ui/video-card"

gsap.registerPlugin(ScrollTrigger)

/** Active Theory Work — pin stage, scroll cycles projects (media always filled) */
export function WorkView() {
  const shell = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const router = useRouter()
  const works = siteContent.works
  const n = works.length

  useEffect(() => {
    const sh = shell.current
    const st = stage.current
    if (!sh || !st) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sh,
        start: "top top",
        end: () => `+=${Math.max(n, 2) * window.innerHeight * 0.9}`,
        pin: st,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(n - 1, Math.floor(self.progress * n * 0.999))
          setActive((prev) => (prev === idx ? prev : idx))
        },
      })
    }, sh)

    const onWheel = (e: WheelEvent) => {
      if (window.scrollY < 12 && e.deltaY < -30) router.push("/")
    }
    window.addEventListener("wheel", onWheel, { passive: true })
    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      window.removeEventListener("wheel", onWheel)
      ctx.revert()
    }
  }, [n, router])

  const w = works[active]

  return (
    <div ref={shell} className="relative bg-black">
      <div ref={stage} className="relative h-[100svh] w-full overflow-hidden bg-[#0a0610]">
        {/* Only nearby slides mounted — avoids blank paused videos */}
        {works.map((item, i) => {
          const dist = i - active
          const nearby = Math.abs(dist) <= 1
          if (!nearby && i !== active) return null

          const isActive = i === active
          return (
            <div
              key={item.slug}
              className="absolute inset-0 transition-opacity duration-500 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 2 : 1,
                pointerEvents: "none",
              }}
              aria-hidden={!isActive}
            >
              <VideoCard
                src={item.video}
                dim={isActive ? 22 : 40}
                active={isActive}
                priority={isActive || Math.abs(dist) === 1}
                fallback={item.accent ? `${item.accent}22` : "#141018"}
              />
              <div
                className="absolute inset-0 mix-blend-soft-light pointer-events-none"
                style={{
                  opacity: isActive ? 0.35 : 0.1,
                  background: `radial-gradient(ellipse at 40% 30%, ${item.accent}, transparent 60%)`,
                }}
              />
            </div>
          )
        })}

        {/* Lighter veil — was too dark / looked blank */}
        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-black/90 via-black/25 to-black/40" />

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col justify-between py-24 sm:py-28">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2">
                <span className="text-[#C64DFF]">Work</span> · Scroll projects
              </div>
              <p className="font-mono text-[12px] tracking-[0.18em] text-white/60">
                {String(active + 1).padStart(2, "0")} — {String(n).padStart(2, "0")}
              </p>
            </div>
            <ul className="hidden md:flex flex-col gap-1.5 items-end max-w-xs">
              {works.map((item, i) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    data-cursor="hover"
                    className={`font-mono text-[10px] tracking-[0.14em] uppercase transition-all ${
                      i === active ? "text-white" : "text-white/30 hover:text-white/55"
                    }`}
                    onClick={() => {
                      const trigger = ScrollTrigger.getAll().find((t) => t.trigger === shell.current)
                      if (!trigger) return
                      const p = (i + 0.35) / n
                      window.scrollTo({
                        top: trigger.start + (trigger.end - trigger.start) * p,
                        behavior: "smooth",
                      })
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-3xl pb-4">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/55 mb-4 flex gap-3 items-center">
              <span className="border border-white/25 px-2 py-1 bg-black/40 backdrop-blur-sm">{w.category}</span>
              <span>{w.year}</span>
            </div>
            <h1
              key={w.slug}
              className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[0.95] mb-5 drop-shadow-lg"
              style={{ animation: "atIn 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              {w.title}
            </h1>
            <p
              key={w.slug + "b"}
              className="text-white/70 font-light text-base sm:text-lg max-w-xl leading-relaxed mb-8 drop-shadow"
              style={{ animation: "atIn 0.6s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              {w.blurb}
            </p>
            <Link
              href={`/work/${w.slug}`}
              data-cursor="hover"
              className="inline-flex items-center gap-3 h-12 px-7 bg-white text-black font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#C64DFF] hover:text-white transition-colors"
            >
              Open project
            </Link>
          </div>
        </div>

        <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {works.map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full transition-all duration-500"
              style={{
                height: i === active ? 32 : 8,
                background: i === active ? "#C64DFF" : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
