import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function MptTasksPage() {
  const tasks = await prisma.mptTask.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/mpt" className="text-muted-foreground hover:text-foreground">← Video Studio</Link>
        <h1 className="text-2xl font-bold">Video Tasks</h1>
      </div>

      <Card className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 font-medium text-muted-foreground">Task ID</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Subject</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Progress</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Videos</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Error</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground">
                  No tasks yet.
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="p-4 font-mono text-xs">{task.taskId.substring(0, 20)}</td>
                  <td className="p-4 max-w-xs truncate">{task.subject}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                      task.status === "failed" ? "bg-red-500/20 text-red-400" :
                      "bg-amber-500/20 text-amber-400"
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4">{task.progress}%</td>
                  <td className="p-4">{task.videoCount}</td>
                  <td className="p-4 max-w-xs truncate text-red-400 text-xs">{task.error || "-"}</td>
                  <td className="p-4 text-muted-foreground text-xs">{new Date(task.createdAt).toLocaleString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
