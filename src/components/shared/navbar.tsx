"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { title: "Beranda", href: "/" },
  { title: "Layanan", href: "/#services" },
  { title: "Paket", href: "/#packages" },
  { title: "Karya", href: "/#portfolio" },
  { title: "Kursus", href: "/courses" },
  { title: "Kontak", href: "/contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-[#07070a]/80 backdrop-blur-xl border-b border-white/[0.06]" />
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-[0_0_20px_-4px_rgba(212,175,55,0.6)]">
              <span className="text-zinc-950 font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-zinc-50">
              Warna<span className="text-amber-400">Studio</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.title}
                href={link.href}
                className="px-3.5 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-zinc-300">
                Masuk
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="primary" size="sm">
                Order
              </Button>
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/[0.05] transition-colors text-zinc-200"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.title}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm text-zinc-400 hover:text-zinc-100 rounded-lg hover:bg-white/[0.04]"
                >
                  {link.title}
                </Link>
              ))}
              <div className="flex gap-2 mt-2 pt-3 border-t border-white/[0.06]">
                <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">
                    Masuk
                  </Button>
                </Link>
                <Link href="/contact" className="flex-1" onClick={() => setOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Order
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
