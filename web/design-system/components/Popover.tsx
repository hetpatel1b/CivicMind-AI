import React from "react"
import { cn } from "../utilities/cn"

export const Popover = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative group inline-block">
        {children}
        <div
          ref={ref}
          role="dialog"
          className={cn("absolute z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-md outline-none dark:border-gray-800 dark:bg-gray-950", className)}
          {...props}
        />
      </div>
    )
  }
)
Popover.displayName = "Popover"
