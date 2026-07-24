"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { WorkItem } from "@/lib/content"
import { siteContent } from "@/lib/content"
import { VideoCard } from "@/components/ui/video-card"

export function WorkDetailView({ work }: { work: WorkItem }) {
  const root = useRef<HTMLElement>(null)
  const idx = siteContent.works.findIndex((w) => w.slug === work.slug)
  const prev = siteContent.works[(idx - 1 + siteContent.works.length) % siteContent.works.length]
  const next = siteContent.works[(idx + 1) % siteContent.works.length]

  useEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      tl.fromTo(".wd-veil", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.8 })
        .fromTo(".wd-rise", { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.07 }, "-=0.45")
        .fromTo(".wd-fade", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.06 }, "-=0.55")
        .fromTo(
          ".wd-card",
          { autoAlpha: 0, y: 40, rotateX: 8 },
          { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.08 },
          "-=0.4"
        )
    }, el)
    return () => ctx.revert()
  }, [work.slug])

  return (
    <article ref={root} className="relative text-white">
      {/* entry veil */}
      <div className="wd-veil fixed inset-0 z-40 bg-black pointer-events-none" />

      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <VideoCard src={work.video} dim={18} priority active fallback="#120818" />
          <div
            className="absolute inset-0 mix-blend-screen opacity-50"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${work.accent}70, transparent 55%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/40" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 min-h-[100svh] flex flex-col justify-end pb-16 pt-28">
          <Link
            href="/work"
            data-cursor="hover"
            className="wd-fade mb-10 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.24em] uppercase text-white/50 hover:text-white w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All work
          </Link>

          <div className="wd-fade flex flex-wrap gap-3 mb-5 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
            <span className="border border-white/25 px-2 py-1">{work.category}</span>
            <span className="py-1">
              {work.year} · {work.client}
            </span>
          </div>

          <h1 className="text-[12vw] sm:text-[6rem] font-medium leading-[0.9] tracking-[-0.04em] mb-6 overflow-hidden">
            <span className="wd-rise block">{work.title}</span>
          </h1>

          <p className="wd-fade max-w-2xl text-white/60 font-light text-base sm:text-xl leading-relaxed mb-10">
            {work.summary}
          </p>

          <div className="wd-fade grid grid-cols-3 gap-px bg-white/10 border border-white/10 max-w-md overflow-hidden">
            {work.stats.map((s) => (
              <div key={s.label} className="bg-black/55 backdrop-blur-md px-4 py-4">
                <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-white/40 mb-1">{s.label}</div>
                <div className="text-lg font-medium" style={{ color: work.accent }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-12 grid sm:grid-cols-3 gap-8">
          <div className="wd-fade">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-3">Role</div>
            <ul className="space-y-1 text-white/75 font-light">
              {work.role.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="wd-fade">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-3">Services</div>
            <div className="flex flex-wrap gap-2">
              {work.services.map((s) => (
                <span key={s} className="font-mono text-[10px] tracking-[0.12em] uppercase border border-white/15 px-2 py-1 text-white/55">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="wd-fade">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-3">Next</div>
            <Link href="/contact" data-cursor="hover" className="text-xl font-medium hover:text-[#C64DFF] transition-colors">
              Start similar project →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 py-20 perspective-[1200px]">
        <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-white/35 mb-10">
          <span style={{ color: work.accent }}>Chapters</span>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {work.chapters.map((c, i) => (
            <div
              key={c.title}
              data-cursor="hover"
              className="wd-card min-h-[260px] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-7 hover:border-white/25 transition-colors"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="font-mono text-[11px] text-white/35 mb-8">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-2xl font-medium mb-3">{c.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{c.body}</p>
              <div className="mt-8 h-px w-10" style={{ background: work.accent }} />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 grid md:grid-cols-2 border-t border-white/10">
        <Link
          href={`/work/${prev.slug}`}
          data-cursor="hover"
          className="group p-8 sm:p-12 border-b md:border-b-0 md:border-r border-white/10 hover:bg-white/[0.02] transition-colors"
        >
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-3 flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </div>
          <div className="text-2xl sm:text-3xl font-medium group-hover:translate-x-1 transition-transform">{prev.title}</div>
        </Link>
        <Link
          href={`/work/${next.slug}`}
          data-cursor="hover"
          className="group p-8 sm:p-12 text-right hover:bg-white/[0.02] transition-colors"
        >
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-3 flex items-center gap-2 justify-end">
            Next <ArrowRight className="w-3.5 h-3.5" />
          </div>
          <div className="text-2xl sm:text-3xl font-medium group-hover:-translate-x-1 transition-transform">{next.title}</div>
        </Link>
      </section>
    </article>
  )
}
