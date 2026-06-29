import React from "react"
import { cn } from "../utilities/cn"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "ghost" | "danger" | "outline"
  size?: "sm" | "md" | "lg" | "icon"
}

export const buttonVariants = (variant: ButtonProps["variant"] = "primary", size: ButtonProps["size"] = "md", className?: string) => {
  return cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    {
      "bg-[var(--color-primary-500)] text-white hover:bg-[var(--color-primary-600)]": variant === "primary",
      "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20": variant === "glass",
      "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800": variant === "ghost",
      "bg-[var(--color-danger-500)] text-white hover:opacity-90": variant === "danger",
      "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700": variant === "secondary",
      "border border-gray-200 dark:border-gray-800 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800": variant === "outline",
      "h-9 px-4 text-sm": size === "sm",
      "h-10 px-6 text-sm": size === "md",
      "h-12 px-8 text-base": size === "lg",
      "h-10 w-10 p-0": size === "icon",
    },
    className
  )
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonVariants(variant, size, className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
