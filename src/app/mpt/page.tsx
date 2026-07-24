import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ViralClip AI by WarnaStudio - AI Short Video Generator",
  description: "Generate viral short videos in minutes with AI. Local TikTok/YouTube Shorts/Reels generator with no watermark.",
  openGraph: {
    title: "ViralClip AI - AI Short Video Generator",
    description: "Generate viral short videos with AI. Fast, free, no watermark.",
    images: ["/images/mpt-og.jpg"],
    type: "website",
    url: "https://viralclip.warnastudio.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ViralClip AI - AI Short Video Generator",
    description: "Generate viral short videos with AI. Fast, free, no watermark.",
    images: ["/images/mpt-twitter.jpg"],
  },
  icons: {
    icon: ["/favicon.ico"],
    shortcut: ["/favicon-16x16.png"],
    apple: ["/apple-touch-icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function MPTLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent" />
        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                <span className="text-amber-400 font-medium">New Version 2.0</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                AI Short Video
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  Generator
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                Generate viral short videos in minutes with AI. Fast, local, and completely free of watermarks.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/mpt/docs"
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
                >
                  Get Started Free
                </Link>
                <Link
                  href="https://github.com/WarnaStudio/warnastudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  View on GitHub
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No Watermark</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Local Processing</span>
                </div>
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
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-sm">1</div>
                      <span className="text-slate-200">Enter video subject</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                      <span className="text-slate-200">AI generates script & keywords</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold text-sm">3</div>
                      <span className="text-slate-200">Generate and download video</span>
                    </div>
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
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Powerful AI-driven features to create professional short videos effortlessly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "smart_toy",
                title: "AI-Powered Generation",
                description: "Generate scripts, keywords, and thumbnails automatically with AI.",
              },
              {
                icon: "subtitles",
                title: "Auto Subtitles",
                description: "Generate karaoke-style subtitles with highlight effects.",
              },
              {
                icon: "water_drop",
                title: "Watermark-Free",
                description: "Completely free of watermarks. Your content, your brand.",
              },
              {
                icon: "auto_awesome",
                title: "Multiple Languages",
                description: "Support for 50+ languages including Indonesian.",
              },
              {
                icon: "edit",
                title: "Custom Branding",
                description: "Add custom watermarks, logos, and branding elements.",
              },
              {
                icon: "devices",
                title: "Multi-Platform",
                description: "Optimized for TikTok, YouTube Shorts, and Instagram Reels.",
              },
            ].map((feature, idx) => (
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
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Create your first video in just 3 simple steps.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Enter Your Topic",
                description: "Simply type in a video topic or subject you want to create content about.",
              },
              {
                step: 2,
                title: "AI Does The Rest",
                description: "Our AI generates a compelling script, finds relevant videos, and creates a professional thumbnail.",
              },
              {
                step: 3,
                title: "Generate & Download",
                description: "One-click generation of your video with karaoke subtitles and watermark-free output.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/25">
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed max-w-sm mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { stat: "50+", label: "Languages Supported" },
              { stat: "1000+", label: "Users Worldwide" },
              { stat: "60s", label: "Avg. Generation Time" },
              { stat: "Free", label: "Forever Free" },
            ].map((item, idx) => (
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
                Ready to Create Viral Videos?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of content creators using AI to generate short videos in minutes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/mpt/docs"
                  className="px-8 py-4 bg-white text-amber-600 font-semibold rounded-xl hover:bg-slate-100 transition-all shadow-lg"
                >
                  Start Creating Free
                </Link>
                <Link
                  href="https://github.com/WarnaStudio/warnastudio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                >
                  View Documentation
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
              <h3 className="text-xl font-bold text-white">MoneyPrinterTurbo</h3>
              <p className="text-slate-400">AI-powered short video generator for content creators.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/mpt" className="text-slate-400 hover:text-amber-400 transition-colors">Features</Link></li>
                <li><Link href="/mpt/docs" className="text-slate-400 hover:text-amber-400 transition-colors">Documentation</Link></li>
                <li><Link href="https://github.com/WarnaStudio/warnastudio.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-amber-400 transition-colors">GitHub</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-slate-400 hover:text-amber-400 transition-colors">WarnaStudio</Link></li>
                <li><Link href="/mpt/faq" className="text-slate-400 hover:text-amber-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
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
            <p>© 2024 WarnaStudio. MoneyPrinterTurbo is open source.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}