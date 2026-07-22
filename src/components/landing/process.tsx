"use client"

import { motion } from "framer-motion"

const steps = [
  { n: "01", title: "Brief", desc: "Isi form / chat — tujuan, audience, referensi, deadline.", color: "from-amber-950/40 via-zinc-950 to-amber-900/10", bar: "bg-amber-500/30" },
  { n: "02", title: "Produksi", desc: "Riset angle, script, edit AI-assisted, QC manusia.", color: "from-rose-950/40 via-zinc-950 to-rose-900/10", bar: "bg-rose-500/30" },
  { n: "03", title: "Preview", desc: "Anda review. Revisi sesuai kuota paket.", color: "from-indigo-950/40 via-zinc-950 to-indigo-900/10", bar: "bg-indigo-500/30" },
  { n: "04", title: "Deliver", desc: "File final + packing platform. Upsell member/kursus opsional.", color: "from-emerald-950/40 via-zinc-950 to-emerald-900/10", bar: "bg-emerald-500/30" },
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
              <div className={`absolute inset-0 bg-gradient-to-br ${s.color}`} />
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${s.bar}`} />
              <div className="relative z-10 p-5 min-h-[280px] flex flex-col justify-end">
                <div className="text-amber-300 font-mono text-sm mb-2">{s.n}</div>
                <h3 className="font-semibold text-zinc-50 text-lg mb-1.5">{s.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
