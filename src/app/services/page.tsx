"use client"

import Link from "next/link"
import { Sparkles, Film, Monitor, BookOpen, Megaphone, Bot, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const services = [
  {
    icon: Sparkles,
    title: "AI & Machine Learning",
    description: "Solusi AI custom untuk transformasi bisnis Anda.",
    features: ["Chatbot & Virtual Assistant", "Predictive Analytics", "Natural Language Processing", "Computer Vision", "Process Automation", "Data Mining & Insights"],
    price: "Custom",
    gradient: "from-violet-600 to-purple-600",
  },
  {
    icon: Film,
    title: "Produksi Film",
    description: "Film berkualitas sinematografi untuk kebutuhan profesional.",
    features: ["Company Profile", "Video Komersial", "Dokumenter", "Music Video", "Motion Graphics", "Post Production"],
    price: "Custom",
    gradient: "from-fuchsia-600 to-pink-600",
  },
  {
    icon: Megaphone,
    title: "Iklan Digital",
    description: "Strategi iklan multi-platform dengan AI optimization.",
    features: ["Meta Ads", "Google Ads", "TikTok Ads", "Content Strategy", "A/B Testing", "ROI Analytics"],
    price: "Mulai Rp 2jt",
    gradient: "from-cyan-600 to-blue-600",
  },
  {
    icon: Monitor,
    title: "Web & App Development",
    description: "Aplikasi modern dengan UX premium dan performa tinggi.",
    features: ["Website Company Profile", "Web Application", "Mobile App", "E-Commerce", "Dashboard Admin", "API Integration"],
    price: "Mulai Rp 5jt",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    icon: BookOpen,
    title: "Kursus Online",
    description: "Belajar dari praktisi industri dengan materi terstruktur.",
    features: ["AI untuk Pemula", "Web Development", "Digital Marketing", "Data Science", "UI/UX Design", "Sertifikat Resmi"],
    price: "Mulai Rp 99rb",
    gradient: "from-amber-600 to-orange-600",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Automasi workflow bisnis Anda dengan teknologi AI terkini.",
    features: ["Workflow Automation", "Document Processing", "Email Automation", "CRM Integration", "Report Generator", "24/7 Operation"],
    price: "Custom",
    gradient: "from-rose-600 to-red-600",
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-4">
            Layanan
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Solusi Lengkap untuk <span className="gradient-text">Bisnis Digital</span>
          </h1>
          <p className="text-muted-foreground">
            Dari konsultasi hingga implementasi, kami hadirkan solusi end-to-end.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.title} className="group p-6 glass hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-2.5 mb-4`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-sm font-semibold">{service.price}</span>
                  <Link href="/contact">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Pesan <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
