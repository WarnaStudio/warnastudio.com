"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { siteContent } from "@/lib/content"

const HeroScene = dynamic(
  () => import("@/components/landing/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050507]" />,
  }
)

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(".h-line", { yPercent: 120 }, { yPercent: 0, duration: 1.15, stagger: 0.1 })
        .fromTo(".h-fade", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, "-=0.55")
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-[#050507]">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={siteContent.videos.showreel}
          poster="/videos/showreel.jpg"
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />
      </div>
      <div className="absolute inset-0 opacity-55 mix-blend-lighten">
        <HeroScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-[#050507]/55 to-[#050507]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/95 via-transparent to-[#050507]/40" />
      <div className="ws-grain absolute inset-0 pointer-events-none opacity-[0.12]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 min-h-[100svh] flex flex-col justify-end pb-16 sm:pb-20 pt-28">
        <div className="max-w-4xl">
          <div className="h-fade mb-6 inline-flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-amber-200/80">
            <span className="w-8 h-px bg-amber-400/70" />
            WarnaStudio · AI Ads & Film
          </div>

          <h1 className="text-[12vw] sm:text-[9vw] lg:text-[6.5rem] font-bold leading-[0.88] tracking-[-0.04em] text-zinc-50 mb-8">
            <span className="block overflow-hidden">
              <span className="h-line block">STOP THE</span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-line block gradient-text">SCROLL.</span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-line block">MAKE THEM</span>
            </span>
            <span className="block overflow-hidden">
              <span className="h-line block">BUY.</span>
            </span>
          </h1>

          <p className="h-fade text-base sm:text-xl text-zinc-400 max-w-xl leading-relaxed mb-10">
            Studio produksi iklan &amp; video berbasis AI — plus membership dan kursus
            agar bisnis Anda punya mesin konten sendiri.
          </p>

          <div className="h-fade flex flex-col sm:flex-row gap-3">
            <Link href="/contact" data-cursor="hover">
              <Button variant="primary" size="lg" className="min-w-[210px] gap-2 text-base h-14 px-8">
                Mulai project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/#works" data-cursor="hover">
              <Button variant="glass" size="lg" className="min-w-[210px] gap-2 h-14 border-white/20 bg-black/40 backdrop-blur-md">
                <Play className="w-4 h-4" />
                Tonton karya
              </Button>
            </Link>
          </div>
        </div>

        <div className="h-fade mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-3xl">
          {[
            ["Jasa", "Iklan · Film · AI cut"],
            ["Member", "Vault + update"],
            ["Kursus", "Produksi AI"],
            ["Retainer", "Konten bulanan"],
          ].map(([a, b]) => (
            <div key={a} className="bg-[#0a0a0e]/90 px-4 py-4 backdrop-blur-md">
              <div className="text-amber-300 text-xs tracking-[0.2em] uppercase mb-1">{a}</div>
              <div className="text-sm text-zinc-400">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
