import Link from "next/link"

type FooterLink = { title: string; href: string; target?: string }

const footerLinks: Record<string, FooterLink[]> = {
  Perusahaan: [
    { title: "Tentang", href: "#" },
    { title: "Blog", href: "/blog" },
    { title: "Karir", href: "#" },
    { title: "Kontak", href: "/contact" },
  ],
  Layanan: [
    { title: "AI & Machine Learning", href: "/services" },
    { title: "Pembuatan Film", href: "/services" },
    { title: "Iklan Digital", href: "/services" },
    { title: "Kursus Online", href: "/courses" },
  ],
  Produk: [
    { title: "XAUUSD Journal", href: "https://jurnaltradingkumplit-yfte.vercel.app", target: "_blank" },
    { title: "AI Assistant", href: "#" },
    { title: "Coming Soon", href: "#" },
  ],
  Bantuan: [
    { title: "FAQ", href: "#" },
    { title: "Kebijakan Privasi", href: "#" },
    { title: "Syarat & Ketentuan", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-gradient-to-b from-background to-background/95">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-lg">WarnaStudio</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Creative technology company specializing in AI solutions, digital products, film production, and online education.
            </p>
            <div className="flex gap-3">
              {["ig", "yt", "tw", "in"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <span className="text-xs font-medium text-muted-foreground">{s}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      target={link.target || undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} WarnaStudio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with passion in Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
