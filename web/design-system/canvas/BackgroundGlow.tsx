import React from "react"
import { cn } from "../utilities/cn"

export interface BackgroundGlowProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: "primary" | "accent" | "neural" | "ai"
  size?: "sm" | "md" | "lg" | "xl"
  position?: "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export const BackgroundGlow = React.forwardRef<HTMLDivElement, BackgroundGlowProps>(
  ({ className, color = "primary", size = "lg", position = "center", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute rounded-full mix-blend-screen opacity-20 dark:opacity-30 blur-[100px]",
          {
            "bg-primary-500": color === "primary",
            "bg-accent-500": color === "accent",
            "bg-neural-500": color === "neural",
            "bg-ai-500": color === "ai",
            "w-64 h-64": size === "sm",
            "w-96 h-96": size === "md",
            "w-[40rem] h-[40rem]": size === "lg",
            "w-[60rem] h-[60rem]": size === "xl",
            "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2": position === "center",
            "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2": position === "top",
            "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2": position === "bottom",
            "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2": position === "left",
            "top-1/2 right-0 translate-x-1/2 -translate-y-1/2": position === "right",
            "top-0 left-0 -translate-x-1/4 -translate-y-1/4": position === "top-left",
            "top-0 right-0 translate-x-1/4 -translate-y-1/4": position === "top-right",
            "bottom-0 left-0 -translate-x-1/4 translate-y-1/4": position === "bottom-left",
            "bottom-0 right-0 translate-x-1/4 translate-y-1/4": position === "bottom-right",
          },
          className
        )}
        {...props}
      />
    )
  }
)
BackgroundGlow.displayName = "BackgroundGlow"
