import React from "react"
import { cn } from "../../utilities/cn"

export const NeuralBorder = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-neural rounded-2xl", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
NeuralBorder.displayName = "NeuralBorder"
