"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Key, Plus, Trash2, Copy, Check } from "lucide-react"
import Link from "next/link"

interface ApiKey {
  id: string
  key: string
  label: string
  active: boolean
  quotaUsed: number
  quotaLimit: number
  user?: { name: string | null; email: string }
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newKey, setNewKey] = useState("")
  const [newLabel, setNewLabel] = useState("")
  const [copied, setCopied] = useState("")

  useEffect(() => {
    fetchKeys()
  }, [])

  async function fetchKeys() {
    try {
      const res = await fetch("/api/mpt/api-keys")
      const data = await res.json()
      setKeys(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function createKey() {
    setCreating(true)
    try {
      const res = await fetch("/api/mpt/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel || "default", quotaLimit: 100 }),
      })
      const data = await res.json()
      if (data.key) {
        setNewKey(data.key)
        setNewLabel("")
        fetchKeys()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setCreating(false)
    }
  }

  async function deleteKey(id: string) {
    if (!confirm("Delete this API key? This cannot be undone.")) return
    try {
      await fetch("/api/mpt/api-keys", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      fetchKeys()
    } catch (err) {
      console.error(err)
    }
  }

  function copyKey(key: string) {
    navigator.clipboard.writeText(key)
    setCopied(key)
    setTimeout(() => setCopied(""), 2000)
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/mpt" className="text-muted-foreground hover:text-foreground">← Video Studio</Link>
        <h1 className="text-2xl font-bold">API Keys</h1>
      </div>

      {newKey && (
        <Card className="p-6 glass mb-6 border-amber-500/30">
          <p className="text-sm text-amber-400 font-medium mb-2">API Key Created — Save it now!</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-3 rounded-lg bg-muted/50 text-sm font-mono break-all">{newKey}</code>
            <button
              onClick={() => copyKey(newKey)}
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              {copied === newKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">This key won&apos;t be shown again. Copy it now.</p>
          <button
            onClick={() => setNewKey("")}
            className="mt-3 text-sm text-muted-foreground hover:text-foreground"
          >
            Dismiss
          </button>
        </Card>
      )}

      <Card className="p-6 glass mb-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Label (e.g. production, client-x)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-amber-500/50"
          />
          <button
            onClick={createKey}
            disabled={creating}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors text-sm font-medium disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            {creating ? "Creating..." : "Generate Key"}
          </button>
        </div>
      </Card>

      {loading ? (
        <p className="text-muted-foreground text-center py-8">Loading...</p>
      ) : keys.length === 0 ? (
        <Card className="p-8 glass text-center">
          <Key className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No API keys yet. Generate one above.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {keys.map((k) => (
            <Card key={k.id} className="p-5 glass">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-medium">{k.label}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      k.active ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                    }`}>
                      {k.active ? "Active" : "Revoked"}
                    </span>
                    {k.user && (
                      <span className="text-xs text-muted-foreground">{k.user.email}</span>
                    )}
                  </div>
                  <code className="text-sm font-mono text-muted-foreground">{k.key}</code>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Usage: {k.quotaUsed} / {k.quotaLimit}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden max-w-xs">
                      <div
                        className="h-full bg-amber-500/50"
                        style={{ width: `${Math.min(100, (k.quotaUsed / k.quotaLimit) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteKey(k.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
