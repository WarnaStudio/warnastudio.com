"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreateCourse() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    shortDesc: "",
    price: 0,
    category: "",
    level: "all",
    published: false,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : name === "price" ? Number(value) : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || "Failed to create course")
      }
      router.push("/admin/courses")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Create Course</h1>
      <Card className="max-w-2xl p-6 glass">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
          <Input label="Slug (kosongkan untuk auto-generate)" name="slug" value={form.slug} onChange={handleChange} />
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
            />
          </div>
          <Input label="Short Description" name="shortDesc" value={form.shortDesc} onChange={handleChange} />
          <Input label="Price (Rp)" name="price" type="number" value={form.price} onChange={handleChange} />
          <Input label="Category" name="category" value={form.category} onChange={handleChange} />
          <div>
            <label className="block text-sm font-medium mb-1">Level</label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <option value="all">All</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="rounded" />
            Published
          </label>

          {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">{error}</div>}

          <div className="flex gap-3">
            <Button type="submit" variant="primary" loading={loading}>Create Course</Button>
            <Button type="button" variant="ghost" onClick={() => router.push("/admin/courses")}>Cancel</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
