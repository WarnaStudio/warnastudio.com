"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

const HeroScene = dynamic(
  () => import("@/components/landing/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[42vh] sm:h-[48vh] lg:h-full min-h-[320px] lg:min-h-[560px] bg-[#07070a] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-amber-500/30 border-t-amber-400 animate-spin" />
      </div>
    ),
  }
)

const stats = [
  { value: "3D", label: "Interactive stage" },
  { value: "AI+", label: "Produksi video" },
  { value: "3", label: "Pilar bisnis" },
  { value: "1:1", label: "Brief → deliver" },
]

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#07070a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_40%,rgba(212,175,55,0.12),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Copy */}
          <div className="order-2 lg:order-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-200/90 text-xs sm:text-sm mb-6 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Powered by WebGL · R3F stack
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] xl:text-6xl font-bold tracking-tight mb-5 leading-[1.08]">
              Studio iklan &amp; video AI
              <br />
              <span className="gradient-text">yang terasa premium</span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Dari brief ke short ads siap tayang — dipercepat AI, dikurasi manusia.
              Plus membership, kursus, dan produk digital di satu ekosistem WarnaStudio.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="min-w-[190px] gap-2">
                  Order / konsultasi
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/#packages">
                <Button variant="glass" size="lg" className="min-w-[190px] gap-2 border-white/10">
                  <Play className="w-4 h-4" />
                  Lihat paket
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto lg:mx-0">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-3.5 text-center backdrop-blur-sm"
                >
                  <div className="text-lg sm:text-xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500 mt-0.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D stage — inspired by Three.js / R3F portfolio sites */}
          <div className="order-1 lg:order-2 relative h-[42vh] sm:h-[48vh] lg:h-[min(72vh,640px)] rounded-2xl overflow-hidden border border-amber-500/15 bg-black/40 shadow-[0_0_80px_-20px_rgba(212,175,55,0.35)]">
            <HeroScene />
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              <span>Interactive stage</span>
              <span className="text-amber-500/70">three · r3f · drei</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
