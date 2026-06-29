import React from "react"
import { cn } from "../../utilities/cn"

export const PageContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          "flex-1 w-full max-w-container-max mx-auto px-4 sm:px-6 lg:px-8 z-content relative",
          className
        )}
        {...props}
      >
        {children}
      </main>
    )
  }
)
PageContainer.displayName = "PageContainer"
