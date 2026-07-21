import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth?.token
    const isLoggedIn = !!token
    const isAdmin = (token?.user as any)?.role === "ADMIN"

    if (pathname.startsWith("/admin") && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    if (pathname.startsWith("/member") && !isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl
        if (pathname.startsWith("/admin")) return !!token
        if (pathname.startsWith("/member")) return !!token
        return true
      },
    },
    pages: {
      signIn: "/login",
    },
  }
)

export const config = {
  matcher: ["/admin", "/admin/:path*", "/member", "/member/:path*"],
}
