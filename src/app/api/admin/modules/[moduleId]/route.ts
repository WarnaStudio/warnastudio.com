import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: Promise<{ moduleId: string }> }) {
  try {
    const { moduleId } = await params
    const body = await req.json()
    const module = await prisma.courseModule.update({ where: { id: moduleId }, data: body })
    return NextResponse.json(module)
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to update module" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ moduleId: string }> }) {
  try {
    const { moduleId } = await params
    await prisma.courseModule.delete({ where: { id: moduleId } })
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to delete module" }, { status: 500 })
  }
}
