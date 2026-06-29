import React from "react"
import { cn } from "../utilities/cn"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "danger" | "warning" | "success"
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-2xl border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
          {
            "bg-white border-gray-200 text-gray-950 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-50": variant === "default",
            "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600 bg-red-50 dark:bg-red-950/20": variant === "danger",
            "border-amber-500/50 text-amber-600 dark:border-amber-500 [&>svg]:text-amber-600 bg-amber-50 dark:bg-amber-950/20": variant === "warning",
            "border-emerald-500/50 text-emerald-600 dark:border-emerald-500 [&>svg]:text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20": variant === "success",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"
