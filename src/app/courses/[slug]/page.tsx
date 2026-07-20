import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Play, BookOpen, Clock, ChevronRight } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = await prisma.course.findUnique({
    where: { slug, published: true },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          videos: { orderBy: { order: "asc" } },
        },
      },
      _count: { select: { enrollments: true } },
    },
  })

  if (!course) notFound()

  const totalVideos = course.modules.reduce((acc, m) => acc + m.videos.length, 0)
  const totalDuration = course.modules.reduce((acc, m) => 
    acc + m.videos.reduce((a, v) => a + (v.duration || 0), 0), 0
  )

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 mb-8 flex items-center justify-center">
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <Play className="w-16 h-16 text-muted-foreground/30" />
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              {course.category && <Badge variant="primary">{course.category}</Badge>}
              <span className="text-sm text-muted-foreground">{course._count.enrollments} siswa terdaftar</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">{course.description}</p>

            <h2 className="text-xl font-semibold mb-4">Kurikulum Kursus</h2>
            <div className="space-y-3">
              {course.modules.map((module, mi) => (
                <Card key={module.id} className="glass overflow-hidden">
                  <div className="p-4 bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center text-sm font-semibold">
                        {mi + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{module.title}</p>
                        <p className="text-xs text-muted-foreground">{module.videos.length} video</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="divide-y divide-border/50">
                    {module.videos.map((video) => (
                      <div key={video.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                        <Play className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="flex-1">{video.title}</span>
                        {video.duration && (
                          <span className="text-xs text-muted-foreground">{Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, "0")}</span>
                        )}
                        {video.free && <Badge variant="success" className="text-[10px]">Gratis</Badge>}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6 glass">
                <div className="text-3xl font-bold gradient-text mb-4">
                  {course.price === 0 ? "Gratis" : formatCurrency(course.price)}
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Play className="w-4 h-4 text-muted-foreground" />
                    <span>{totalVideos} video</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{course.modules.length} modul</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Total {Math.floor(totalDuration / 60)} menit</span>
                  </div>
                </div>
                <Link href="/register">
                  <Button variant="primary" size="lg" className="w-full">Daftar Sekarang</Button>
                </Link>
                <p className="text-xs text-center text-muted-foreground mt-3">Akses seumur hidup</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
