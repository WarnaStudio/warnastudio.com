"use client"

import { motion } from "framer-motion"

const steps = [
  { n: "01", title: "Brief", desc: "Isi form / chat — tujuan, audience, referensi, deadline." },
  { n: "02", title: "Produksi", desc: "Riset angle, script, edit AI-assisted, QC manusia." },
  { n: "03", title: "Preview", desc: "Anda review. Revisi sesuai kuota paket." },
  { n: "04", title: "Deliver", desc: "File final + packing platform. Upsell member/kursus opsional." },
]

export function Process() {
  return (
    <section className="py-20 lg:py-24 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <div className="text-amber-400/80 font-mono text-sm mb-3">{s.n}</div>
              <h3 className="font-semibold text-zinc-100 mb-1.5">{s.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
