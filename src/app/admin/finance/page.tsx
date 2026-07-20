import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function FinanceAdmin() {
  const [income, expense, transactions, invoices] = await Promise.all([
    prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: "income" } }),
    prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: "expense" } }),
    prisma.transaction.findMany({ orderBy: { date: "desc" }, take: 20 }),
    prisma.invoice.findMany({ orderBy: { createdAt: "desc" } }),
  ])

  const totalIncome = income._sum.amount || 0
  const totalExpense = expense._sum.amount || 0

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Finance</h1>
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 glass"><p className="text-sm text-muted-foreground mb-1">Total Income</p><p className="text-2xl font-bold text-emerald-500">{formatCurrency(totalIncome)}</p></Card>
        <Card className="p-5 glass"><p className="text-sm text-muted-foreground mb-1">Total Expense</p><p className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</p></Card>
        <Card className="p-5 glass"><p className="text-sm text-muted-foreground mb-1">Net Profit</p><p className="text-2xl font-bold gradient-text">{formatCurrency(totalIncome - totalExpense)}</p></Card>
      </div>

      <Card className="p-5 glass mb-6">
        <h2 className="font-semibold mb-4">Invoices ({invoices.length})</h2>
        <div className="space-y-3">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="text-sm font-medium">{inv.number}</p>
                <p className="text-xs text-muted-foreground">{formatDate(inv.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{formatCurrency(inv.amount)}</p>
                <Badge variant={inv.status === "paid" ? "success" : inv.status === "pending" ? "warning" : "danger"}>{inv.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
