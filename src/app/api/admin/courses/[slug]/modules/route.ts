import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const course = await prisma.course.findUnique({ where: { slug } })
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 })

    const { title, description, order } = await req.json()
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 })

    const last = await prisma.courseModule.findFirst({
      where: { courseId: course.id },
      orderBy: { order: "desc" },
    })
    const module = await prisma.courseModule.create({
      data: { courseId: course.id, title, description: description || null, order: order ?? (last ? last.order + 1 : 0) },
    })
    return NextResponse.json(module, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to create module" }, { status: 500 })
  }
}
