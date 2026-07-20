"use client"

import { motion } from "framer-motion"
import { Sparkles, Film, Monitor, BookOpen, Megaphone, Bot } from "lucide-react"
import { Card } from "@/components/ui/card"

const services = [
  {
    icon: Sparkles,
    title: "AI & Machine Learning",
    description: "Solusi AI custom untuk automation, analisis data, dan inteligent system untuk bisnis Anda.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Film,
    title: "Produksi Film",
    description: "Film komersial, dokumenter, company profile dengan standar sinematografi profesional.",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Megaphone,
    title: "Iklan Digital",
    description: "Strategi iklan multi-platform dengan AI optimization untuk ROI maksimal.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Monitor,
    title: "Web & App Development",
    description: "Aplikasi web dan mobile modern dengan teknologi terkini dan UX premium.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: BookOpen,
    title: "Kursus Online",
    description: "Materi belajar terstruktur di bidang AI, programming, dan creative technology.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Automasi workflow bisnis dengan AI chatbot, document processing, dan smart system.",
    gradient: "from-rose-500 to-red-500",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-4">
            Layanan
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Solusi <span className="gradient-text">Kreatif & Teknologi</span>
          </h2>
          <p className="text-muted-foreground">
            Dari konsep hingga eksekusi, kami hadirkan solusi end-to-end untuk kebutuhan digital Anda.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group p-6 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300 cursor-default">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-2.5 mb-4`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-violet-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
