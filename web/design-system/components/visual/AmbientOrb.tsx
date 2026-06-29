import React from "react"
import { cn } from "../../utilities/cn"

export interface AmbientOrbProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "accent" | "neural" | "ai"
  size?: number
}

export const AmbientOrb = React.forwardRef<HTMLDivElement, AmbientOrbProps>(
  ({ className, color = "primary", size = 300, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute rounded-full blur-[100px] opacity-20 pointer-events-none mix-blend-screen dark:mix-blend-lighten",
          {
            "bg-primary-500": color === "primary",
            "bg-accent-500": color === "accent",
            "bg-neural-500": color === "neural",
            "bg-ai-500": color === "ai",
          },
          className
        )}
        style={{ width: size, height: size, ...props.style }}
        {...props}
      />
    )
  }
)
AmbientOrb.displayName = "AmbientOrb"
