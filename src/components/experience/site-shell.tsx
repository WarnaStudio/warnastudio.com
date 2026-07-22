"use client"

import { SmoothScroll } from "@/components/experience/smooth-scroll"
import { CustomCursor } from "@/components/experience/custom-cursor"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      {children}
    </SmoothScroll>
  )
}
