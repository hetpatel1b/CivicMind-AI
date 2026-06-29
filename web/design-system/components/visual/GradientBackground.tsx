import React from "react"
import { cn } from "../../utilities/cn"

export interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "aurora" | "mesh"
  withNoise?: boolean
}

export const GradientBackground = React.forwardRef<HTMLDivElement, GradientBackgroundProps>(
  ({ className, variant = "aurora", withNoise = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 -z-10 pointer-events-none",
          {
            "bg-gradient-aurora": variant === "aurora",
            "bg-gradient-mesh": variant === "mesh",
          },
          className
        )}
        {...props}
      >
        {withNoise && <div className="absolute inset-0 bg-noise" />}
      </div>
    )
  }
)
GradientBackground.displayName = "GradientBackground"
