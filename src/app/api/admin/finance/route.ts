import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const [income, expense, transactions, invoices] = await Promise.all([
    prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: "income" } }),
    prisma.transaction.aggregate({ _sum: { amount: true }, where: { type: "expense" } }),
    prisma.transaction.findMany({ orderBy: { date: "desc" }, take: 50 }),
    prisma.invoice.findMany({ orderBy: { createdAt: "desc" } }),
  ])

  return NextResponse.json({ income: income._sum.amount || 0, expense: expense._sum.amount || 0, transactions, invoices })
}
