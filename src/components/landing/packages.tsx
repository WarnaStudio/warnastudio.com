"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteContent } from "@/lib/content"


export function Packages() {
  return (
    <section id="packages" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050507] via-[#0a0a10] to-[#0d0808]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(245,158,11,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(120,40,40,0.05),transparent_50%)]" />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-3">Paket</p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            Pilih intensitas <span className="gradient-text">produksi</span>
          </h2>
          <p className="text-zinc-400">Harga final menyesuaikan brief. Mulai dari konsultasi.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {siteContent.packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-3xl border p-7 flex flex-col backdrop-blur-xl ${
                pkg.popular
                  ? "border-amber-400/50 bg-amber-400/10 shadow-[0_0_60px_-20px_rgba(245,200,80,0.45)]"
                  : "border-white/10 bg-black/40"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-300 text-zinc-950">
                  Recommended
                </span>
              )}
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{pkg.tag}</p>
              <h3 className="text-2xl font-bold text-zinc-50 mb-1">{pkg.name}</h3>
              <p className="text-amber-200 text-sm font-medium mb-6">{pkg.highlight}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" data-cursor="hover">
                <Button variant={pkg.popular ? "primary" : "outline"} className="w-full" size="lg">
                  Diskusikan paket
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
