import React from "react"
import { cn } from "../utilities/cn"

export const MeshOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("absolute inset-0 bg-gradient-mesh opacity-40 dark:opacity-20", className)}
        {...props}
      />
    )
  }
)
MeshOverlay.displayName = "MeshOverlay"
