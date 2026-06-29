import React from "react"
import { cn } from "../utilities/cn"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "danger" | "glass"
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
          {
            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100": variant === "default",
            "bg-[var(--color-success-500)]/10 text-[var(--color-success-500)]": variant === "success",
            "bg-[var(--color-warning-500)]/10 text-[var(--color-warning-500)]": variant === "warning",
            "bg-[var(--color-danger-500)]/10 text-[var(--color-danger-500)]": variant === "danger",
            "bg-white/10 backdrop-blur-md border border-white/20 text-white": variant === "glass",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"
