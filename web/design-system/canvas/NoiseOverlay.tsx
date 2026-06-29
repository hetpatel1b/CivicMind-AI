import React from "react"
import { cn } from "../utilities/cn"

export const NoiseOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 bg-noise mix-blend-overlay", className)}
        {...props}
      />
    )
  }
)
NoiseOverlay.displayName = "NoiseOverlay"
