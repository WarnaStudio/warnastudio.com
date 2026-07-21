import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: Promise<{ videoId: string }> }) {
  try {
    const { videoId } = await params
    const body = await req.json()
    const video = await prisma.courseVideo.update({ where: { id: videoId }, data: body })
    return NextResponse.json(video)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to update video" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ videoId: string }> }) {
  try {
    const { videoId } = await params
    await prisma.courseVideo.delete({ where: { id: videoId } })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to delete video" }, { status: 500 })
  }
}
