"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "XAUUSD Trading Journal",
    category: "Produk digital",
    blurb: "Tools jurnal trading untuk member & komunitas.",
    href: "https://jurnaltradingkumplit-yfte.vercel.app",
    external: true,
    tone: "from-amber-600/40 via-zinc-900 to-zinc-950",
  },
  {
    title: "AI Shorts Pipeline",
    category: "Produksi AI",
    blurb: "Alur potong highlight YouTube → short siap upload.",
    href: "/services",
    external: false,
    tone: "from-yellow-700/30 via-zinc-900 to-black",
  },
  {
    title: "Brand Ad Pack",
    category: "Iklan digital",
    blurb: "Set short ads multi-hook untuk campaign brand.",
    href: "/contact",
    external: false,
    tone: "from-orange-800/25 via-zinc-900 to-zinc-950",
  },
  {
    title: "Company Profile Cut",
    category: "Film",
    blurb: "Potongan sinematik untuk presentasi & website.",
    href: "/contact",
    external: false,
    tone: "from-stone-600/30 via-zinc-900 to-black",
  },
  {
    title: "Member Vault",
    category: "Edukasi",
    blurb: "Kursus + template + update aset digital berkala.",
    href: "/courses",
    external: false,
    tone: "from-amber-900/35 via-zinc-900 to-zinc-950",
  },
  {
    title: "Automation Desk",
    category: "AI ops",
    blurb: "Brief, FAQ, dan alur admin agar solo founder tetap rapi.",
    href: "/contact",
    external: false,
    tone: "from-zinc-700/40 via-zinc-900 to-black",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 lg:py-28 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-amber-400/90 text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Karya & arah
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Bukan placeholder <span className="gradient-text">huruf</span>
            </h2>
            <p className="text-zinc-400 mt-2 max-w-lg">
              Showcase arah produk & layanan. Portofolio video full diganti seiring project real masuk.
            </p>
          </div>
          <Link
            href="/contact"
            className="text-sm text-amber-200/90 hover:text-amber-100 inline-flex items-center gap-1"
          >
            Ajukan project <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {projects.map((project, idx) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-zinc-950 cursor-pointer h-full"
              >
                <div className={`aspect-[16/11] bg-gradient-to-br ${project.tone} relative`}>
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(255,220,120,0.25),transparent_45%)]" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <p className="text-[11px] uppercase tracking-wider text-amber-300/80 mb-1">
                      {project.category}
                    </p>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-zinc-50 group-hover:text-amber-100 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{project.blurb}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-amber-300 shrink-0 mt-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )

            if (project.external) {
              return (
                <a key={project.title} href={project.href} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              )
            }
            return (
              <Link key={project.title} href={project.href}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
