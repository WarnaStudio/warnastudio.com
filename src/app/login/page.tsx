"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const [csrfToken, setCsrfToken] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/auth/csrf").then(r => r.json()).then(d => setCsrfToken(d.csrfToken)).catch(() => {})
    if (window.location.search.includes("error")) setError("Email atau password salah")
  }, [])

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

        <form action="/api/auth/callback/credentials" method="POST" className="space-y-4">
          <input type="hidden" name="csrfToken" value={csrfToken} />
          <input type="hidden" name="callbackUrl" value="/admin" />
          <Input label="Email" id="email" name="email" type="email" placeholder="admin@warnastudio.com" required />
          <Input label="Password" id="password" name="password" type="password" placeholder="••••••••" required />

          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">{error}</div>}

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={!csrfToken}>Masuk</Button>
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
