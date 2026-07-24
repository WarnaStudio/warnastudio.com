import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Video, CheckCircle, XCircle, Clock, Key } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function MptDashboard() {
  const [totalTasks, completedTasks, failedTasks, processingTasks, apiKeys] = await Promise.all([
    prisma.mptTask.count(),
    prisma.mptTask.count({ where: { status: "completed" } }),
    prisma.mptTask.count({ where: { status: "failed" } }),
    prisma.mptTask.count({ where: { status: "processing" } }),
    prisma.mptApiKey.count(),
  ])

  const recentTasks = await prisma.mptTask.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  const stats = [
    { title: "Total Videos", value: totalTasks, icon: Video, gradient: "from-violet-500 to-fuchsia-500" },
    { title: "Completed", value: completedTasks, icon: CheckCircle, gradient: "from-emerald-500 to-teal-500" },
    { title: "Failed", value: failedTasks, icon: XCircle, gradient: "from-red-500 to-rose-500" },
    { title: "Processing", value: processingTasks, icon: Clock, gradient: "from-amber-500 to-orange-500" },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Video Studio</h1>
        <Link
          href="/admin/mpt/api-keys"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors text-sm font-medium"
        >
          <Key className="w-4 h-4" />
          API Keys ({apiKeys})
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-5 glass">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Tasks</h2>
        <Link href="/admin/mpt/tasks" className="text-sm text-amber-400 hover:underline">
          View all →
        </Link>
      </div>

      <Card className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 font-medium text-muted-foreground">Task ID</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Subject</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Progress</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentTasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No tasks yet. Generate a video from MoneyPrinterTurbo to see it here.
                </td>
              </tr>
            ) : (
              recentTasks.map((task) => (
                <tr key={task.id} className="border-b border-border/30 hover:bg-muted/20">
                  <td className="p-4 font-mono text-xs">{task.taskId.substring(0, 16)}...</td>
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
                  <td className="p-4 text-muted-foreground">{new Date(task.createdAt).toLocaleDateString("id-ID")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
