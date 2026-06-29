import React from "react"
import { cn } from "../utilities/cn"

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, children, content, ...props }, ref) => {
    return (
      <div className="relative group inline-block">
        {children}
        <div
          ref={ref}
          role="tooltip"
          className={cn("invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute z-50 px-3 py-1.5 text-xs text-white bg-gray-900 rounded-lg shadow-sm transition-opacity dark:bg-gray-100 dark:text-gray-900", className)}
          {...props}
        >
          {content}
        </div>
      </div>
    )
  }
)
Tooltip.displayName = "Tooltip"
