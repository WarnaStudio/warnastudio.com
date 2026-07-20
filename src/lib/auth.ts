import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"
import type { NextAuthOptions } from "next-auth"
import type { User as NextAuthUser } from "next-auth"

export const authOptions: NextAuthOptions = {
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const email = credentials.email as string
        const password = credentials.password as string

        if (!email || !password) return null

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.password) return null

        const isValid = await compare(password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        } as NextAuthUser
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = (user as any).id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role as string
        (session.user as any).id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
}

export const handler = NextAuth(authOptions)
export default handler

import { getServerSession } from "next-auth"
export async function auth() {
  return getServerSession(authOptions)
}

import { signIn as nextSignIn, signOut as nextSignOut } from "next-auth/react"
export { nextSignIn as signIn, nextSignOut as signOut }
