"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Video {
  id: string
  title: string
  videoUrl: string
  duration: number | null
  order: number
  free: boolean
  description: string | null
}

interface Module {
  id: string
  title: string
  description: string | null
  order: number
  videos: Video[]
}

interface Course {
  id: string
  title: string
  slug: string
  description: string | null
  shortDesc: string | null
  price: number
  thumbnail: string | null
  category: string | null
  level: string
  published: boolean
  featured: boolean
  modules: Module[]
}

export default function EditCourse() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [addingModule, setAddingModule] = useState(false)
  const [editingVideo, setEditingVideo] = useState<{ moduleId: string; video?: Video } | null>(null)

  useEffect(() => {
    fetch(`/api/admin/courses/${slug}`)
      .then((r) => r.json())
      .then((d) => { setCourse(d); setLoading(false) })
      .catch(() => { setError("Failed to load course"); setLoading(false) })
  }, [slug])

  function updateCourse(field: string, value: any) {
    if (!course) return
    setCourse({ ...course, [field]: value })
  }

  async function saveCourse() {
    if (!course) return
    setSaving(true)
    setError("")
    setSuccess("")
    try {
      const res = await fetch(`/api/admin/courses/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: course.title,
          description: course.description,
          shortDesc: course.shortDesc,
          price: course.price,
          category: course.category,
          level: course.level,
          published: course.published,
        }),
      })
      if (!res.ok) throw new Error("Failed to save")
      setSuccess("Course saved!")
      setTimeout(() => setSuccess(""), 2000)
    } catch (e: any) {
      setError(e.message)
    }
    setSaving(false)
  }

  async function addModule() {
    if (!course) return
    setAddingModule(true)
    try {
      const res = await fetch(`/api/admin/courses/${slug}/modules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Module" }),
      })
      if (!res.ok) throw new Error("Failed to add module")
      const mod = await res.json()
      setCourse({ ...course, modules: [...course.modules, { ...mod, videos: [] }] })
    } catch (e: any) {
      setError(e.message)
    }
    setAddingModule(false)
  }

  async function updateModule(moduleId: string, data: any) {
    if (!course) return
    try {
      const res = await fetch(`/api/admin/modules/${moduleId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error("Failed to update module")
      setCourse({ ...course, modules: course.modules.map((m) => (m.id === moduleId ? { ...m, ...data } : m)) })
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function deleteModule(moduleId: string) {
    if (!course || !confirm("Delete this module?")) return
    try {
      const res = await fetch(`/api/admin/modules/${moduleId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete module")
      setCourse({ ...course, modules: course.modules.filter((m) => m.id !== moduleId) })
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function addVideo(moduleId: string) {
    if (!course) return
    try {
      const res = await fetch(`/api/admin/modules/${moduleId}/videos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Video", videoUrl: "" }),
      })
      if (!res.ok) throw new Error("Failed to add video")
      const video = await res.json()
      setCourse({ ...course, modules: course.modules.map((m) => (m.id === moduleId ? { ...m, videos: [...m.videos, video] } : m)) })
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function updateVideo(videoId: string, moduleId: string, data: any) {
    if (!course) return
    try {
      const res = await fetch(`/api/admin/videos/${videoId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error("Failed to update video")
      setCourse({
        ...course,
        modules: course.modules.map((m) => (m.id === moduleId ? { ...m, videos: m.videos.map((v) => (v.id === videoId ? { ...v, ...data } : v)) } : m)),
      })
    } catch (e: any) {
      setError(e.message)
    }
  }

  async function deleteVideo(videoId: string, moduleId: string) {
    if (!course || !confirm("Delete this video?")) return
    try {
      const res = await fetch(`/api/admin/videos/${videoId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete video")
      setCourse({ ...course, modules: course.modules.map((m) => (m.id === moduleId ? { ...m, videos: m.videos.filter((v) => v.id !== videoId) } : m)) })
    } catch (e: any) {
      setError(e.message)
    }
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>
  if (!course) return <p className="text-muted-foreground">Course not found</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit Course: {course.title}</h1>

      {error && <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500 mb-4">{error}</div>}
      {success && <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-500 mb-4">{success}</div>}

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-4">
          <Card className="p-5 glass">
            <h2 className="font-semibold mb-4">Course Settings</h2>
            <div className="space-y-3">
              <Input label="Title" value={course.title} onChange={(e) => updateCourse("title", e.target.value)} />
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={course.description || ""} onChange={(e) => updateCourse("description", e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none" />
              </div>
              <Input label="Short Description" value={course.shortDesc || ""} onChange={(e) => updateCourse("shortDesc", e.target.value)} />
              <Input label="Price (Rp)" type="number" value={course.price} onChange={(e) => updateCourse("price", Number(e.target.value))} />
              <Input label="Category" value={course.category || ""} onChange={(e) => updateCourse("category", e.target.value)} />
              <div>
                <label className="block text-sm font-medium mb-1">Level</label>
                <select value={course.level} onChange={(e) => updateCourse("level", e.target.value)} className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50">
                  <option value="all">All</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={course.published} onChange={(e) => updateCourse("published", e.target.checked)} className="rounded" />
                Published
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={course.featured} onChange={(e) => updateCourse("featured", e.target.checked)} className="rounded" />
                Featured
              </label>
              <Button variant="primary" className="w-full" loading={saving} onClick={saveCourse}>Save Changes</Button>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-2 space-y-4">
          <Card className="p-5 glass">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Modules & Videos</h2>
              <Button variant="primary" size="sm" loading={addingModule} onClick={addModule}>+ Add Module</Button>
            </div>

            {course.modules.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">Belum ada module. Klik "+ Add Module" untuk mulai.</p>
            )}

            <div className="space-y-4">
              {course.modules.map((mod) => (
                <Card key={mod.id} className="border border-border/50 overflow-hidden">
                  <div className="bg-muted/20 p-3 flex items-center justify-between gap-2">
                    <input
                      value={mod.title}
                      onChange={(e) => {
                        const updated = course.modules.map((m) => (m.id === mod.id ? { ...m, title: e.target.value } : m))
                        setCourse({ ...course, modules: updated })
                      }}
                      onBlur={() => updateModule(mod.id, { title: mod.title })}
                      className="flex-1 bg-transparent font-medium text-sm border-b border-transparent focus:border-violet-500 focus:outline-none px-1"
                    />
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => addVideo(mod.id)}>+ Video</Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteModule(mod.id)} className="text-red-400 hover:text-red-300">Delete</Button>
                    </div>
                  </div>
                  {mod.videos.length > 0 && (
                    <div className="divide-y divide-border/50">
                      {mod.videos.map((video) => (
                        <div key={video.id} className="p-3 flex items-center gap-2 text-sm">
                          <input
                            value={video.title}
                            onChange={(e) => {
                              const updated = course.modules.map((m) => (m.id === mod.id ? { ...m, videos: m.videos.map((v) => (v.id === video.id ? { ...v, title: e.target.value } : v)) } : m))
                              setCourse({ ...course, modules: updated })
                            }}
                            onBlur={() => updateVideo(video.id, mod.id, { title: video.title })}
                            className="flex-1 bg-transparent border-b border-transparent focus:border-violet-500 focus:outline-none px-1 text-xs"
                            placeholder="Video title"
                          />
                          <input
                            value={video.videoUrl}
                            onChange={(e) => {
                              const updated = course.modules.map((m) => (m.id === mod.id ? { ...m, videos: m.videos.map((v) => (v.id === video.id ? { ...v, videoUrl: e.target.value } : v)) } : m))
                              setCourse({ ...course, modules: updated })
                            }}
                            onBlur={() => video.videoUrl && updateVideo(video.id, mod.id, { videoUrl: video.videoUrl })}
                            className="w-40 bg-muted/30 border border-border/50 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                            placeholder="Video URL"
                          />
                          <input
                            value={video.duration || ""}
                            onChange={(e) => {
                              const dur = e.target.value ? Number(e.target.value) : null
                              const updated = course.modules.map((m) => (m.id === mod.id ? { ...m, videos: m.videos.map((v) => (v.id === video.id ? { ...v, duration: dur } : v)) } : m))
                              setCourse({ ...course, modules: updated })
                            }}
                            onBlur={() => updateVideo(video.id, mod.id, { duration: video.duration })}
                            className="w-16 bg-muted/30 border border-border/50 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500/50"
                            placeholder="Sec"
                          />
                          <label className="flex items-center gap-1 text-xs shrink-0">
                            <input type="checkbox" checked={video.free} onChange={(e) => updateVideo(video.id, mod.id, { free: e.target.checked })} className="rounded" />
                            Free
                          </label>
                          <button onClick={() => deleteVideo(video.id, mod.id)} className="text-red-400 hover:text-red-300 text-xs shrink-0">✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                  {mod.videos.length === 0 && <p className="text-xs text-muted-foreground text-center py-3">Belum ada video. Klik "+ Video".</p>}
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
