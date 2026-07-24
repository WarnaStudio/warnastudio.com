import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Midtrans callback/notification endpoint — no auth, public
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const orderId = body.order_id
    const transactionStatus = body.transaction_status
    const fraudStatus = body.fraud_status

    if (!orderId) {
      return NextResponse.json({ error: "Missing order_id" }, { status: 400 })
    }

    const payment = await prisma.payment.findUnique({
      where: { id: orderId },
      include: { subscription: true },
    })

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    let status: "PENDING" | "SUCCESS" | "FAILED" = "PENDING"

    if (transactionStatus === "capture") {
      status = fraudStatus === "challenge" ? "PENDING" : "SUCCESS"
    } else if (transactionStatus === "settlement") {
      status = "SUCCESS"
    } else if (transactionStatus === "cancel" || transactionStatus === "deny" || transactionStatus === "expire") {
      status = "FAILED"
    } else if (transactionStatus === "pending") {
      status = "PENDING"
    }

    await prisma.payment.update({
      where: { id: orderId },
      data: {
        status,
        providerPayload: JSON.stringify(body),
        paidAt: status === "SUCCESS" ? new Date() : null,
      },
    })

    if (status === "SUCCESS") {
      const now = new Date()
      const expiresAt = new Date(now)
      expiresAt.setMonth(expiresAt.getMonth() + 1)

      await prisma.subscription.update({
        where: { id: payment.subscriptionId },
        data: {
          status: "ACTIVE",
          startedAt: now,
          expiresAt,
          mptQuotaResetAt: expiresAt,
        },
      })
    }

    return NextResponse.json({ success: true, status })
  } catch (error) {
    console.error("Midtrans callback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
