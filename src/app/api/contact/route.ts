import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Lengkapi semua field wajib" }, { status: 400 })
    }

    await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    })

    // Also create a lead
    await prisma.lead.create({
      data: { name, email, phone, service: subject, message, source: "contact-form" },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengirim pesan" }, { status: 500 })
  }
}
