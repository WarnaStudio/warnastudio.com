"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function MPTLandingPage() {
  const [lang, setLang] = useState<"id" | "en">("id")

  const content = {
    id: {
      meta: {
        title: "ViralClip AI - Generator Video Pendek Viral",
        description: "Buat video pendek viral dalam hitungan menit dengan AI. TikTok, YouTube Shorts, Reels dengan watermark gratis.",
      },
      hero: {
        badge: "Versi 2.0 Baru",
        badgeClass: "bg-gradient-to-r from-amber-500 to-amber-600",
        title: "Bikin Video Viral",
        subtitle: "Dari ide jadi video pendek viral dalam hitungan menit — semua otomatis, 100% gratis.",
        cta: "Mulai Sekarang Gratis",
        github: "Lihat di GitHub",
        features: [
          { icon: "smart_toy", text: "Dibuat dengan AI Canggih" },
          { icon: "subtitles", text: "Subtitle Karaoke Sync" },
          { icon: "water_drop", text: "Tanpa Watermark" },
          { icon: "auto_awesome", text: "50+ Bahasa" },
          { icon: "edit", text: "Branding Kustom" },
          { icon: "devices", text: "Multi-Platform" },
        ],
      },
      features: [
        {
          icon: "smart_toy",
          title: "AI Generator Script & Material",
          desc: "Cukup ketik ide, AI otomatis buat script, cari material video, dan thumbnail. Tinggal generate!",
        },
        {
          icon: "subtitles",
          title: "Subtitle Karaoke Otomatis",
          desc: "Subtitle tersinkron dengan voice over dengan efek highlight. Rapi, profesional, keren.",
        },
        {
          icon: "water_drop",
          title: "100% Gratis & Tanpa Watermark",
          desc: "Tidak ada biaya hidden. Tidak ada watermark. Konten Anda, branding Anda. Full kontrol.",
        },
        {
          icon: "auto_awesome",
          title: "50+ Bahasa Termasuk Indonesia",
          desc: "Support 50+ bahasa. Cocok untuk konten global, termasuk audience Indonesia.",
        },
        {
          icon: "edit",
          title: "Branding Kustom",
          desc: "Tambahkan logo WarnaStudio, watermark kustom, dan elemen branding sendiri. Pro!",
        },
        {
          icon: "devices",
          title: "Optimized untuk TikTok, Shorts, Reels",
          desc: "Format 9:16 portrait. Max resolution 1080p. Siap upload langsung ke semua platform.",
        },
      ],
      steps: [
        { step: 1, title: "Input Ide", desc: "Ketik topik atau keyword video yang ingin dibuat." },
        { step: 2, title: "AI Generate", desc: "AI buat script, cari material, generate voice over, subtitle, dan BGM. Semua otomatis." },
        { step: 3, title: "Generate & Download", desc: "One-click generate video dengan subtitle dan watermark gratis. Siap upload ke TikTok, YouTube Shorts, Reels." },
      ],
      stats: [
        { stat: "50+", label: "Bahasa" },
        { stat: "1000+", label: "Pengguna" },
        { stat: "60s", label: "Rata-rata Generate" },
        { stat: "Gratis", label: "Selamanya" },
      ],
      cta: {
        title: "Siap Bikin Video Viral?",
        subtitle: "Gabung ribuan konten kreator yang menggunakan AI untuk generate video pendek dalam menit. Gratis, tanpa watermark, 100% lokal.",
        button1: "Mulai Gratis Sekarang",
        button2: "Lihat Dokumentasi",
      },
      footer: {
        product: "ViralClip AI",
        description: "Generator video pendek berbasis AI untuk konten kreator. Bikin video viral dalam menit, 100% gratis, tanpa watermark.",
        productLinks: ["Fitur", "Dokumentasi", "GitHub"],
        companyLinks: ["WarnaStudio", "FAQ"],
        connect: "Terhubung",
        githubIcon: "github",
      },
    },
    en: {
      meta: {
        title: "ViralClip AI - Viral Short Video Generator",
        description: "Generate viral short videos in minutes with AI. TikTok, YouTube Shorts, Reels with watermark free.",
      },
      hero: {
        badge: "New Version 2.0",
        badgeClass: "bg-gradient-to-r from-violet-500 to-fuchsia-600",
        title: "Create Viral Videos",
        subtitle: "From idea to viral short video in minutes — all automated, 100% free, no watermark.",
        cta: "Start Free Now",
        github: "View on GitHub",
        features: [
          { icon: "smart_toy", text: "Powered by Advanced AI" },
          { icon: "subtitles", text: "Karaoke Subtitle Sync" },
          { icon: "water_drop", text: "Watermark-Free" },
          { icon: "auto_awesome", text: "50+ Languages" },
          { icon: "edit", text: "Custom Branding" },
          { icon: "devices", text: "Multi-Platform" },
        ],
      },
      features: [
        {
          icon: "smart_toy",
          title: "AI Script & Material Generator",
          desc: "Just type your idea, AI automatically creates script, finds video materials, and thumbnails. Just generate!",
        },
        {
          icon: "subtitles",
          title: "Automated Karaoke Subtitles",
          desc: "Synchronized subtitles with highlight effects and voice over. Clean, professional, cool.",
        },
        {
          icon: "water_drop",
          title: "100% Free & Watermark-Free",
          desc: "No hidden costs. No watermark. Your content, your brand. Full control.",
        },
        {
          icon: "auto_awesome",
          title: "50+ Languages Including Indonesian",
          desc: "Support for 50+ languages. Perfect for global content, including Indonesian audience.",
        },
        {
          icon: "edit",
          title: "Custom Branding",
          desc: "Add WarnaStudio logo, custom watermark, and your own branding elements. Pro!",
        },
        {
          icon: "devices",
          title: "Optimized for TikTok, Shorts, Reels",
          desc: "9:16 portrait format. Max resolution 1080p. Ready to upload directly to all platforms.",
        },
      ],
      steps: [
        { step: 1, title: "Input Idea", desc: "Type a video topic or keyword you want to create content about." },
        { step: 2, title: "AI Generate", desc: "AI creates script, finds materials, generates voice over, subtitles, and BGM. All automated." },
        { step: 3, title: "Generate & Download", desc: "One-click generate video with subtitles and watermark-free output. Ready to upload to TikTok, YouTube Shorts, Reels." },
      ],
      stats: [
        { stat: "50+", label: "Languages" },
        { stat: "1000+", label: "Users" },
        { stat: "60s", label: "Avg. Generation" },
        { stat: "Free", label: "Forever" },
      ],
      cta: {
        title: "Ready to Create Viral Videos?",
        subtitle: "Join thousands of content creators using AI to generate short videos in minutes. Free, no watermark, 100% local.",
        button1: "Start Free Now",
        button2: "View Documentation",
      },
      footer: {
        product: "ViralClip AI",
        description: "AI-powered short video generator for content creators. Create viral videos in minutes, 100% free, no watermark.",
        productLinks: ["Features", "Documentation", "GitHub"],
        companyLinks: ["WarnaStudio", "FAQ"],
        connect: "Connect",
        githubIcon: "github",
      },
    },
  }

  useEffect(() => {
    document.title = lang === "id" ? content.id.meta.title : content.en.meta.title
  }, [lang])

  const t = content[lang]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-600 rounded-xl p-1 flex gap-1">
          <button
            onClick={() => setLang("id")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              lang === "id"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ID
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              lang === "en"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20">
                <span className={`text-amber-400 font-medium ${t.hero.badgeClass}`}>{t.hero.badge}</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                {t.hero.title}
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {t.hero.title}
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/mpt/docs"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
                >
                  {t.hero.cta}
                </Link>
                <Link
                  href="https://github.com/WarnaStudio/warnastudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  {t.hero.github}
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                {t.hero.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 p-6 shadow-2xl">
                <div className="h-full rounded-2xl bg-gradient-to-b from-slate-600 to-slate-700 p-8 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">3 Easy Steps</div>
                    <div className="text-slate-300">From script to viral video</div>
                  </div>
                  <div className="space-y-3 w-full">
                    {t.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                          {step.step}
                        </div>
                        <span className="text-slate-200">{step.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{t.features[0].title}</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Fitur lengkap untuk memproduksi video pendek profesional secara otomatis.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 hover:border-amber-500/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/25">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`M12 4v16m8-8H4`} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">{lang === "id" ? "Cara Kerja" : "How It Works"}</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {lang === "id"
                ? "Buat video pertama Anda hanya dalam 3 langkah mudah"
                : "Create your first video in just 3 simple steps"}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.steps.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/25">
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed max-w-sm mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {t.stats.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
                  {item.stat}
                </div>
                <div className="text-slate-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-amber-600 p-12 md:p-16">
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                {t.cta.title}
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                {t.cta.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/mpt/docs"
                  className="px-8 py-4 bg-white text-amber-600 font-semibold rounded-xl hover:bg-slate-100 transition-all shadow-lg"
                >
                  {t.cta.button1}
                </Link>
                <Link
                  href="https://github.com/WarnaStudio/warnastudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                >
                  {t.cta.button2}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">{t.footer.product}</h3>
              <p className="text-slate-400">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t.footer.productLinks[0]}</h4>
              <ul className="space-y-2">
                <li><Link href="/viralclip" className="text-slate-400 hover:text-amber-400 transition-colors">{t.footer.productLinks[0]}</Link></li>
                <li><Link href="/viralclip/docs" className="text-slate-400 hover:text-amber-400 transition-colors">{t.footer.productLinks[1]}</Link></li>
                <li><Link href="https://github.com/WarnaStudio/warnastudio.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">{t.footer.productLinks[2]}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t.footer.companyLinks[0]}</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-slate-400 hover:text-amber-400 transition-colors">{t.footer.companyLinks[0]}</Link></li>
                <li><Link href="/viralclip/faq" className="text-slate-400 hover:text-amber-400 transition-colors">{t.footer.companyLinks[1]}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t.footer.connect}</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/WarnaStudio/warnastudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>© 2024 WarnaStudio. {t.footer.product} is open source.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}