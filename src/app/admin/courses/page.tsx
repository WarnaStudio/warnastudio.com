import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function CoursesAdmin() {
  const courses = await prisma.course.findMany({
    include: { _count: { select: { enrollments: true, modules: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link href="/admin/courses/create"><Button variant="primary" size="sm">+ Add Course</Button></Link>
      </div>
      <Card className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left p-4 font-medium">Title</th>
                <th className="text-left p-4 font-medium">Category</th>
                <th className="text-left p-4 font-medium">Price</th>
                <th className="text-left p-4 font-medium">Modules</th>
                <th className="text-left p-4 font-medium">Students</th>
                <th className="text-left p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-4 font-medium">{c.title}</td>
                  <td className="p-4 text-muted-foreground">{c.category || "-"}</td>
                  <td className="p-4 text-muted-foreground">{c.price === 0 ? "Free" : `Rp ${(c.price / 1000).toFixed(0)}rb`}</td>
                  <td className="p-4 text-muted-foreground">{c._count.modules}</td>
                  <td className="p-4 text-muted-foreground">{c._count.enrollments}</td>
                  <td className="p-4"><Badge variant={c.published ? "success" : "warning"}>{c.published ? "Published" : "Draft"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
