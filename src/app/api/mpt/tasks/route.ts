import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET — list MPT tasks
export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const role = (session.user as any).role
  const userId = (session.user as any).id
  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")
  const limit = parseInt(searchParams.get("limit") || "50")

  const tasks = await prisma.mptTask.findMany({
    where: {
      ...(status && { status }),
      ...(role !== "ADMIN" && { userId }),
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  })

  return NextResponse.json(tasks)
}
