import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, BookOpen } from "lucide-react"
import { auth } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function MemberDashboard() {
  const session = await auth()
  if (!session?.user?.id) return <p className="text-muted-foreground">Silakan login terlebih dahulu.</p>

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: {
      course: {
        include: {
          modules: {
            include: { videos: true },
          },
        },
      },
    },
    orderBy: { enrolledAt: "desc" },
  })

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Kursus Saya</h2>
      {enrollments.length === 0 && (
        <Card className="p-12 glass text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Anda belum terdaftar di kursus manapun</p>
          <Link href="/courses">
            <Button variant="primary">Jelajahi Kursus</Button>
          </Link>
        </Card>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {enrollments.map((enrollment) => {
          const totalVideos = enrollment.course.modules.reduce((a, m) => a + m.videos.length, 0)
          const progress = Math.round(enrollment.progress)
          return (
            <Link key={enrollment.id} href={`/member/courses/${enrollment.course.slug}`}>
              <Card className="group h-full overflow-hidden glass hover:shadow-lg transition-all">
                <div className="aspect-video bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 flex items-center justify-center">
                  <Play className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold group-hover:text-violet-400 transition-colors mb-2">{enrollment.course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span>{totalVideos} video</span>
                    <span>•</span>
                    <Badge variant={enrollment.status === "active" ? "primary" : "success"}>{enrollment.status}</Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{progress}% selesai</p>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
