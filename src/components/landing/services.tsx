"use client"

import { motion } from "framer-motion"
import { Film, Megaphone, Bot, Sparkles, BookOpen, Workflow } from "lucide-react"

const services = [
  {
    icon: Megaphone,
    title: "Iklan & short ads",
    description: "Konten vertical siap Shorts/Reels/TikTok — hook kuat, subtitle rapi, brand-safe.",
  },
  {
    icon: Film,
    title: "Film & company profile",
    description: "Narasi sinematik untuk brand, produk, atau dokumentasi bisnis.",
  },
  {
    icon: Sparkles,
    title: "AI production pipeline",
    description: "Alur produksi dipercepat AI: riset momen, script, potong, packing deliverable.",
  },
  {
    icon: Bot,
    title: "AI automation bisnis",
    description: "Chat, brief, dan workflow internal agar studio/UMKM tidak macet di admin.",
  },
  {
    icon: BookOpen,
    title: "Kursus produksi AI",
    description: "Modul praktis: dari tools sampai sistem konten harian.",
  },
  {
    icon: Workflow,
    title: "Retainer konten",
    description: "Slot bulanan untuk brand yang butuh output konsisten tanpa hire tim besar.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-xl">
            <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Layanan
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Fokus pada yang <span className="gradient-text">menghasilkan</span>
            </h2>
            <p className="text-zinc-400">
              Kami potong noise. Yang utama: konten iklan/video yang bisa dipakai jualan dan membangun brand.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 hover:border-amber-500/25 hover:bg-amber-500/[0.04] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-300" />
                </div>
                <h3 className="text-base font-semibold text-zinc-100 mb-2">{service.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
