"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 p-8 sm:p-12 lg:p-16 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Siap Bekerja Sama?
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              Diskusikan project Anda dengan kami. Gratis konsultasi awal tanpa komitmen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button variant="default" size="lg" className="bg-white text-violet-600 hover:bg-white/90">
                  Hubungi Kami
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="glass" size="lg" className="text-white border-white/20 hover:bg-white/10">
                  Lihat Layanan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
