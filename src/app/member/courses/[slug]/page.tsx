import { notFound, redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { CheckCircle, Play } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function MemberCoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const { slug } = await params
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId: session.user.id, course: { slug } },
    include: {
      course: {
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              videos: { orderBy: { order: "asc" } },
            },
          },
        },
      },
    },
  })

  if (!enrollment) redirect("/member")

  const course = enrollment.course
  const allVideos = course.modules.flatMap((m) => m.videos)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-sm text-muted-foreground">{course.modules.length} modul • {allVideos.length} video</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 flex items-center justify-center mb-6">
            {course.thumbnail ? (
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            ) : (
              <Play className="w-16 h-16 text-muted-foreground/30" />
            )}
          </div>
          <p className="text-muted-foreground">{course.description}</p>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-3">
            {course.modules.map((module) => (
              <Card key={module.id} className="glass overflow-hidden">
                <div className="p-3 bg-muted/30">
                  <p className="font-medium text-sm">{module.title}</p>
                  <p className="text-xs text-muted-foreground">{module.videos.length} video</p>
                </div>
                <div className="divide-y divide-border/50">
                  {module.videos.map((video) => (
                    <div key={video.id} className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-muted/20 cursor-pointer transition-colors">
                      <Play className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span className="flex-1 text-xs">{video.title}</span>
                      {video.duration && (
                        <span className="text-xs text-muted-foreground">{Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}</span>
                      )}
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
