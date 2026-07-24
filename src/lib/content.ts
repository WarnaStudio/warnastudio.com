/** Central content for landing — ganti path video di public/videos/ saja. */

export interface WorkItem {
  slug: string
  title: string
  category: string
  blurb: string
  video: string
  href: string
  accent: string
  year: string
  client: string
  summary: string
  stats: { label: string; value: string }[]
  role: string[]
  services: string[]
  chapters: { title: string; body: string }[]
}

export const siteContent = {
  brand: "WarnaStudio",
  tagline: "Creative technology for ads that convert",
  whatsapp: "",
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
      href: "/contact",
      num: "01",
      tags: ["Shorts", "Reels", "TikTok", "Ads"],
    },
    {
      id: "film",
      title: "Film & Company Profile",
      desc: "Narasi sinematik untuk brand, produk, dan dokumentasi bisnis.",
      video: "/videos/film.mp4",
      href: "/contact",
      num: "02",
      tags: ["Film", "Profile", "Cinematic"],
    },
    {
      id: "ai",
      title: "AI Production Pipeline",
      desc: "Dari riset momen sampai packing deliverable — dipercepat AI, dikurasi manusia.",
      video: "/videos/ai.mp4",
      href: "/services",
      num: "03",
      tags: ["AI", "Pipeline", "Automation"],
    },
    {
      id: "course",
      title: "Kursus Produksi AI",
      desc: "Modul praktis agar tim internal bisa produksi konten sendiri.",
      video: "/videos/course.mp4",
      href: "/courses",
      num: "04",
      tags: ["Course", "Training", "Membership"],
    },
  ],
  works: [
    {
      slug: "showreel-studio",
      title: "Showreel Studio",
      category: "Showreel",
      blurb: "Cuplikan arah visual & pacing produksi WarnaStudio.",
      video: "/videos/showreel.mp4",
      href: "/contact",
      accent: "#a855f7",
      year: "2025",
      client: "WarnaStudio",
      summary: "Kompilasi arah visual, pacing, dan gaya edit yang menjadi signature WarnaStudio.",
      stats: [
        { label: "Durasi", value: "2:30" },
        { label: "Format", value: "16:9" },
        { label: "Output", value: "4K" },
      ],
      role: ["Director", "Editor", "Colorist"],
      services: ["Film", "Editing", "Color Grading"],
      chapters: [
        { title: "Opening", body: "Establishing shots & mood" },
        { title: "Highlight", body: "Best work montage" },
        { title: "Closing", body: "Brand reveal & CTA" },
      ],
    },
    {
      slug: "short-ads-system",
      title: "Short Ads System",
      category: "Iklan",
      blurb: "Format iklan pendek multi-hook untuk campaign harian.",
      video: "/videos/ads.mp4",
      href: "/#packages",
      accent: "#f43f5e",
      year: "2025",
      client: "Various Brands",
      summary: "Sistem produksi iklan pendek dengan template hook yang teruji untuk performa tinggi.",
      stats: [
        { label: "Format", value: "9:16" },
        { label: "Hook", value: "Multi" },
        { label: "Output", value: "1080p" },
      ],
      role: ["Strategist", "Editor", "Copywriter"],
      services: ["Shorts", "Reels", "TikTok", "Ads"],
      chapters: [
        { title: "Hook", body: "3 detik pertama" },
        { title: "Body", body: "Message delivery" },
        { title: "CTA", body: "Call to action" },
      ],
    },
    {
      slug: "cinematic-cut",
      title: "Cinematic Cut",
      category: "Film",
      blurb: "Potongan film/profile untuk presentasi dan website.",
      video: "/videos/film.mp4",
      href: "/contact",
      accent: "#06b6d4",
      year: "2025",
      client: "Corporate",
      summary: "Film perusahaan dengan pendekatan sinematik untuk presentasi brand.",
      stats: [
        { label: "Durasi", value: "3:00" },
        { label: "Format", value: "16:9" },
        { label: "Output", value: "4K" },
      ],
      role: ["Director", "DP", "Editor"],
      services: ["Film", "Profile", "Cinematic"],
      chapters: [
        { title: "Intro", body: "Brand establishing" },
        { title: "Story", body: "Narrative arc" },
        { title: "Outro", body: "Logo & contact" },
      ],
    },
    {
      slug: "ai-pipeline",
      title: "AI Pipeline Demo",
      category: "AI",
      blurb: "Alur potong & packing konten berbasis AI.",
      video: "/videos/ai.mp4",
      href: "/services",
      accent: "#10b981",
      year: "2025",
      client: "Internal",
      summary: "Demonstrasi pipeline AI dari riset konten sampai packing deliverable.",
      stats: [
        { label: "Speed", value: "3× faster" },
        { label: "Tools", value: "AI + Manual" },
        { label: "Output", value: "Multi-format" },
      ],
      role: ["AI Engineer", "Editor"],
      services: ["AI", "Pipeline", "Automation"],
      chapters: [
        { title: "Research", body: "AI-assisted trend research" },
        { title: "Production", body: "AI + human editing" },
        { title: "Packaging", body: "Auto-format & delivery" },
      ],
    },
    {
      slug: "learning-vault",
      title: "Learning Vault",
      category: "Kursus",
      blurb: "Preview gaya materi kursus produksi AI.",
      video: "/videos/course.mp4",
      href: "/courses",
      accent: "#f59e0b",
      year: "2025",
      client: "WarnaStudio",
      summary: "Materi kursus interaktif untuk membantu tim memproduksi konten dengan AI.",
      stats: [
        { label: "Modul", value: "12" },
        { label: "Format", value: "Video + Quiz" },
        { label: "Akses", value: "Membership" },
      ],
      role: ["Instructor", "Producer"],
      services: ["Course", "Training", "Membership"],
      chapters: [
        { title: "Basics", body: "Fundamentals AI production" },
        { title: "Advanced", body: "Workflow optimization" },
        { title: "Certification", body: "Final project" },
      ],
    },
    {
      slug: "campaign-pack",
      title: "Campaign Pack",
      category: "Retainer",
      blurb: "Output konsisten untuk brand yang butuh ritme konten.",
      video: "/videos/campaign.mp4",
      href: "/contact",
      accent: "#8b5cf6",
      year: "2025",
      client: "Retainer Clients",
      summary: "Paket bulanan dengan kuota konten konsisten dan brand sync.",
      stats: [
        { label: "Kuota", value: "Bulanan" },
        { label: "Format", value: "Multi" },
        { label: "Support", value: "Priority" },
      ],
      role: ["Strategist", "Editor", "Manager"],
      services: ["Retainer", "Campaign", "Content"],
      chapters: [
        { title: "Planning", body: "Content calendar" },
        { title: "Production", body: "Batch creation" },
        { title: "Delivery", body: "Scheduled posting" },
      ],
    },
  ] as WorkItem[],
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
