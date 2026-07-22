"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clapperboard, GraduationCap, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

const pillars = [
  {
    icon: Clapperboard,
    title: "Jasa produksi",
    desc: "Iklan short, film pendek, company profile, dan aset campaign — dari brief sampai file final.",
    href: "/contact",
    cta: "Minta penawaran",
    accent: "from-amber-500/20 to-orange-600/5",
  },
  {
    icon: GraduationCap,
    title: "Kursus & skill",
    desc: "Belajar alur produksi AI video & iklan secara terstruktur — menempel di member area.",
    href: "/courses",
    cta: "Lihat kursus",
    accent: "from-yellow-500/15 to-amber-700/5",
  },
  {
    icon: Package,
    title: "Produk digital member",
    desc: "Template, prompt pack, SOP, AI agent pack, dan update jurnal harian untuk member.",
    href: "/register",
    cta: "Gabung member",
    accent: "from-amber-400/15 to-zinc-900/40",
  },
]

export function Pillars() {
  return (
    <section id="pillars" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,120,20,0.08),transparent_60%)]" />
      <div className="ws-section-line absolute top-0 left-0 right-0" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Ekosistem
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Tiga pilar <span className="gradient-text">WarnaStudio</span>
          </h2>
          <p className="text-zinc-400 leading-relaxed text-lg">
            Bukan sekadar “jasa kreatif”. Kami bangun rantai lengkap: dikerjakanin, diajari, dan diberi aset.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, idx) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b ${p.accent} p-6 sm:p-7 overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_60%)]" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-zinc-50">{p.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 min-h-[4.5rem]">{p.desc}</p>
                  <Link href={p.href}>
                    <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-100 hover:bg-amber-500/10">
                      {p.cta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
