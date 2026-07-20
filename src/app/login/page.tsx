"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = new FormData(e.currentTarget)
    const email = form.get("email") as string
    const password = form.get("password") as string

    // Fetch CSRF token
    const csrfRes = await fetch("/api/auth/csrf")
    const { csrfToken } = await csrfRes.json()

    // Login via direct form POST
    const loginRes = await fetch("/api/auth/callback/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ csrfToken, email, password, callbackUrl: window.location.href }),
    })

    if (loginRes.redirected || loginRes.status === 302) {
      window.location.href = "/admin"
    } else {
      setError("Email atau password salah")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-bg">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>
      <Card className="relative w-full max-w-md p-8 glass border-border/50">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Selamat Datang</h1>
          <p className="text-sm text-muted-foreground">Masuk ke akun WarnaStudio Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" id="email" name="email" type="email" placeholder="admin@warnastudio.com" required />
          <Input label="Password" id="password" name="password" type="password" placeholder="••••••••" required />
          
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
            Masuk
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Belum punya akun?{" "}
          <Link href="/register" className="text-violet-400 hover:text-violet-300 transition-colors">
            Daftar
          </Link>
        </p>
      </Card>
    </div>
  )
}
