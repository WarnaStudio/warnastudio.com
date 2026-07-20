import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function CRMAdmin() {
  const [leads, customers] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.customer.findMany({ orderBy: { createdAt: "desc" } }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">CRM</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5 glass">
          <h2 className="font-semibold mb-4">Leads ({leads.length})</h2>
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{lead.name}</p>
                  <Badge variant={lead.status === "new" ? "primary" : "success"}>{lead.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{lead.email}</p>
                {lead.service && <p className="text-xs text-muted-foreground">Layanan: {lead.service}</p>}
                <p className="text-xs text-muted-foreground mt-1">{formatDate(lead.createdAt)}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5 glass">
          <h2 className="font-semibold mb-4">Customers ({customers.length})</h2>
          <div className="space-y-3">
            {customers.map((c) => (
              <div key={c.id} className="p-3 rounded-lg bg-muted/30">
                <p className="font-medium text-sm">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.email}</p>
                {c.company && <p className="text-xs text-muted-foreground">{c.company}</p>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
