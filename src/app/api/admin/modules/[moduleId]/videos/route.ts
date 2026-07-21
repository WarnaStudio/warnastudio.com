import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request, { params }: { params: Promise<{ moduleId: string }> }) {
  try {
    const { moduleId } = await params
    const mod = await prisma.courseModule.findUnique({ where: { id: moduleId } })
    if (!mod) return NextResponse.json({ error: "Module not found" }, { status: 404 })

    const { title, videoUrl, duration, order, free, description } = await req.json()
    if (!title || !videoUrl) return NextResponse.json({ error: "Title and videoUrl are required" }, { status: 400 })

    const last = await prisma.courseVideo.findFirst({
      where: { moduleId },
      orderBy: { order: "desc" },
    })
    const video = await prisma.courseVideo.create({
      data: {
        moduleId,
        title,
        videoUrl,
        duration: typeof duration === "number" ? duration : null,
        description: description || null,
        free: free || false,
        order: order ?? (last ? last.order + 1 : 0),
      },
    })
    return NextResponse.json(video, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to create video" }, { status: 500 })
  }
}
