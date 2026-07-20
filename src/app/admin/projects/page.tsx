import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

const statusColors: Record<string, "warning" | "success" | "default" | "danger" | "primary"> = {
  planning: "warning",
  "in-progress": "primary",
  completed: "success",
  cancelled: "danger",
}

export default async function ProjectsAdmin() {
  const projects = await prisma.project.findMany({
    include: { customer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Projects</h1>
      <Card className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 font-medium">Project</th>
                <th className="text-left p-4 font-medium">Client</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Budget</th>
                <th className="text-left p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-4 font-medium">{p.title}</td>
                  <td className="p-4 text-muted-foreground">{p.customer?.name || "-"}</td>
                  <td className="p-4"><Badge variant={statusColors[p.status] || "default"}>{p.status}</Badge></td>
                  <td className="p-4 text-muted-foreground">{p.budget ? `Rp ${(p.budget / 1000000).toFixed(1)}jt` : "-"}</td>
                  <td className="p-4 text-muted-foreground">{formatDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
