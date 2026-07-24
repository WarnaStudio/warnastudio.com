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

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.services.map((s, i) => (
            <Link
              key={s.id}
              href="/contact"
              data-cursor="hover"
              className="group relative overflow-hidden bg-black/40 border border-white/10 transition-all duration-500 hover:border-amber-400/40 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/9]">
                <VideoCard src={s.video} dim={35} active priority={i < 2} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="p-6 sm:p-8">
                <div className="text-amber-300/80 font-mono text-sm mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {s.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  {s.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-amber-400/80">
                    Lihat detail
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-400 transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
