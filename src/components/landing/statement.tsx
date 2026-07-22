"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Statement() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll(".st-word")
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const line1 = "Kami tidak menjual template."
  const line2 = "Kami merancang momen yang membuat brand terasa mahal."

  const wrap = (text: string) =>
    text.split(" ").map((w, i) => (
      <span key={`${w}-${i}`} className="inline-block overflow-hidden mr-[0.3em] align-bottom">
        <span className="st-word inline-block">{w}</span>
      </span>
    ))

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0808] via-[#050507] to-[#0a0a05]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_50%,rgba(245,158,11,0.07),transparent_60%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-amber-500/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-amber-400/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-amber-300 mb-8">Manifesto</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-zinc-50 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
          <span className="block mb-3">{wrap(line1)}</span>
          <span className="block gradient-text">{wrap(line2)}</span>
        </h2>
      </div>
    </section>
  )
}
