"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const items = [
  {
    quote:
      "Yang kami butuhkan bukan teori AI — tapi short iklan yang bisa langsung dipasang. Alurnya rapi dari brief sampai file.",
    name: "Klien brand",
    role: "Campaign digital",
    bg: "from-amber-950/30 via-zinc-950 to-amber-900/10",
    dot: "bg-amber-500/25",
  },
  {
    quote:
      "Membership + template bikin tim internal kami mulai produksi sendiri, tanpa harus full serah ke agency setiap minggu.",
    name: "Tim konten",
    role: "UMKM / creator",
    bg: "from-indigo-950/30 via-zinc-950 to-blue-900/10",
    dot: "bg-indigo-500/25",
  },
  {
    quote:
      "Komunikasi jelas, paket tidak membingungkan, dan revisi terukur. Cocok untuk founder yang waktunya terbatas.",
    name: "Founder",
    role: "Jasa & produk digital",
    bg: "from-rose-950/30 via-zinc-950 to-red-900/10",
    dot: "bg-rose-500/25",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-12">
          <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Social proof
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Arah yang kami <span className="gradient-text">kejar</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3">
            Kutipan arah layanan (nanti diganti testimonial real + video klien).
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
              className="relative rounded-2xl border border-white/12 overflow-hidden min-h-[360px] flex flex-col"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${t.bg}`} />
              <div className={`absolute top-6 right-6 w-2 h-2 rounded-full ${t.dot}`} />
              <div className={`absolute top-6 right-10 w-1 h-10 ${t.dot}`} />
              <div className="relative z-10 mt-auto p-6">
                <Quote className="w-7 h-7 text-amber-300/80 mb-4" />
                <p className="text-sm text-zinc-200 leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-zinc-50">{t.name}</p>
                <p className="text-xs text-amber-300/80">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
