"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "XAUUSD Trading Journal",
    category: "01 — Produk digital",
    blurb: "Tools jurnal trading untuk member & komunitas.",
    href: "https://jurnaltradingkumplit-yfte.vercel.app",
    external: true,
    tone: "from-[#3d2a0a] via-[#1a1208] to-[#0a0a0c]",
  },
  {
    title: "AI Shorts Pipeline",
    category: "02 — Produksi AI",
    blurb: "Highlight YouTube → short siap upload.",
    href: "/services",
    external: false,
    tone: "from-[#4a3208] via-[#14110c] to-[#050507]",
  },
  {
    title: "Brand Ad Pack",
    category: "03 — Iklan digital",
    blurb: "Set short multi-hook untuk campaign brand.",
    href: "/contact",
    external: false,
    tone: "from-[#3a2208] via-[#120e0a] to-[#050507]",
  },
  {
    title: "Company Profile Cut",
    category: "04 — Film",
    blurb: "Potongan sinematik untuk presentasi & web.",
    href: "/contact",
    external: false,
    tone: "from-[#2c2418] via-[#12100e] to-[#050507]",
  },
  {
    title: "Member Vault",
    category: "05 — Edukasi",
    blurb: "Kursus + template + update aset berkala.",
    href: "/courses",
    external: false,
    tone: "from-[#3d2e0c] via-[#16120a] to-[#050507]",
  },
  {
    title: "Automation Desk",
    category: "06 — AI ops",
    blurb: "Brief, FAQ, admin agar solo founder rapi.",
    href: "/contact",
    external: false,
    tone: "from-[#2a2418] via-[#10100f] to-[#050507]",
  },
]

export function Portfolio() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sec = section.current
    const tr = track.current
    if (!sec || !tr) return
    if (window.matchMedia("(max-width: 768px)").matches) return

    const ctx = gsap.context(() => {
      const getScroll = () => tr.scrollWidth - window.innerWidth + 64
      const tween = gsap.to(tr, {
        x: () => -getScroll(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getScroll()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      return () => tween.kill()
    }, sec)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={section} id="portfolio" className="relative bg-[#050507] overflow-hidden">
      <div className="ws-section-line absolute top-0 left-0 right-0 z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-amber-400/90 text-xs font-semibold tracking-[0.22em] uppercase mb-3">
              Selected works
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Karya yang <span className="gradient-text">bergerak</span>
            </h2>
            <p className="text-zinc-500 mt-3 max-w-md text-sm sm:text-base">
              Geser horizontal saat scroll (desktop) — rasa studio WebGL modern.
            </p>
          </div>
          <Link href="/contact" className="text-sm text-amber-200/90 hover:text-amber-100 inline-flex items-center gap-1" data-cursor="hover">
            Ajukan project <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="pb-20 lg:pb-28">
        <div
          ref={track}
          className="flex gap-5 px-4 sm:px-6 lg:px-8 w-max will-change-transform"
        >
          {projects.map((p) => {
            const card = (
              <article
                key={p.title}
                data-cursor="hover"
                className={`relative w-[82vw] sm:w-[420px] lg:w-[480px] h-[58vw] sm:h-[520px] rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-br ${p.tone} group`}
              >
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_30%_20%,rgba(255,210,100,0.28),transparent_45%)]" />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)] group-hover:translate-x-4 transition-transform duration-700" />
                <div className="absolute top-5 left-5 right-5 flex justify-between text-[10px] uppercase tracking-[0.2em] text-amber-200/70">
                  <span>{p.category}</span>
                  <span className="text-zinc-500">WS · 2026</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black via-black/70 to-transparent">
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-50 mb-2 group-hover:text-amber-100 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">{p.blurb}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-amber-300/90">
                    Explore <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            )

            if (p.external) {
              return (
                <a key={p.title} href={p.href} target="_blank" rel="noreferrer">
                  {card}
                </a>
              )
            }
            return (
              <Link key={p.title} href={p.href}>
                {card}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
