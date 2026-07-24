"use client"

import { useState } from "react"
import Link from "next/link"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.currentTarget)
    try {
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
    } catch {
      /* ignore */
    }
    setLoading(false)
  }

  return (
    <section className="relative min-h-[100svh] max-w-[1400px] mx-auto px-5 sm:px-8 pt-28 pb-24">
      <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-6">
        <span className="text-[#C64DFF]">Contact</span> · Start a project
      </p>
      <h1 className="text-5xl sm:text-7xl font-medium tracking-tight mb-4">LET&apos;S BUILD</h1>
      <p className="text-white/45 font-light max-w-md mb-14">
        Brief iklan, film, retainer, atau membership — kirim detailnya.
      </p>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-6">
          {[
            ["Email", "hello@warnastudio.com"],
            ["Base", "Indonesia"],
            ["Hours", "Sen — Jum, 09:00–18:00"],
          ].map(([l, v]) => (
            <div key={l} className="border-b border-white/10 pb-4">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/35 mb-1">{l}</div>
              <div className="text-lg font-light">{v}</div>
            </div>
          ))}
          <Link
            href="/work"
            data-cursor="hover"
            className="inline-flex font-mono text-[11px] tracking-[0.18em] uppercase text-white/50 hover:text-white pt-4"
          >
            ← Back to work
          </Link>
        </div>

        {success ? (
          <div className="border border-white/10 bg-black/40 backdrop-blur-md p-10 flex flex-col justify-center min-h-[360px]">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#C64DFF] mb-4">Sent</div>
            <p className="text-2xl font-medium mb-2">Message received.</p>
            <p className="text-white/45 font-light">Kami akan balas secepatnya.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-8 space-y-5">
            {[
              ["name", "Name", "text"],
              ["email", "Email", "email"],
              ["phone", "Phone", "tel"],
              ["subject", "Subject", "text"],
            ].map(([name, label, type]) => (
              <label key={name} className="block">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/35 mb-2 block">{label}</span>
                <input
                  name={name}
                  type={type}
                  required={name === "name" || name === "email" || name === "message"}
                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C64DFF]/50"
                />
              </label>
            ))}
            <label className="block">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/35 mb-2 block">Message</span>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm outline-none focus:border-[#C64DFF]/50 resize-y"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              data-cursor="hover"
              className="w-full h-12 bg-white text-black font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-[#C64DFF] hover:text-white transition-colors disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
