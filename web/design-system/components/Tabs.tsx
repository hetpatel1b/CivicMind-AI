import React from "react"
import { cn } from "../utilities/cn"

export const Tabs = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex flex-col space-y-4", className)} {...props} />
  }
)
Tabs.displayName = "Tabs"

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn("inline-flex h-10 items-center justify-center rounded-xl bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400", className)}
        {...props}
      />
    )
  }
)
TabsList.displayName = "TabsList"
