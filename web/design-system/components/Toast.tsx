import React from "react"
import { cn } from "../utilities/cn"

export const Toast = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        className={cn(
          "pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 pr-8 shadow-lg transition-all dark:border-gray-800 dark:bg-gray-950",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Toast.displayName = "Toast"
