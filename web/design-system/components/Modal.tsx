import React from "react"
import { cn } from "../utilities/cn"

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ className, children, isOpen, onClose, ...props }, ref) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          className={cn("w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950", className)}
          {...props}
        >
          {children}
        </div>
      </div>
    )
  }
)
Modal.displayName = "Modal"
