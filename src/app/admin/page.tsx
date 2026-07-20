import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Users, Briefcase, Wallet, TicketCheck } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const [leads, projects, tickets, incomeAgg] = await Promise.all([
    prisma.lead.count(),
    prisma.project.count(),
    prisma.ticket.count({ where: { status: "open" } }),
    prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: "income" } }),
  ])

  const stats = [
    { title: "Total Leads", value: leads, icon: Users, gradient: "from-violet-500 to-fuchsia-500" },
    { title: "Active Projects", value: projects, icon: Briefcase, gradient: "from-cyan-500 to-blue-500" },
    { title: "Open Tickets", value: tickets, icon: TicketCheck, gradient: "from-amber-500 to-orange-500" },
    { title: "Total Revenue", value: incomeAgg._sum.amount ? `Rp ${(incomeAgg._sum.amount / 1000000).toFixed(1)}jt` : "Rp 0", icon: Wallet, gradient: "from-emerald-500 to-teal-500" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-5 glass">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.gradient} p-2`}>
                  <Icon className="w-full h-full text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5 glass">
          <h2 className="font-semibold mb-4">Recent Leads</h2>
          <RecentLeads />
        </Card>
        <Card className="p-5 glass">
          <h2 className="font-semibold mb-4">Recent Projects</h2>
          <RecentProjects />
        </Card>
      </div>
    </div>
  )
}

async function RecentLeads() {
  const data = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
  if (data.length === 0) return <p className="text-sm text-muted-foreground">No leads yet</p>
  return (
    <div className="space-y-3">
      {data.map((lead) => (
        <div key={lead.id} className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium">{lead.name}</p>
            <p className="text-xs text-muted-foreground">{lead.email}</p>
          </div>
          <span className="text-xs capitalize px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-500">{lead.status}</span>
        </div>
      ))}
    </div>
  )
}

async function RecentProjects() {
  const data = await prisma.project.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
  if (data.length === 0) return <p className="text-sm text-muted-foreground">No projects yet</p>
  return (
    <div className="space-y-3">
      {data.map((project) => (
        <div key={project.id} className="flex items-center justify-between text-sm">
          <p className="font-medium">{project.title}</p>
          <span className="text-xs capitalize px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500">{project.status}</span>
        </div>
      ))}
    </div>
  )
}
