"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 lg:py-28 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-[#0c0c10] px-6 py-12 sm:px-12 sm:py-16 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.2),transparent_55%)]" />
          <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,transparent_40%,rgba(255,200,80,0.08)_50%,transparent_60%)]" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4 tracking-tight">
              Siap naikkan output konten?
            </h2>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Ceritakan brief Anda — atau gabung member untuk akses template, kursus, dan update aset digital.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="min-w-[200px] gap-2">
                  Mulai project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="glass" size="lg" className="min-w-[200px] border-white/10">
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
