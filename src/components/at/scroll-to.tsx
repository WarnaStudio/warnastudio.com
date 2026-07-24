"use client"

import { useEffect } from "react"

export function ScrollTo({ id }: { id: string }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" })
    }, 80)
    return () => clearTimeout(t)
  }, [id])
  return null
}
