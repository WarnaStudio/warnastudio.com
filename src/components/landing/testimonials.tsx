"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { VideoCard } from "@/components/ui/video-card"
import { siteContent } from "@/lib/content"

const items = [
  {
    quote:
      "Yang kami butuhkan bukan teori AI — tapi short iklan yang bisa langsung dipasang. Alurnya rapi dari brief sampai file.",
    name: "Klien brand",
    role: "Campaign digital",
    video: siteContent.videos.ads,
  },
  {
    quote:
      "Membership + template bikin tim internal kami mulai produksi sendiri, tanpa harus full serah ke agency setiap minggu.",
    name: "Tim konten",
    role: "UMKM / creator",
    video: siteContent.videos.course,
  },
  {
    quote:
      "Komunikasi jelas, paket tidak membingungkan, dan revisi terukur. Cocok untuk founder yang waktunya terbatas.",
    name: "Founder",
    role: "Jasa & produk digital",
    video: siteContent.videos.ai,
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
              <VideoCard src={t.video} dim={34} />
              <div className="relative z-10 mt-auto p-6">
                <Quote className="w-7 h-7 text-amber-300/80 mb-4 drop-shadow" />
                <p className="text-sm text-zinc-50 leading-relaxed mb-6 drop-shadow-md">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-amber-200">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
