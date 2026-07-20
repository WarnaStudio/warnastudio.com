import Link from "next/link"
import { LayoutDashboard, Users, Briefcase, Wallet, BookOpen, Newspaper, Ticket, Settings } from "lucide-react"

const adminNav = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "CRM", href: "/admin/crm", icon: Users },
  { title: "Projects", href: "/admin/projects", icon: Briefcase },
  { title: "Finance", href: "/admin/finance", icon: Wallet },
  { title: "Courses", href: "/admin/courses", icon: BookOpen },
  { title: "Blog", href: "/admin/blog", icon: Newspaper },
  { title: "Tickets", href: "/admin/tickets", icon: Ticket },
  { title: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-16 flex">
      <aside className="hidden lg:flex flex-col w-64 border-r border-border/50 bg-muted/20 p-4 gap-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">Admin Panel</p>
        {adminNav.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Icon className="w-4 h-4" />
              {item.title}
            </Link>
          )
        })}
      </aside>
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  )
}
