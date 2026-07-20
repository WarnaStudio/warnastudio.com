import { UserRole } from "@prisma/client"

export type NavItem = {
  title: string
  href: string
  children?: NavItem[]
}

export type ServiceItem = {
  title: string
  description: string
  icon: string
  price?: string
  features?: string[]
}

export type PortfolioItem = {
  title: string
  category: string
  image: string
  description?: string
  client?: string
  year?: string
}

export type TestimonialItem = {
  name: string
  role: string
  content: string
  avatar?: string
  rating?: number
}

export type TeamMember = {
  name: string
  role: string
  image?: string
  bio?: string
}

export type StatItem = {
  value: string
  label: string
}

declare module "next-auth" {
  interface User {
    role?: string
  }
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      role?: string
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    id?: string
  }
}
