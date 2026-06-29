import React from "react"
import { cn } from "../../utilities/cn"

export const GlassCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl glass-panel",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"
