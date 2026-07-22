"use client"

import { motion } from "framer-motion"
import { VideoCard } from "@/components/ui/video-card"
import { siteContent } from "@/lib/content"

const steps = [
  { n: "01", title: "Brief", desc: "Isi form / chat — tujuan, audience, referensi, deadline.", video: siteContent.videos.ads },
  { n: "02", title: "Produksi", desc: "Riset angle, script, edit AI-assisted, QC manusia.", video: siteContent.videos.ai },
  { n: "03", title: "Preview", desc: "Anda review. Revisi sesuai kuota paket.", video: siteContent.videos.film },
  { n: "04", title: "Deliver", desc: "File final + packing platform. Upsell member/kursus opsional.", video: siteContent.videos.campaign },
]

export function Process() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-12">
          <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Alur kerja
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Sederhana. <span className="gradient-text">Tertebak.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="relative rounded-2xl border border-white/12 overflow-hidden min-h-[280px] group"
            >
              <VideoCard src={s.video} dim={30} />
              <div className="relative z-10 p-5 min-h-[280px] flex flex-col justify-end">
                <div className="text-amber-300 font-mono text-sm mb-2 drop-shadow">{s.n}</div>
                <h3 className="font-semibold text-zinc-50 text-lg mb-1.5 drop-shadow">{s.title}</h3>
                <p className="text-sm text-zinc-100/90 leading-relaxed drop-shadow">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
