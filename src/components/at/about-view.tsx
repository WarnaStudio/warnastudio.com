"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { siteContent } from "@/lib/content"

export function AboutView() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".ab-rise", { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.09, ease: "power4.out" })
      gsap.fromTo(
        ".ab-fade",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07, delay: 0.4, ease: "power3.out" }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative min-h-[100svh] max-w-[1400px] mx-auto px-5 sm:px-8 pt-28 pb-24 flex flex-col justify-center">
      <p className="ab-fade font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">
        <span className="text-[#C64DFF]">About</span> · {siteContent.brand}
      </p>
      <h1 className="text-[12vw] sm:text-[6.5rem] font-medium leading-[0.9] tracking-[-0.04em] mb-10">
        <span className="block overflow-hidden">
          <span className="ab-rise block">WE BLEND</span>
        </span>
        <span className="block overflow-hidden">
          <span className="ab-rise block">STORY, ART</span>
        </span>
        <span className="block overflow-hidden">
          <span className="ab-rise block text-transparent" style={{ WebkitTextStroke: "1.1px rgba(255,255,255,0.88)" }}>
            &amp; TECHNOLOGY
          </span>
        </span>
      </h1>
      <p className="ab-fade max-w-2xl text-lg sm:text-xl text-white/50 font-light leading-relaxed mb-6">
        Kami tidak menjual template. Kami merancang momen yang membuat brand terasa mahal —
        lewat iklan pendek, film, AI pipeline, dan sistem belajar untuk tim internal.
      </p>
      <p className="ab-fade max-w-xl text-white/40 font-light leading-relaxed mb-12">
        {siteContent.tagline}. In-house makers. Quality &amp; performance.
      </p>

      <div className="ab-fade grid sm:grid-cols-3 gap-3 mb-12 max-w-4xl">
        {[
          ["Craft", "Hook, pacing, grade & sound dikurasi manusia."],
          ["System", "Pipeline AI yang bisa diulang tanpa drop quality."],
          ["Transfer", "Kursus & vault agar skill pindah ke tim Anda."],
        ].map(([t, d]) => (
          <div key={t} className="border border-white/10 bg-black/40 backdrop-blur-md p-6 min-h-[160px]">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C64DFF] mb-4">{t}</div>
            <p className="text-sm text-white/50 font-light">{d}</p>
          </div>
        ))}
      </div>

      <div className="ab-fade flex flex-wrap gap-3">
        <Link
          href="/work"
          data-cursor="hover"
          className="h-12 px-7 bg-white text-black font-mono text-[11px] tracking-[0.2em] uppercase inline-flex items-center hover:bg-[#C64DFF] hover:text-white transition-colors"
        >
          View work
        </Link>
        <Link
          href="/contact"
          data-cursor="hover"
          className="h-12 px-7 border border-white/25 font-mono text-[11px] tracking-[0.2em] uppercase inline-flex items-center hover:border-white transition-colors"
        >
          Contact
        </Link>
      </div>
    </section>
  )
}
