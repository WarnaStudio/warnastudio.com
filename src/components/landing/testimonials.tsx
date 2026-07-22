"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const items = [
  {
    quote:
      "Yang kami butuhkan bukan teori AI — tapi short iklan yang bisa langsung dipasang. Alurnya rapi dari brief sampai file.",
    name: "Klien brand",
    role: "Campaign digital",
  },
  {
    quote:
      "Membership + template bikin tim internal kami mulai produksi sendiri, tanpa harus full serah ke agency setiap minggu.",
    name: "Tim konten",
    role: "UMKM / creator",
  },
  {
    quote:
      "Komunikasi jelas, paket tidak membingungkan, dan revisi terukur. Cocok untuk founder yang waktunya terbatas.",
    name: "Founder",
    role: "Jasa & produk digital",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 border-t border-white/[0.04] bg-zinc-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-12">
          <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Social proof
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Arah yang kami <span className="gradient-text">kejar</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-3">
            Kutipan arah layanan (akan diganti testimonial real seiring project selesai).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <Quote className="w-7 h-7 text-amber-500/30 mb-4" />
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold text-zinc-200">{t.name}</p>
              <p className="text-xs text-zinc-500">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
