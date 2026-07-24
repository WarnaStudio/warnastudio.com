"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import { siteContent } from "@/lib/content"
import { VideoCard } from "@/components/ui/video-card"

gsap.registerPlugin(ScrollTrigger)

export function Portfolio() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sec = section.current
    const tr = track.current
    if (!sec || !tr) return
    if (window.matchMedia("(max-width: 768px)").matches) return

    const ctx = gsap.context(() => {
      const getScroll = () => Math.max(0, tr.scrollWidth - window.innerWidth + 80)
      gsap.to(tr, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }, sec)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={section} id="works" className="relative bg-[#050507] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-20 lg:pt-28 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-3">Works</p>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Moving <span className="gradient-text">pictures</span>
            </h2>
            <p className="text-zinc-500 mt-3 max-w-md">
              Video tersimpan di server site (`/videos`). Ganti file aslinya kapan saja.
            </p>
          </div>
          <Link href="/contact" className="text-sm text-amber-200 inline-flex items-center gap-1" data-cursor="hover">
            Order showreel custom <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="pb-20 lg:pb-28">
        <div ref={track} className="flex gap-5 px-5 sm:px-8 w-max will-change-transform">
          {siteContent.works.map((w, i) => (
            <Link
              key={w.slug || w.title}
              href={w.slug ? `/work/${w.slug}` : "/contact"}
              data-cursor="hover"
              className="relative w-[85vw] sm:w-[440px] lg:w-[520px] h-[62vw] sm:h-[560px] rounded-[28px] overflow-hidden border border-white/10 group block"
            >
              <VideoCard src={w.video} dim={30} priority={i < 2} active />
              <div className="absolute top-5 left-5 right-5 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/80">
                <span>{w.category}</span>
                <span>0{i + 1}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-amber-100 transition-colors">
                  {w.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed max-w-sm">{w.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
