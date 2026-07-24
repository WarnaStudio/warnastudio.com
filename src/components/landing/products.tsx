import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowUpRight, TrendingUp, Video } from "lucide-react"

const products = [
  {
    icon: TrendingUp,
    title: "XAUUSD Journal",
    desc: "Trading journal AI untuk XAUUSD. Analisis, prediksi, dan tracking trading gold dengan bantuan AI.",
    href: "https://jurnal.warnastudio.com",
    target: "_blank",
    badge: "Live",
    accent: "from-amber-500/20 to-orange-500/20",
    iconBg: "from-amber-400 to-amber-700",
  },
  {
    icon: Video,
    title: "MoneyPrinterTurbo",
    desc: "AI short video generator. Input tema, AI buat script, material, subtitle, BGM, dan compose video otomatis.",
    href: "/mpt",
    target: undefined,
    badge: "New",
    accent: "from-violet-500/20 to-fuchsia-500/20",
    iconBg: "from-violet-500 to-fuchsia-600",
  },
]

export function Products() {
  return (
    <section id="products" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Produk Kami</h2>
          <p className="text-zinc-400">Tools & platform yang kami bangun untuk bisnis Anda</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {products.map((p) => {
            const Icon = p.icon
            return (
              <Link key={p.title} href={p.href} target={p.target}>
                <Card className={`group h-full p-8 glass hover:border-amber-500/30 transition-all cursor-pointer bg-gradient-to-br ${p.accent}`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.iconBg} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase bg-white/10 text-white/70">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-amber-200/90 transition-colors">{p.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">{p.desc}</p>
                  <div className="flex items-center gap-1.5 text-sm text-amber-300/80 group-hover:text-amber-200 transition-colors">
                    <span>Pelajari</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
