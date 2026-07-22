"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

const stats = [
  { value: "3", label: "Pilar bisnis" },
  { value: "AI+", label: "Produksi video" },
  { value: "24/7", label: "Member vault" },
  { value: "1:1", label: "Brief → deliver" },
]

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#07070a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(120,80,20,0.12),transparent_40%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-amber-500/10 blur-[100px] animate-pulse-glow" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-200/90 text-xs sm:text-sm mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Studio produksi iklan &amp; video berbasis AI
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.08]">
            Dari brief ke iklan{" "}
            <span className="gradient-text">siap tayang</span>
            <br className="hidden sm:block" />
            — dipercepat AI, dikurasi manusia
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            WarnaStudio membantu bisnis mendapatkan short ads, film pendek, dan aset konten
            yang rapi — plus membership &amp; kursus agar tim Anda bisa produksi sendiri.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="min-w-[200px] gap-2">
                Order / konsultasi
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/#packages">
              <Button variant="glass" size="lg" className="min-w-[200px] gap-2 border-white/10">
                <Play className="w-4 h-4" />
                Lihat paket
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-xs text-zinc-500">
            Jasa produksi · Membership jurnal · Kursus AI video
          </p>
        </div>

        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-5 text-center backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs sm:text-sm text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
