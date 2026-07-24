import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Video, Sparkles, Music, Captions, Film, Zap, Globe, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "MoneyPrinterTurbo — AI Short Video Generator",
  description:
    "Generate short video dari tema atau keyword. AI buat script, match素材, subtitle, background music, dan合成高清短视频 — otomatis.",
}

const features = [
  { icon: Video, title: "Auto Script & Material", desc: "Cukup input tema atau keyword, AI generate script dan cari material video relevan otomatis." },
  { icon: Captions, title: "Subtitle Otomatis", desc: "Subtitle tersinkron dengan voice over. Pilih Edge TTS atau Whisper untuk akurasi tinggi." },
  { icon: Music, title: "Background Music", desc: "Library BGM built-in atau upload sendiri. Mixing otomatis dengan voice over." },
  { icon: Film, title: "Multi-Aspect Ratio", desc: "Output portrait (9:16), landscape (16:9), atau square (1:1) — siap untuk semua platform." },
  { icon: Zap, title: "Batch Generation", desc: "Generate multiple video sekaligus dengan konfigurasi berbeda. Hemat waktu produksi." },
  { icon: Globe, title: "Multi-Language", desc: "Dukung 50+ bahasa untuk voice over dan subtitle. Target pasar global." },
]

const steps = [
  { num: "01", title: "Input Tema", desc: "Masukkan topik atau keyword video yang ingin dibuat." },
  { num: "02", title: "AI Generate", desc: "AI buat script, cari material, generate voice over, subtitle, dan BGM." },
  { num: "03", title: "Review & Edit", desc: "Preview hasil, adjust parameter, regenerate jika perlu." },
  { num: "04", title: "Download", desc: "Export video HD siap upload ke Shorts, Reels, TikTok." },
]

export default function MPTPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,85,247,0.08),transparent_60%)] pointer-events-none" />
        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Video Production
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            MoneyPrinter<span className="text-violet-400">Turbo</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8">
            Generate short video dari tema atau keyword. AI buat script, match素材,
            subtitle, background music, dan合成高清短视频 — semua otomatis dalam hitungan menit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                <Zap className="w-4 h-4" />
                Coba Sekarang
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="ghost" size="lg">
                Pelajari Fitur
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: "50+", label: "Bahasa didukung" },
            { value: "3", label: "Format aspect ratio" },
            { value: "< 5 min", label: "Waktu generate" },
            { value: "HD", label: "Kualitas output" },
          ].map((s) => (
            <Card key={s.label} className="p-6 glass text-center">
              <div className="text-3xl font-bold text-violet-400 mb-1">{s.value}</div>
              <div className="text-sm text-zinc-500">{s.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Fitur Utama</h2>
          <p className="text-zinc-400">Semua yang dibutuhkan untuk produksi short video otomatis</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <Card key={f.title} className="p-6 glass hover:border-violet-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
              </Card>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cara Kerja</h2>
          <p className="text-zinc-400">Dari ide ke video siap upload dalam 4 langkah</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="relative">
              <div className="text-5xl font-bold text-violet-500/20 mb-3">{s.num}</div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="relative overflow-hidden p-12 glass text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.1),transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-4">Siap Produksi Video Otomatis?</h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Hubungi kami untuk demo dan akses ke MoneyPrinterTurbo.
              Scale konten Anda tanpa ribet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  <Download className="w-4 h-4" />
                  Hubungi Kami
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="ghost" size="lg">
                  Lihat Kursus
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
