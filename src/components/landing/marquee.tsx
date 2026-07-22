"use client"

import { siteContent } from "@/lib/content"

const items = [
  "AI Short Ads",
  "Cinematic Cut",
  "Membership Vault",
  "Kursus Produksi",
  "Brand Campaign",
  "Scroll-stopping Creative",
  "WarnaStudio",
  "From Brief to Buy",
]

export function Marquee() {
  const row = [...items, ...items]
  return (
    <section className="relative border-y border-white/10 overflow-hidden py-5">
      <video
        src={siteContent.videos.ai}
        className="absolute inset-0 w-full h-full object-cover opacity-35"
        muted
        loop
        playsInline
        autoPlay
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="ws-marquee relative flex whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="mx-6 text-sm sm:text-base tracking-[0.25em] uppercase text-zinc-200 font-medium"
          >
            <span className="text-amber-400 mr-6">✦</span>
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
