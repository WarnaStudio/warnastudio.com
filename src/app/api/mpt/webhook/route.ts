import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Webhook dari MoneyPrinterTurbo — tidak pakai session auth, pakai Bearer secret
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || ""
    const secret = process.env.MPT_WEBHOOK_SECRET || ""
    const token = authHeader.replace("Bearer ", "").trim()

    if (secret && token !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { event, task_id, timestamp, data } = body

    if (!event || !task_id) {
      return NextResponse.json({ error: "Missing event or task_id" }, { status: 400 })
    }

    switch (event) {
      case "task.created": {
        await prisma.mptTask.upsert({
          where: { taskId: task_id },
          create: {
            taskId: task_id,
            subject: data?.subject || "",
            status: "processing",
            progress: 5,
          },
          update: {
            status: "processing",
            progress: 5,
          },
        })
        break
      }

      case "task.completed": {
        const videos = data?.videos || []
        await prisma.mptTask.update({
          where: { taskId: task_id },
          data: {
            status: "completed",
            progress: 100,
            videos: JSON.stringify(videos),
            videoCount: videos.length,
            script: data?.script || "",
            completedAt: new Date(),
          },
        })

        // Increment quota if apiKeyId is set
        const task = await prisma.mptTask.findUnique({ where: { taskId: task_id } })
        if (task?.apiKeyId) {
          await prisma.mptApiKey.update({
            where: { id: task.apiKeyId },
            data: { quotaUsed: { increment: 1 } },
          })
        }
        break
      }

      case "task.failed": {
        await prisma.mptTask.update({
          where: { taskId: task_id },
          data: {
            status: "failed",
            error: data?.error || "Unknown error",
            failedStage: data?.stage || "",
          },
        })
        break
      }

      default:
        return NextResponse.json({ error: `Unknown event: ${event}` }, { status: 400 })
    }

    return NextResponse.json({ success: true, event, task_id })
  } catch (error) {
    console.error("MPT webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", service: "mpt-webhook" })
}
