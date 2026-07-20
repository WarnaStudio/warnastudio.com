"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@warnastudio.com" },
  { icon: Phone, label: "Telepon", value: "+62 812-3456-7890" },
  { icon: MapPin, label: "Lokasi", value: "Jakarta, Indonesia" },
  { icon: Clock, label: "Jam Kerja", value: "Sen - Jum, 09:00 - 18:00" },
]

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        subject: form.get("subject"),
        message: form.get("message"),
      }),
    })
    if (res.ok) setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted-foreground mb-4">
            Kontak
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Hubungi <span className="gradient-text">Kami</span>
          </h1>
          <p className="text-muted-foreground">
            Punya project atau pertanyaan? Kami siap membantu mewujudkan ide Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <Card key={info.label} className="p-4 flex items-center gap-4 glass">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{info.label}</p>
                    <p className="text-sm font-medium">{info.value}</p>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="lg:col-span-3">
            {success ? (
              <Card className="p-8 glass text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Pesan Terkirim!</h3>
                <p className="text-sm text-muted-foreground">Tim kami akan menghubungi Anda dalam 1x24 jam.</p>
              </Card>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Nama" id="name" name="name" placeholder="Nama lengkap" required />
                  <Input label="Email" id="email" name="email" type="email" placeholder="email@example.com" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Telepon" id="phone" name="phone" placeholder="+62 812-xxxx" />
                  <Input label="Subjek" id="subject" name="subject" placeholder="Project / Konsultasi" />
                </div>
                <Textarea label="Pesan" id="message" name="message" placeholder="Deskripsikan project atau pertanyaan Anda..." required />
                <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                  Kirim Pesan
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
