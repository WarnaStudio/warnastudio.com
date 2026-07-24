import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import "dotenv/config"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } })
  if (!admin) {
    console.error("No admin user found")
    return
  }

  const key1 = await prisma.mptApiKey.upsert({
    where: { key: "ws_key_a4618c7ba9696688695d6c022faccbbb" },
    create: {
      userId: admin.id,
      key: "ws_key_a4618c7ba9696688695d6c022faccbbb",
      label: "production",
      quotaLimit: 1000,
    },
    update: {},
  })

  const key2 = await prisma.mptApiKey.upsert({
    where: { key: "ws_key_9d437b67917b9dc7cd27f34657f4b544" },
    create: {
      userId: admin.id,
      key: "ws_key_9d437b67917b9dc7cd27f34657f4b544",
      label: "development",
      quotaLimit: 100,
    },
    update: {},
  })

  console.log("API keys seeded:")
  console.log("  Production:", key1.key)
  console.log("  Development:", key2.key)

  await prisma.subscription.upsert({
    where: { id: "admin-sub" },
    create: {
      id: "admin-sub",
      userId: admin.id,
      plan: "ENTERPRISE",
      status: "ACTIVE",
      mptQuotaLimit: 9999,
      startedAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    update: {},
  })
  console.log("Admin subscription: ENTERPRISE (active)")

  await pool.end()
}

main().catch(console.error)
