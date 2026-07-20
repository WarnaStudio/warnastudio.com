import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(leads)
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json()
    await prisma.lead.update({ where: { id }, data: { status } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 })
  }
}
