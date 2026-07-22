"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const packages = [
  {
    name: "Starter Ads",
    price: "Mulai dari",
    highlight: "3 short siap upload",
    features: ["Brief + riset angle", "3 video vertical", "Subtitle & packing", "2x revisi"],
    popular: false,
  },
  {
    name: "Campaign",
    price: "Paling dipilih",
    highlight: "10 short + 1 long",
    features: [
      "Strategi hook & CTA",
      "10 short + 1 long-form",
      "Variasi caption",
      "Prioritas slot produksi",
      "3x revisi",
    ],
    popular: true,
  },
  {
    name: "Retainer",
    price: "Bulanan",
    highlight: "Output konsisten",
    features: [
      "Kuota konten per bulan",
      "Kalender konten",
      "Revisi sesuai paket",
      "Sync brand guide",
      "Support prioritas",
    ],
    popular: false,
  },
]

export function Packages() {
  return (
    <section id="packages" className="py-20 lg:py-28 border-t border-white/[0.04] bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Paket jasa
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Pilih jalur yang <span className="gradient-text">jelas</span>
          </h2>
          <p className="text-zinc-400">
            Harga final menyesuaikan brief. Mulai dari konsultasi — tanpa komitmen panjang.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`relative rounded-2xl border p-6 sm:p-7 flex flex-col ${
                pkg.popular
                  ? "border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-transparent shadow-[0_0_40px_-12px_rgba(212,175,55,0.35)]"
                  : "border-white/[0.07] bg-white/[0.02]"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-amber-400 text-zinc-950">
                  Recommended
                </span>
              )}
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{pkg.price}</p>
              <h3 className="text-xl font-bold text-zinc-50 mb-1">{pkg.name}</h3>
              <p className="text-amber-200/90 text-sm font-medium mb-5">{pkg.highlight}</p>
              <ul className="space-y-2.5 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block">
                <Button
                  variant={pkg.popular ? "primary" : "outline"}
                  className="w-full"
                  size="lg"
                >
                  Diskusikan paket
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
