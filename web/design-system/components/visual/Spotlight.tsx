import React from "react"
import { cn } from "../../utilities/cn"

export const Spotlight = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 pointer-events-none [border-radius:inherit] overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="absolute -inset-px [border-radius:inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.1),transparent_40%)] dark:bg-[radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.05),transparent_40%)]" />
      </div>
    )
  }
)
Spotlight.displayName = "Spotlight"
