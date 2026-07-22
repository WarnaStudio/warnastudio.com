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
    <section className="relative border-y border-white/[0.06] bg-black/40 overflow-hidden py-4">
      <div className="ws-marquee flex whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="mx-6 text-sm sm:text-base tracking-[0.25em] uppercase text-zinc-500 font-medium"
          >
            <span className="text-amber-400/70 mr-6">✦</span>
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
