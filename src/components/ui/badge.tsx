import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "success" | "warning" | "danger"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-muted text-muted-foreground": variant === "default",
          "bg-violet-500/10 text-violet-600": variant === "primary",
          "bg-emerald-500/10 text-emerald-600": variant === "success",
          "bg-amber-500/10 text-amber-600": variant === "warning",
          "bg-red-500/10 text-red-600": variant === "danger",
        },
        className
      )}
      {...props}
    />
  )
}
export { Badge }
