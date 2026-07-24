"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteContent } from "@/lib/content"
import { VideoCard } from "@/components/ui/video-card"

gsap.registerPlugin(ScrollTrigger)

export function WorkGrid() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const cards = el.querySelectorAll(".wk-card")
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative min-h-screen bg-black pt-28 pb-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 mb-14 sm:mb-20">
        <div className="flex items-center gap-3 mb-6 font-mono text-[11px] tracking-[0.28em] text-white/40 uppercase">
          <span className="text-[#C64DFF]">01</span>
          <span>Selected Work</span>
        </div>
        <h1 className="text-[12vw] sm:text-[7rem] font-medium leading-[0.9] tracking-[-0.04em] text-white">
          WORK
        </h1>
        <p className="mt-6 max-w-xl text-white/50 text-base sm:text-lg font-light leading-relaxed">
          Project produksi WarnaStudio — iklan, film, AI pipeline, kursus &amp; campaign.
          Klik salah satu untuk masuk ke halaman interaktif.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {siteContent.works.map((w, i) => (
          <Link
            key={w.slug}
            href={`/work/${w.slug}`}
            data-cursor="hover"
            className={`wk-card group relative overflow-hidden border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-white/25 hover:-translate-y-1 ${
              i % 3 === 0 ? "md:col-span-2 md:min-h-[58vh]" : "md:min-h-[48vh]"
            } min-h-[52vh]`}
          >
            <div className="absolute inset-0">
              <VideoCard src={w.video} dim={35} priority={i < 2} className="!absolute !inset-0" />
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-500 group-hover:opacity-70"
                style={{
                  background: `radial-gradient(ellipse at 30% 40%, ${w.accent}55, transparent 55%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 h-full min-h-[inherit] flex flex-col justify-between p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/70 border border-white/20 px-2.5 py-1 bg-black/40 backdrop-blur-md">
                  {w.category}
                </span>
                <span className="font-mono text-[11px] tracking-[0.15em] text-white/50">
                  {String(i + 1).padStart(2, "0")} / {w.year}
                </span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mb-3 group-hover:translate-x-1 transition-transform duration-500">
                  {w.title}
                </h2>
                <p className="text-sm sm:text-base text-white/60 max-w-lg leading-relaxed font-light">
                  {w.blurb}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/80">
                  <span
                    className="w-8 h-px transition-all duration-500 group-hover:w-14"
                    style={{ background: w.accent }}
                  />
                  Open project
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
