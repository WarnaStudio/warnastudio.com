import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

const statusColors: Record<string, "warning" | "success" | "default" | "danger"> = {
  open: "warning",
  closed: "success",
  pending: "danger",
}

export default async function TicketsAdmin() {
  const tickets = await prisma.ticket.findMany({
    include: { user: { select: { name: true, email: true } }, _count: { select: { replies: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Support Tickets</h1>
      <Card className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 font-medium">Subject</th>
                <th className="text-left p-4 font-medium">User</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Priority</th>
                <th className="text-left p-4 font-medium">Replies</th>
                <th className="text-left p-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-4 font-medium">{t.subject}</td>
                  <td className="p-4 text-muted-foreground">{t.user.name || t.user.email}</td>
                  <td className="p-4"><Badge variant={statusColors[t.status] || "default"}>{t.status}</Badge></td>
                  <td className="p-4"><Badge variant={t.priority === "high" ? "danger" : t.priority === "medium" ? "warning" : "default"}>{t.priority}</Badge></td>
                  <td className="p-4 text-muted-foreground">{t._count.replies}</td>
                  <td className="p-4 text-muted-foreground">{formatDate(t.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
