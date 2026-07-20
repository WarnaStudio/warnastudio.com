import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import { hash } from "bcryptjs"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@warnastudio.com" },
    update: {},
    create: {
      email: "admin@warnastudio.com",
      name: "Admin WarnaStudio",
      password: adminPassword,
      role: "ADMIN",
    },
  })
  console.log("Admin created:", admin.email)

  // Create sample courses
  const course1 = await prisma.course.upsert({
    where: { slug: "ai-untuk-pemula" },
    update: {},
    create: {
      title: "AI untuk Pemula",
      slug: "ai-untuk-pemula",
      description: "Pelajari dasar-dasar Artificial Intelligence dari nol. Cocok untuk pemula tanpa latar belakang teknis.",
      shortDesc: "Dasar AI tanpa coding, langsung praktik.",
      price: 199000,
      category: "AI",
      level: "beginner",
      published: true,
      featured: true,
    },
  })

  const course2 = await prisma.course.upsert({
    where: { slug: "web-development-modern" },
    update: {},
    create: {
      title: "Web Development Modern",
      slug: "web-development-modern",
      description: "Build modern web apps with Next.js, Tailwind CSS, and Prisma. From zero to deployment.",
      shortDesc: "Full-stack web development dengan teknologi terkini.",
      price: 349000,
      category: "Programming",
      level: "intermediate",
      published: true,
    },
  })

  console.log("Courses created:", course1.title, course2.title)

  // Create sample blog posts
  await prisma.blogPost.upsert({
    where: { slug: "masa-depan-ai-dalam-bisnis" },
    update: {},
    create: {
      title: "Masa Depan AI dalam Bisnis: Peluang dan Tantangan",
      slug: "masa-depan-ai-dalam-bisnis",
      content: "Artificial Intelligence telah mengubah cara bisnis beroperasi. Dari chatbots hingga predictive analytics, AI menawarkan efisiensi yang belum pernah terjadi sebelumnya. Namun, adopsi AI juga membawa tantangan seperti etika, privasi data, dan kebutuhan akan tenaga kerja terampil. Dalam artikel ini, kami akan mengeksplorasi bagaimana bisnis dapat memanfaatkan AI secara optimal sambil memitigasi risikonya.",
      excerpt: "Bagaimana AI mengubah lanskap bisnis dan apa yang perlu Anda persiapkan.",
      category: "AI",
      published: true,
      authorId: admin.id,
    },
  })

  // Create sample lead
  await prisma.lead.create({
    data: {
      name: "Sample Lead",
      email: "lead@example.com",
      phone: "+6281234567890",
      service: "AI Automation",
      message: "Saya tertarik dengan layanan AI Automation untuk bisnis saya.",
      source: "website",
    },
  })

  // Create sample project
  await prisma.project.create({
    data: {
      title: "AI Chatbot Customer Service",
      description: "Implementasi AI chatbot untuk customer service otomatis.",
      category: "AI",
      status: "in-progress",
      budget: 25000000,
    },
  })

  // Create sample finance transaction
  await prisma.transaction.create({
    data: {
      type: "income",
      category: "Project",
      amount: 25000000,
      description: "AI Chatbot - DP 50%",
    },
  })

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
