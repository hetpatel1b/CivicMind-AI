import React from "react"
import { cn } from "../../utilities/cn"

export const ContentGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContentGrid.displayName = "ContentGrid"
