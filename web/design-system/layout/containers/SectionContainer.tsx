import React from "react"
import { cn } from "../../utilities/cn"

export const SectionContainer = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("w-full py-12 md:py-16 lg:py-24", className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)
SectionContainer.displayName = "SectionContainer"
