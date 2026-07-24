"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { siteContent } from "@/lib/content"
import { VideoCard } from "@/components/ui/video-card"

gsap.registerPlugin(ScrollTrigger)

const AtScene = dynamic(() => import("@/components/at/scene").then((m) => m.AtScene), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
})

/** Full Active Theory–style scroll journey: Home → Work → Services → About → Contact */
export function AtExperience() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".at-rise",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.15, stagger: 0.09, ease: "power4.out", delay: 0.15 }
      )
      gsap.fromTo(
        ".at-fade",
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.06, delay: 0.55, ease: "power3.out" }
      )

      // URL mirrors Active Theory: scroll into work → /work
      ScrollTrigger.create({
        trigger: "#stage-work",
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => {
          if (window.location.pathname !== "/work") {
            window.history.replaceState(null, "", "/work")
          }
        },
        onEnterBack: () => {
          if (window.location.pathname !== "/work") {
            window.history.replaceState(null, "", "/work")
          }
        },
        onLeaveBack: () => {
          if (window.location.pathname !== "/") {
            window.history.replaceState(null, "", "/")
          }
        },
      })

      ScrollTrigger.create({
        trigger: "#stage-services",
        start: "top 50%",
        onEnter: () => window.history.replaceState(null, "", "/#services"),
      })

      ScrollTrigger.create({
        trigger: "#stage-about",
        start: "top 50%",
        onEnter: () => window.history.replaceState(null, "", "/about"),
        onEnterBack: () => window.history.replaceState(null, "", "/about"),
      })

      ScrollTrigger.create({
        trigger: "#stage-contact",
        start: "top 55%",
        onEnter: () => window.history.replaceState(null, "", "/contact"),
      })

      gsap.utils.toArray<HTMLElement>(".at-reveal").forEach((node) => {
        gsap.fromTo(
          node,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 82%" },
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="bg-black text-white">
      {/* ═══ HOME ═══ */}
      <section id="stage-home" className="relative min-h-[100svh] overflow-hidden">
        <AtScene />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/50 pointer-events-none" />
        <div className="ws-grain absolute inset-0 opacity-[0.08] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 min-h-[100svh] flex flex-col justify-end pb-20 pt-28">
          <p className="at-fade font-mono text-[10px] tracking-[0.35em] uppercase text-white/40 mb-6">
            Founded for makers · AI Ads · Film · Learning
          </p>
          <h1 className="text-[14vw] sm:text-[9vw] lg:text-[7.2rem] font-medium leading-[0.88] tracking-[-0.045em] mb-8">
            <span className="block overflow-hidden">
              <span className="at-rise block">WARNA</span>
            </span>
            <span className="block overflow-hidden">
              <span className="at-rise block">STUDIO</span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="at-rise block text-transparent"
                style={{ WebkitTextStroke: "1.15px rgba(255,255,255,0.88)" }}
              >
                EXPERIENCES
              </span>
            </span>
          </h1>
          <p className="at-fade max-w-lg text-white/50 text-base sm:text-lg font-light leading-relaxed mb-10">
            {siteContent.tagline}. Kami blend story, craft &amp; technology — iklan pendek, film
            brand, AI pipeline, kursus &amp; membership.
          </p>
          <div className="at-fade flex flex-wrap gap-3">
            <a
              href="#stage-work"
              data-cursor="hover"
              className="inline-flex items-center gap-2 h-12 px-7 bg-white text-black font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#C64DFF] hover:text-white transition-colors"
            >
              Enter work <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              data-cursor="hover"
              className="inline-flex items-center gap-2 h-12 px-7 border border-white/25 font-mono text-[11px] tracking-[0.2em] uppercase hover:border-white transition-colors"
            >
              Start project
            </Link>
          </div>

          <a
            href="#stage-work"
            className="at-fade absolute bottom-8 right-5 sm:right-10 hidden sm:flex flex-col items-center gap-3 font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 hover:text-white/60"
            data-cursor="hover"
          >
            Scroll
            <span className="w-px h-16 bg-gradient-to-b from-[#C64DFF] to-transparent" />
            Work
          </a>
        </div>
      </section>

      {/* ═══ WORK (appears on scroll — like AT /work) ═══ */}
      <section id="stage-work" className="relative border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-24 pb-10">
          <div className="at-reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-white/35 mb-4">
                <span className="text-[#C64DFF]">01</span> · Work
              </div>
              <h2 className="text-[12vw] sm:text-7xl font-medium tracking-[-0.04em] leading-none">WORK</h2>
              <p className="mt-4 max-w-md text-white/45 font-light">
                Selected production dari layanan WarnaStudio. Klik panel untuk masuk experience detail.
              </p>
            </div>
            <Link
              href="/work"
              data-cursor="hover"
              className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white inline-flex items-center gap-2"
            >
              Full gallery <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pb-24 grid md:grid-cols-2 gap-3">
          {siteContent.works.map((w, i) => (
            <Link
              key={w.slug}
              href={`/work/${w.slug}`}
              data-cursor="hover"
              className={`at-reveal group relative overflow-hidden border border-white/10 min-h-[420px] sm:min-h-[480px] ${
                i % 5 === 0 ? "md:col-span-2 md:min-h-[56vh]" : ""
              }`}
            >
              <VideoCard src={w.video} dim={32} priority={i < 2} />
              <div
                className="absolute inset-0 opacity-35 mix-blend-screen group-hover:opacity-60 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 35% 30%, ${w.accent}70, transparent 55%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">
                  <span className="border border-white/20 px-2 py-1 bg-black/40 backdrop-blur-sm">{w.category}</span>
                  <span>
                    {String(i + 1).padStart(2, "0")} · {w.year}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-medium tracking-tight mb-2 group-hover:translate-x-1 transition-transform">
                    {w.title}
                  </h3>
                  <p className="text-white/55 font-light max-w-md text-sm sm:text-base">{w.blurb}</p>
                  <div className="mt-5 font-mono text-[10px] tracking-[0.22em] uppercase text-white/70 inline-flex items-center gap-2">
                    <span className="w-7 h-px group-hover:w-12 transition-all" style={{ background: w.accent }} />
                    Open experience
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES boxes ═══ */}
      <section id="stage-services" className="border-t border-white/10 py-24">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="at-reveal mb-14">
            <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-white/35 mb-4">
              <span className="text-[#C64DFF]">02</span> · Services
            </div>
            <h2 className="text-4xl sm:text-6xl font-medium tracking-tight">
              What we ship
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {siteContent.services.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                data-cursor="hover"
                className="at-reveal group relative min-h-[280px] border border-white/10 bg-white/[0.02] p-7 overflow-hidden hover:border-[#C64DFF]/45 hover:-translate-y-1 transition-all duration-400"
              >
                <div className="absolute -top-16 -right-12 w-36 h-36 rounded-full bg-[#C64DFF]/0 group-hover:bg-[#C64DFF]/25 blur-3xl transition-all" />
                <div className="relative flex flex-col h-full min-h-[240px]">
                  <span className="font-mono text-[11px] text-white/35 tracking-[0.16em] mb-10">{s.num}</span>
                  <h3 className="text-xl sm:text-2xl font-medium mb-3">{s.title}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed flex-1">{s.desc}</p>
                  <ul className="flex flex-wrap gap-1.5 mt-6">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="font-mono text-[9px] tracking-[0.12em] uppercase border border-white/10 px-2 py-1 text-white/35"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>

          {/* packages as boxes too */}
          <div className="at-reveal mt-16 grid md:grid-cols-3 gap-3" id="packages">
            {siteContent.packages.map((p) => (
              <div
                key={p.name}
                className={`border p-7 min-h-[260px] flex flex-col ${
                  p.popular
                    ? "border-[#C64DFF]/45 bg-gradient-to-b from-[#C64DFF]/10 to-transparent"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">{p.tag}</div>
                <h3 className="text-2xl font-medium mb-1">{p.name}</h3>
                <p className="text-[#C64DFF] text-sm mb-6">{p.highlight}</p>
                <ul className="space-y-2 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm text-white/50 font-light">
                      — {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  data-cursor="hover"
                  className="mt-6 inline-flex font-mono text-[10px] tracking-[0.18em] uppercase text-white/70 hover:text-white"
                >
                  Order →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="stage-about" className="border-t border-white/10 py-24 min-h-[80vh] flex items-center">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 w-full">
          <div className="at-reveal font-mono text-[11px] tracking-[0.28em] uppercase text-white/35 mb-6">
            <span className="text-[#C64DFF]">03</span> · About
          </div>
          <h2 className="at-reveal text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight max-w-4xl leading-[1.05] mb-8">
            Kami tidak menjual template.
            <span className="block text-white/40 mt-2">
              Kami merancang momen yang membuat brand terasa mahal.
            </span>
          </h2>
          <p className="at-reveal max-w-2xl text-white/50 font-light text-lg leading-relaxed mb-12">
            WarnaStudio adalah creative technology studio: produksi iklan &amp; video berbasis AI,
            plus membership vault dan kursus agar tim Anda punya mesin konten sendiri.
          </p>
          <div className="at-reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-3xl">
            {[
              ["Jasa", "Iklan · Film · AI"],
              ["Member", "Vault + update"],
              ["Kursus", "Produksi AI"],
              ["Retainer", "Konten bulanan"],
            ].map(([a, b]) => (
              <div key={a} className="bg-black px-4 py-5">
                <div className="font-mono text-[10px] tracking-[0.18em] text-[#C64DFF] mb-1">{a}</div>
                <div className="text-sm text-white/50 font-light">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="border-t border-white/10 py-20">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="at-reveal font-mono text-[11px] tracking-[0.28em] uppercase text-white/35 mb-10">
            <span className="text-[#C64DFF]">04</span> · Process
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 border border-white/10">
            {[
              ["01", "Brief", "Isi form / chat — tujuan, audience, referensi, deadline."],
              ["02", "Produksi", "Riset angle, script, edit AI-assisted, QC manusia."],
              ["03", "Preview", "Anda review. Revisi sesuai kuota paket."],
              ["04", "Deliver", "File final + packing platform. Member/kursus opsional."],
            ].map(([n, t, d], i) => (
              <div
                key={n}
                className={`at-reveal p-7 min-h-[220px] ${i < 3 ? "border-b sm:border-b-0 lg:border-r border-white/10" : ""} ${i === 1 ? "sm:border-r lg:border-r" : ""} ${i < 2 ? "sm:border-b lg:border-b-0 border-white/10" : ""}`}
              >
                <div className="font-mono text-[11px] text-[#C64DFF] mb-8">{n}</div>
                <h3 className="text-xl font-medium mb-2">{t}</h3>
                <p className="text-sm text-white/45 font-light leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="stage-contact" className="border-t border-white/10 py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 text-center">
          <div className="at-reveal font-mono text-[11px] tracking-[0.28em] uppercase text-white/35 mb-6">
            <span className="text-[#C64DFF]">05</span> · Contact
          </div>
          <h2 className="at-reveal text-5xl sm:text-7xl font-medium tracking-tight mb-6">
            LET&apos;S BUILD
          </h2>
          <p className="at-reveal text-white/45 font-light max-w-md mx-auto mb-10">
            Ceritakan brief Anda — atau gabung member untuk vault, kursus, dan update aset.
          </p>
          <div className="at-reveal flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-white text-black font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#C64DFF] hover:text-white transition-colors"
            >
              Start project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 border border-white/25 font-mono text-[11px] tracking-[0.2em] uppercase hover:border-white transition-colors"
            >
              Join member
            </Link>
            <Link
              href="/courses"
              data-cursor="hover"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 border border-white/25 font-mono text-[11px] tracking-[0.2em] uppercase hover:border-white transition-colors"
            >
              Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
