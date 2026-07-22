"use client"

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
      <div className="absolute inset-0 bg-gradient-to-r from-amber-950/70 via-zinc-950 to-rose-950/60" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_60px,rgba(245,158,11,0.015)_60px,rgba(245,158,11,0.015)_61px)]" />
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
