import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { randomBytes } from "crypto"

// GET — list API keys for current user (admin sees all)
export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user as any).id
  const role = (session.user as any).role

  const keys = await prisma.mptApiKey.findMany({
    where: role === "ADMIN" ? {} : { userId },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  })

  // Mask the key for security (show only first 12 chars)
  const masked = keys.map((k) => ({
    ...k,
    key: k.key.substring(0, 12) + "..." + k.key.substring(k.key.length - 4),
  }))

  return NextResponse.json(masked)
}

// POST — create new API key
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user as any).id
  const { label, quotaLimit } = await req.json()

  const key = "ws_key_" + randomBytes(16).toString("hex")

  const apiKey = await prisma.mptApiKey.create({
    data: {
      userId,
      key,
      label: label || "default",
      quotaLimit: quotaLimit || 100,
    },
  })

  return NextResponse.json({
    id: apiKey.id,
    key,
    label: apiKey.label,
    quotaLimit: apiKey.quotaLimit,
    message: "Save this key securely — it won't be shown again",
  })
}

// DELETE — revoke API key
export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user as any).id
  const role = (session.user as any).role
  const { id } = await req.json()

  const key = await prisma.mptApiKey.findUnique({ where: { id } })
  if (!key) {
    return NextResponse.json({ error: "Key not found" }, { status: 404 })
  }

  if (key.userId !== userId && role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await prisma.mptApiKey.delete({ where: { id } })
  return NextResponse.json({ success: true })
}

// PATCH — update quota/label
export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const role = (session.user as any).role
  if (role !== "ADMIN") {
    return NextResponse.json({ error: "Admin only" }, { status: 403 })
  }

  const { id, label, quotaLimit, active } = await req.json()

  const updated = await prisma.mptApiKey.update({
    where: { id },
    data: {
      ...(label !== undefined && { label }),
      ...(quotaLimit !== undefined && { quotaLimit }),
      ...(active !== undefined && { active }),
    },
  })

  return NextResponse.json(updated)
}
