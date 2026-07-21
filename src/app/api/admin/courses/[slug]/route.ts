import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: { videos: { orderBy: { order: "asc" } } },
      },
    },
  })
  if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 })
  return NextResponse.json(course)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const body = await req.json()
    const course = await prisma.course.update({ where: { slug }, data: body })
    return NextResponse.json(course)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to update course" }, { status: 500 })
  }
}
