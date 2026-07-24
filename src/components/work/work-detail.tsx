"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import type { WorkItem } from "@/lib/content"
import { siteContent } from "@/lib/content"
import { VideoCard } from "@/components/ui/video-card"

export function WorkDetail({ work }: { work: WorkItem }) {
  const root = useRef<HTMLElement>(null)
  const idx = siteContent.works.findIndex((w) => w.slug === work.slug)
  const prev = siteContent.works[(idx - 1 + siteContent.works.length) % siteContent.works.length]
  const next = siteContent.works[(idx + 1) % siteContent.works.length]

  useEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(".wd-rise", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.08 })
        .fromTo(".wd-fade", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, "-=0.5")
    }, el)
    return () => ctx.revert()
  }, [work.slug])

  return (
    <article ref={root} className="relative bg-black text-white min-h-screen">
      {/* Hero stage */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <VideoCard src={work.video} dim={25} priority className="!absolute !inset-0" />
          <div
            className="absolute inset-0 mix-blend-screen opacity-50"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${work.accent}66, transparent 55%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
          <div className="ws-grain absolute inset-0 opacity-[0.1] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 min-h-[100svh] flex flex-col justify-end pb-16 pt-28">
          <Link
            href="/work"
            data-cursor="hover"
            className="wd-fade mb-10 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-white/55 hover:text-white transition-colors w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All work
          </Link>

          <div className="wd-fade flex flex-wrap gap-3 mb-6">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase border border-white/25 px-2.5 py-1 bg-black/40">
              {work.category}
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/45">
              {work.year} · {work.client}
            </span>
          </div>

          <h1 className="text-[12vw] sm:text-[6.5rem] font-medium leading-[0.9] tracking-[-0.04em] mb-6 max-w-5xl">
            <span className="block overflow-hidden">
              <span className="wd-rise block">{work.title}</span>
            </span>
          </h1>

          <p className="wd-fade max-w-2xl text-base sm:text-xl text-white/60 font-light leading-relaxed mb-10">
            {work.summary}
          </p>

          <div className="wd-fade grid grid-cols-3 gap-px bg-white/10 border border-white/10 max-w-lg overflow-hidden">
            {work.stats.map((s) => (
              <div key={s.label} className="bg-black/60 backdrop-blur-md px-4 py-4">
                <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-white/40 mb-1">
                  {s.label}
                </div>
                <div className="text-lg sm:text-xl font-medium" style={{ color: work.accent }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="border-y border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35 mb-3">Role</div>
            <ul className="space-y-1.5">
              {work.role.map((r) => (
                <li key={r} className="text-white/80 font-light">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35 mb-3">Services</div>
            <div className="flex flex-wrap gap-2">
              {work.services.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] tracking-[0.14em] uppercase border border-white/15 px-2.5 py-1 text-white/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35 mb-3">Next step</div>
            <Link
              href="/contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
            >
              <span className="text-lg font-medium">Start a similar project</span>
              <ArrowUpRight className="w-5 h-5" style={{ color: work.accent }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Chapters — interactive cards */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-white/35 mb-10">
          <span style={{ color: work.accent }}>02</span> · Process chapters
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {work.chapters.map((c, i) => (
            <div
              key={c.title}
              data-cursor="hover"
              className="group relative min-h-[280px] border border-white/10 bg-white/[0.02] p-6 sm:p-7 overflow-hidden transition-all duration-500 hover:border-white/25 hover:-translate-y-1"
            >
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-500"
                style={{ background: work.accent }}
              />
              <div className="relative z-10 flex flex-col h-full">
                <span className="font-mono text-[11px] tracking-[0.18em] text-white/35 mb-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl font-medium tracking-tight mb-4">{c.title}</h3>
                <p className="text-white/55 font-light leading-relaxed text-sm sm:text-base flex-1">
                  {c.body}
                </p>
                <div
                  className="mt-8 h-px w-10 group-hover:w-full transition-all duration-500"
                  style={{ background: work.accent }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full bleed video stage */}
      <section className="relative h-[70vh] sm:h-[85vh] border-y border-white/10 overflow-hidden">
        <VideoCard src={work.video} dim={15} className="!absolute !inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        <div className="absolute bottom-8 left-5 sm:left-8 right-5 sm:right-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/45 mb-2">
              Immersive stage
            </div>
            <p className="text-2xl sm:text-3xl font-medium max-w-md">{work.blurb}</p>
          </div>
          <Link
            href="/contact"
            data-cursor="hover"
            className="inline-flex items-center gap-2 border border-white/30 bg-white text-black px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] uppercase hover:bg-[#C64DFF] hover:text-white hover:border-[#C64DFF] transition-colors"
          >
            Brief us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="grid md:grid-cols-2 border-b border-white/10">
        <Link
          href={`/work/${prev.slug}`}
          data-cursor="hover"
          className="group relative min-h-[240px] border-b md:border-b-0 md:border-r border-white/10 p-8 sm:p-10 overflow-hidden hover:bg-white/[0.02] transition-colors"
        >
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35 mb-4 flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </div>
          <div className="text-2xl sm:text-3xl font-medium group-hover:translate-x-1 transition-transform">
            {prev.title}
          </div>
          <div className="mt-2 text-white/40 font-mono text-[11px] tracking-[0.16em] uppercase">
            {prev.category}
          </div>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          data-cursor="hover"
          className="group relative min-h-[240px] p-8 sm:p-10 overflow-hidden hover:bg-white/[0.02] transition-colors text-right"
        >
          <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/35 mb-4 flex items-center gap-2 justify-end">
            Next <ArrowRight className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl sm:text-3xl font-medium group-hover:-translate-x-1 transition-transform">
            {next.title}
          </div>
          <div className="mt-2 text-white/40 font-mono text-[11px] tracking-[0.16em] uppercase">
            {next.category}
          </div>
        </Link>
      </section>
    </article>
  )
}
