import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { customer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const project = await prisma.project.create({ data })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
