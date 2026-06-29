import React from "react"
import { cn } from "../utilities/cn"

export const GridOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 dark:opacity-20",
          className
        )}
        {...props}
      />
    )
  }
)
GridOverlay.displayName = "GridOverlay"
