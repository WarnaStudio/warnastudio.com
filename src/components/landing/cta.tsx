"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { VideoCard } from "@/components/ui/video-card"
import { siteContent } from "@/lib/content"

export function CTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/25 min-h-[420px] flex items-center justify-center text-center">
          <VideoCard src={siteContent.videos.campaign} dim={45} priority />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.2),transparent_60%)] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto px-6 py-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4 tracking-tight drop-shadow-lg">
              Siap naikkan output konten?
            </h2>
            <p className="text-zinc-200 mb-8 leading-relaxed">
              Ceritakan brief Anda — atau gabung member untuk akses template, kursus, dan update aset digital.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact" data-cursor="hover">
                <Button variant="primary" size="lg" className="min-w-[200px] gap-2">
                  Mulai project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register" data-cursor="hover">
                <Button variant="glass" size="lg" className="min-w-[200px] border-white/20 bg-black/40 backdrop-blur-md">
                  Daftar member
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
