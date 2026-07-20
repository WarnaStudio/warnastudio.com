import Link from "next/link"
import { BookOpen, LogOut, User } from "lucide-react"

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold">Member Area</h1>
            <p className="text-xs text-muted-foreground">Akses kursus dan materi Anda</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
