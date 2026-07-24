import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"
import { SiteShell } from "@/components/experience/site-shell"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "WarnaStudio | Iklan & Video AI Siap Tayang",
    template: "%s | WarnaStudio",
  },
  description:
    "Studio produksi iklan dan video berbasis AI — plus membership, kursus, dan produk digital untuk bisnis yang ingin scale konten.",
  keywords: [
    "warnastudio",
    "iklan AI",
    "video shorts",
    "produksi konten",
    "kursus AI",
    "membership digital",
  ],
  authors: [{ name: "WarnaStudio" }],
  creator: "WarnaStudio",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://warnastudio.com",
    siteName: "WarnaStudio",
    title: "WarnaStudio | Iklan & Video AI Siap Tayang",
    description:
      "Studio produksi iklan dan video berbasis AI — plus membership, kursus, dan produk digital untuk bisnis yang ingin scale konten.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WarnaStudio | Iklan & Video AI Siap Tayang",
    description:
      "Studio produksi iklan dan video berbasis AI — plus membership, kursus, dan produk digital untuk bisnis yang ingin scale konten.",
    images: ["/og-image.png"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col dark bg-[#050507] text-zinc-100">
        <SiteShell>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SiteShell>
      </body>
    </html>
  )
}
