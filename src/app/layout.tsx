import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/shared/navbar"
import { Footer } from "@/components/shared/footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "WarnaStudio | Iklan & Video AI Siap Tayang",
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col dark">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
