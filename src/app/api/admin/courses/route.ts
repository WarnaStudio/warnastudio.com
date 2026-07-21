import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const courses = await prisma.course.findMany({
    include: { _count: { select: { enrollments: true, modules: true } } },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(courses)
}

export async function POST(req: Request) {
  try {
    const { title, slug, description, shortDesc, price, thumbnail, category, level, published } = await req.json()
    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 })

    const data: any = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      description: description || null,
      shortDesc: shortDesc || null,
      price: typeof price === "number" ? price : 0,
      thumbnail: thumbnail || null,
      category: category || null,
      level: level || "all",
      published: published || false,
    }

    const course = await prisma.course.create({ data })
    return NextResponse.json(course, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Failed to create course" }, { status: 500 })
  }
}
