"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = new FormData(e.currentTarget)
    const password = form.get("password") as string
    const confirm = form.get("confirmPassword") as string

    if (password !== confirm) {
      setError("Password tidak cocok")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Gagal mendaftar")
      } else {
        setSuccess(true)
        setTimeout(() => router.push("/login"), 2000)
      }
    } catch {
      setError("Terjadi kesalahan")
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 gradient-bg">
        <Card className="relative w-full max-w-md p-8 glass text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-sm text-muted-foreground">Anda akan dialihkan ke halaman login...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 gradient-bg">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
      </div>
      <Card className="relative w-full max-w-md p-8 glass border-border/50">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Buat Akun</h1>
          <p className="text-sm text-muted-foreground">Bergabung dengan WarnaStudio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nama" id="name" name="name" placeholder="Nama lengkap" required />
          <Input label="Email" id="email" name="email" type="email" placeholder="email@example.com" required />
          <Input label="Password" id="password" name="password" type="password" placeholder="Min. 6 karakter" required minLength={6} />
          <Input label="Konfirmasi Password" id="confirmPassword" name="confirmPassword" type="password" placeholder="Ulangi password" required />

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
            Daftar
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
            Masuk
          </Link>
        </p>
      </Card>
    </div>
  )
}
