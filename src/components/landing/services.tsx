"use client"

import Link from "next/link"
import { siteContent } from "@/lib/content"
import { VideoCard } from "@/components/ui/video-card"
import { ArrowUpRight } from "lucide-react"

export function Services() {
  return (
    <section id="services" className="relative py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 mb-10 sm:mb-14">
        <p className="text-[11px] tracking-[0.3em] uppercase text-amber-400/90 mb-3">Layanan</p>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">
          Yang kami kerjakan
          <span className="gradient-text"> setiap hari</span>
        </h2>
      </div>

      <div className="flex flex-col">
        {siteContent.services.map((s, i) => (
          <Link
            key={s.id}
            href="/contact"
            data-cursor="hover"
            className="group relative min-h-[70vh] sm:min-h-[80vh] border-t border-white/10 overflow-hidden"
          >
            <VideoCard src={s.video} className="absolute inset-0" />
            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 h-full min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-end pb-12 sm:pb-16">
              <div className="flex items-end justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="text-amber-300/80 font-mono text-sm mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {s.title}
                  </h3>
                  <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="hidden sm:flex w-14 h-14 rounded-full border border-white/30 items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
