/** Central content for landing — ganti path video di public/videos/ saja. */
export const siteContent = {
  brand: "WarnaStudio",
  tagline: "Creative technology for ads that convert",
  whatsapp: "", // isi nomor WA nanti, contoh: https://wa.me/62...
  videos: {
    showreel: "/videos/showreel.mp4",
    ads: "/videos/ads.mp4",
    film: "/videos/film.mp4",
    ai: "/videos/ai.mp4",
    course: "/videos/course.mp4",
    campaign: "/videos/campaign.mp4",
  },
  services: [
    {
      id: "ads",
      title: "Iklan & Short Ads",
      desc: "Vertical ads siap Shorts, Reels, TikTok — hook keras, subtitle rapi, CTA jelas.",
      video: "/videos/ads.mp4",
    },
    {
      id: "film",
      title: "Film & Company Profile",
      desc: "Narasi sinematik untuk brand, produk, dan dokumentasi bisnis.",
      video: "/videos/film.mp4",
    },
    {
      id: "ai",
      title: "AI Production Pipeline",
      desc: "Dari riset momen sampai packing deliverable — dipercepat AI, dikurasi manusia.",
      video: "/videos/ai.mp4",
    },
    {
      id: "course",
      title: "Kursus Produksi AI",
      desc: "Modul praktis agar tim internal bisa produksi konten sendiri.",
      video: "/videos/course.mp4",
    },
  ],
  works: [
    {
      title: "Showreel Studio",
      category: "Showreel",
      blurb: "Cuplikan arah visual & pacing produksi WarnaStudio.",
      video: "/videos/showreel.mp4",
      href: "/contact",
    },
    {
      title: "Short Ads System",
      category: "Iklan",
      blurb: "Format iklan pendek multi-hook untuk campaign harian.",
      video: "/videos/ads.mp4",
      href: "/#packages",
    },
    {
      title: "Cinematic Cut",
      category: "Film",
      blurb: "Potongan film/profile untuk presentasi dan website.",
      video: "/videos/film.mp4",
      href: "/contact",
    },
    {
      title: "AI Pipeline Demo",
      category: "AI",
      blurb: "Alur potong & packing konten berbasis AI.",
      video: "/videos/ai.mp4",
      href: "/services",
    },
    {
      title: "Learning Vault",
      category: "Kursus",
      blurb: "Preview gaya materi kursus produksi AI.",
      video: "/videos/course.mp4",
      href: "/courses",
    },
    {
      title: "Campaign Pack",
      category: "Retainer",
      blurb: "Output konsisten untuk brand yang butuh ritme konten.",
      video: "/videos/campaign.mp4",
      href: "/contact",
    },
  ],
  packages: [
    {
      name: "Starter Ads",
      tag: "Mulai dari",
      highlight: "3 short siap upload",
      features: ["Brief + angle", "3 video vertical", "Subtitle & packing", "2× revisi"],
      popular: false,
    },
    {
      name: "Campaign",
      tag: "Paling dipilih",
      highlight: "10 short + 1 long",
      features: ["Strategi hook & CTA", "10 short + 1 long-form", "Caption set", "Prioritas slot", "3× revisi"],
      popular: true,
    },
    {
      name: "Retainer",
      tag: "Bulanan",
      highlight: "Output konsisten",
      features: ["Kuota bulanan", "Kalender konten", "Brand sync", "Support prioritas"],
      popular: false,
    },
  ],
}
