import React from "react"
import { cn } from "../../utilities/cn"

export const ContentWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full max-w-container-reading mx-auto", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ContentWrapper.displayName = "ContentWrapper"
