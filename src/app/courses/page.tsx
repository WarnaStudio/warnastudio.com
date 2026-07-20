import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Play, Users } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    include: {
      _count: { select: { enrollments: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-4">
            Kursus
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Tingkatkan <span className="gradient-text">Skill</span> Anda
          </h1>
          <p className="text-muted-foreground">
            Belajar dari praktisi industri dengan kurikulum terstruktur.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.length === 0 && (
            <div className="col-span-full text-center py-20">
              <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Belum ada kursus tersedia</p>
            </div>
          )}
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`}>
              <Card className="group h-full overflow-hidden glass hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 flex items-center justify-center">
                  {course.thumbnail ? (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <Play className="w-12 h-12 text-muted-foreground/30" />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    {course.category && <Badge variant="primary">{course.category}</Badge>}
                  </div>
                  <h3 className="font-semibold group-hover:text-violet-400 transition-colors mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{course.shortDesc || course.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5" /> Mulai Belajar</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course._count.enrollments} siswa</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="font-bold gradient-text">
                      {course.price === 0 ? "Gratis" : formatCurrency(course.price)}
                    </span>
                    <Button variant="ghost" size="sm">Detail</Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
