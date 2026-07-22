"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

const HeroScene = dynamic(
  () => import("@/components/landing/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#050507] flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border border-amber-500/20 border-t-amber-300 animate-spin" />
      </div>
    ),
  }
)

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.fromTo(".hero-kicker", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 })
        .fromTo(".hero-title span", { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08 }, "-=0.4")
        .fromTo(".hero-sub", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85 }, "-=0.55")
        .fromTo(".hero-cta", { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 }, "-=0.5")
        .fromTo(".hero-meta", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, "-=0.35")
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-[#050507]">
      {/* Full-bleed immersive WebGL (Active Theory / Lusion spirit) */}
      <div className="absolute inset-0">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/75 to-[#050507]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/50" />
        <div className="ws-grain absolute inset-0 pointer-events-none opacity-[0.14]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100svh] flex items-center pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="hero-kicker inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-400/25 bg-black/40 backdrop-blur-md text-[11px] sm:text-xs tracking-[0.22em] uppercase text-amber-100/90 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            Immersive creative technology
          </div>

          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.98] mb-6">
            <span className="block overflow-hidden">
              <span className="inline-block text-zinc-50">Buat orang</span>
            </span>
            <span className="block overflow-hidden">
              <span className="inline-block text-zinc-50">berhenti scroll.</span>
            </span>
            <span className="block overflow-hidden mt-1">
              <span className="inline-block gradient-text">Lalu beli.</span>
            </span>
          </h1>

          <p className="hero-sub text-base sm:text-lg text-zinc-400/95 leading-relaxed max-w-lg mb-9">
            WarnaStudio merancang pengalaman iklan &amp; video AI yang terasa mahal —
            dari brief sampai short siap tayang, plus membership untuk scale konten Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link href="/contact" className="hero-cta" data-cursor="hover">
              <Button variant="primary" size="lg" className="min-w-[200px] gap-2 shadow-[0_0_40px_-8px_rgba(245,200,80,0.55)]">
                Mulai project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/#packages" className="hero-cta" data-cursor="hover">
              <Button variant="glass" size="lg" className="min-w-[200px] gap-2 border-white/15 bg-black/30 backdrop-blur-md">
                <Play className="w-4 h-4" />
                Lihat paket
              </Button>
            </Link>
          </div>

          <div className="hero-meta flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            <span>WebGL experience</span>
            <span className="text-amber-500/50">/</span>
            <span>AI production</span>
            <span className="text-amber-500/50">/</span>
            <span>Membership</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-600">
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-amber-400/70 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
