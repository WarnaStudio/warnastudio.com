import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// POST — init Midtrans payment for subscription
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user as any).id
  const { plan } = await req.json()

  const plans: Record<string, { price: number; quota: number; name: string }> = {
    STARTER: { price: 49000, quota: 30, name: "Starter" },
    PRO: { price: 149000, quota: 100, name: "Pro" },
    ENTERPRISE: { price: 499000, quota: 500, name: "Enterprise" },
  }

  const selected = plans[plan]
  if (!selected) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
  }

  // Get or create subscription
  let subscription = await prisma.subscription.findFirst({
    where: { userId, status: { in: ["ACTIVE", "PENDING"] } },
  })

  if (!subscription) {
    subscription = await prisma.subscription.create({
      data: {
        userId,
        plan,
        status: "PENDING",
        mptQuotaLimit: selected.quota,
      },
    })
  }

  // Create payment record
  const payment = await prisma.payment.create({
    data: {
      subscriptionId: subscription.id,
      amount: selected.price,
      currency: "IDR",
      status: "PENDING",
      provider: "MIDTRANS",
    },
  })

  // Build Midtrans Snap request
  const midtransServerKey = process.env.MIDTRANS_SERVER_KEY
  if (!midtransServerKey) {
    // Fallback: return manual payment info
    return NextResponse.json({
      paymentId: payment.id,
      amount: selected.price,
      currency: "IDR",
      plan: selected.name,
      method: "manual",
      message: "Midtrans not configured. Contact admin for manual payment.",
    })
  }

  try {
    const snapPayload = {
      transaction_details: {
        order_id: payment.id,
        gross_amount: selected.price,
      },
      item_details: [
        {
          id: plan,
          name: `WarnaStudio ${selected.name} - Monthly`,
          price: selected.price,
          quantity: 1,
        },
      ],
      customer_details: {
        email: (session.user as any).email,
        name: (session.user as any).name || "",
      },
      callbacks: {
        finish: `${process.env.NEXTAUTH_URL}/member?payment=success`,
      },
    }

    const authString = Buffer.from(midtransServerKey + ":").toString("base64")
    const isProduction = process.env.MIDTRANS_PRODUCTION === "true"
    const snapUrl = isProduction
      ? "https://app.midtrans.com/snap/v1/transactions"
      : "https://app.sandbox.midtrans.com/snap/v1/transactions"

    const snapResp = await fetch(snapUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(snapPayload),
    })

    const snapData = await snapResp.json()

    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerRef: snapData.token,
        invoiceUrl: snapData.redirect_url,
      },
    })

    return NextResponse.json({
      paymentId: payment.id,
      snapToken: snapData.token,
      redirectUrl: snapData.redirect_url,
      amount: selected.price,
      plan: selected.name,
    })
  } catch (error) {
    console.error("Midtrans error:", error)
    return NextResponse.json(
      { error: "Failed to create payment", paymentId: payment.id },
      { status: 500 }
    )
  }
}
