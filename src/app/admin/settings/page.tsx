"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SettingsAdmin() {
  const [saved, setSaved] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      <Card className="p-6 glass max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Site Name" id="siteName" defaultValue="WarnaStudio" />
          <Input label="Site Description" id="siteDesc" defaultValue="Creative Technology Company" />
          <Input label="Contact Email" id="contactEmail" type="email" defaultValue="hello@warnastudio.com" />
          <Input label="WhatsApp Number" id="wa" placeholder="+62812xxxx" />
          {saved && <p className="text-sm text-emerald-500">Settings saved!</p>}
          <Button type="submit" variant="primary">Save Settings</Button>
        </form>
      </Card>
    </div>
  )
}
