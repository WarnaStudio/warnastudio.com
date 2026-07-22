"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VideoCard } from "@/components/ui/video-card"
import { siteContent } from "@/lib/content"

const pillars = [
  {
    title: "Jasa produksi",
    desc: "Iklan short, film pendek, company profile, dan aset campaign — dari brief sampai file final.",
    href: "/contact",
    cta: "Minta penawaran",
    video: siteContent.videos.ads,
  },
  {
    title: "Kursus & skill",
    desc: "Belajar alur produksi AI video & iklan secara terstruktur — menempel di member area.",
    href: "/courses",
    cta: "Lihat kursus",
    video: siteContent.videos.course,
  },
  {
    title: "Produk digital member",
    desc: "Template, prompt pack, SOP, AI agent pack, dan update jurnal harian untuk member.",
    href: "/register",
    cta: "Gabung member",
    video: siteContent.videos.ai,
  },
]

export function Pillars() {
  return (
    <section id="pillars" className="relative py-24 lg:py-32 overflow-hidden">
      <VideoCard src={siteContent.videos.showreel} className="absolute inset-0 opacity-40" overlay={false} />
      <div className="absolute inset-0 bg-[#050507]/82" />
      <div className="ws-section-line absolute top-0 left-0 right-0" />

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
              className="group relative rounded-2xl border border-white/15 overflow-hidden min-h-[380px] flex flex-col"
              data-cursor="hover"
            >
              <VideoCard src={p.video} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25 group-hover:from-black/95 transition-colors" />
              <div className="relative mt-auto p-6 sm:p-7">
                <div className="text-amber-300/90 font-mono text-xs mb-2">0{idx + 1}</div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-50">{p.title}</h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">{p.desc}</p>
                <Link href={p.href}>
                  <Button variant="outline" size="sm" className="border-amber-400/40 text-amber-50 hover:bg-amber-400 hover:text-zinc-950">
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
