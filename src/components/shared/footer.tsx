import Link from "next/link"

type FooterLink = { title: string; href: string; target?: string }

const footerLinks: Record<string, FooterLink[]> = {
  Perusahaan: [
    { title: "Beranda", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "Kontak", href: "/contact" },
  ],
  Layanan: [
    { title: "Iklan & short ads", href: "/#services" },
    { title: "Paket produksi", href: "/#packages" },
    { title: "Kursus", href: "/courses" },
  ],
  Produk: [
    { title: "XAUUSD Journal", href: "https://jurnaltradingkumplit-yfte.vercel.app", target: "_blank" },
    { title: "Member area", href: "/register" },
    { title: "Masuk", href: "/login" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050507]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-500/[0.06] via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center">
                <span className="text-zinc-950 font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-lg text-zinc-50">
                Warna<span className="text-amber-400">Studio</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed mb-4">
              Produksi iklan &amp; video berbasis AI, plus membership dan kursus untuk bisnis yang ingin scale konten.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm text-zinc-200 mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link.target || undefined}
                      className="text-sm text-zinc-500 hover:text-amber-200/90 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} WarnaStudio. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">Built in Indonesia</p>
        </div>
      </div>
    </footer>
  )
}
