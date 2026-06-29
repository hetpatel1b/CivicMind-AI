import React from "react"
import { cn } from "../../utilities/cn"

export const SurfaceLayout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-surface-light dark:bg-surface-dark border border-border rounded-2xl p-6 shadow-soft", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SurfaceLayout.displayName = "SurfaceLayout"
