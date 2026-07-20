import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const tickets = await prisma.ticket.findMany({
    include: { user: { select: { name: true, email: true } }, _count: { select: { replies: true } } },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(tickets)
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json()
    await prisma.ticket.update({ where: { id }, data: { status } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 })
  }
}
