"use client"

import { SmoothScroll } from "@/components/experience/smooth-scroll"
import { CustomCursor } from "@/components/experience/custom-cursor"
import { ScrollProgress } from "@/components/experience/scroll-progress"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      {children}
    </SmoothScroll>
  )
}
