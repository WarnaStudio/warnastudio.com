"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { siteContent } from "@/lib/content"

const pillars = [
  {
    title: "Jasa produksi",
    desc: "Iklan short, film pendek, company profile, dan aset campaign — dari brief sampai file final.",
    href: "/contact",
    cta: "Minta penawaran",
    bg: "from-amber-950/40 via-zinc-950 to-amber-900/20",
    accent: "border-amber-500/20",
    dot: "bg-amber-500/20",
  },
  {
    title: "Kursus & skill",
    desc: "Belajar alur produksi AI video & iklan secara terstruktur — menempel di member area.",
    href: "/courses",
    cta: "Lihat kursus",
    bg: "from-indigo-950/40 via-zinc-950 to-blue-900/20",
    accent: "border-indigo-500/20",
    dot: "bg-indigo-500/20",
  },
  {
    title: "Produk digital member",
    desc: "Template, prompt pack, SOP, AI agent pack, dan update jurnal harian untuk member.",
    href: "/register",
    cta: "Gabung member",
    bg: "from-rose-950/40 via-zinc-950 to-red-900/20",
    accent: "border-rose-500/20",
    dot: "bg-rose-500/20",
  },
]

export function Pillars() {
  return (
    <section id="pillars" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="ws-section-line absolute top-0 left-0 right-0 z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Ekosistem
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Tiga pilar <span className="gradient-text">WarnaStudio</span>
          </h2>
          <p className="text-zinc-300 leading-relaxed text-lg">
            Bukan sekadar “jasa kreatif”. Kami bangun rantai lengkap: dikerjakanin, diajari, dan diberi aset.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`group relative rounded-2xl border ${p.accent} overflow-hidden min-h-[400px] flex flex-col`}
              data-cursor="hover"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.bg}`} />
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 blur-3xl" />
              <div className={`absolute bottom-6 left-6 w-1 h-16 ${p.dot}`} />
              <div className="relative mt-auto p-6 sm:p-7 z-10">
                <div className="text-amber-300/90 font-mono text-xs mb-2">0{idx + 1}</div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-50">{p.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">{p.desc}</p>
                <Link href={p.href}>
                  <Button variant="outline" size="sm" className={`border-amber-400/40 text-amber-50 hover:bg-amber-400 hover:text-zinc-950 bg-black/40 backdrop-blur-sm ${p.accent}`}>
                    {p.cta}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
