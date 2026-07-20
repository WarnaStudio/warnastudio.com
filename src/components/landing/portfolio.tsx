"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const projects = [
  { title: "XAUUSD Trading Journal", category: "Web App", gradient: "from-violet-600 to-fuchsia-600" },
  { title: "AI Assistant Chatbot", category: "AI / ML", gradient: "from-cyan-600 to-blue-600" },
  { title: "Company Profile Film", category: "Produksi Film", gradient: "from-amber-600 to-red-600" },
  { title: "E-Commerce Platform", category: "Web Dev", gradient: "from-emerald-600 to-teal-600" },
  { title: "Digital Campaign", category: "Iklan Digital", gradient: "from-rose-600 to-pink-600" },
  { title: "Online Course Platform", category: "Edukasi", gradient: "from-purple-600 to-indigo-600" },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-4">
            Portofolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Karya <span className="gradient-text">Terbaru</span>
          </h2>
          <p className="text-muted-foreground">
            Setiap project adalah kanvas bagi kami untuk menciptakan masterpiece digital.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <span className="text-4xl font-bold text-white/20">{project.title[0]}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-semibold">{project.title}</h3>
                      <p className="text-white/60 text-sm">{project.category}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/80" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
