import React from "react"
import { cn } from "../../utilities/cn"

export const AppShell = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative min-h-screen w-full flex flex-col bg-background text-foreground", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AppShell.displayName = "AppShell"
