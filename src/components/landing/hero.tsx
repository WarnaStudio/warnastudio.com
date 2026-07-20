"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "50+", label: "Project Selesai" },
  { value: "20+", label: "Klien Puas" },
  { value: "5+", label: "Produk Digital" },
  { value: "3+", label: "Tahun Eksistensi" },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "3s" }} />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-violet-400 blur-sm animate-float" />
      <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-fuchsia-400 blur-sm animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-40 left-1/3 w-5 h-5 rounded-full bg-cyan-400 blur-sm animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Creative Technology Company
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6">
            Kami Menghadirkan{" "}
            <span className="gradient-text">Kreativitas</span>
            <br />
            dalam Setiap Karya
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            WarnaStudio adalah creative technology company yang mengkombinasikan AI, desain, film, dan edukasi 
            untuk menciptakan solusi digital yang impactful.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Konsultasi Gratis
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="glass" size="lg">
                Lihat Layanan
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
