import React from "react"
import { cn } from "../utilities/cn"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800", className)} {...props}>
        {src ? (
          <img className="aspect-square h-full w-full object-cover" src={src} alt={alt || "Avatar"} />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium text-gray-500 dark:text-gray-400">
            {fallback || "?"}
          </span>
        )}
      </div>
    )
  }
)
Avatar.displayName = "Avatar"
