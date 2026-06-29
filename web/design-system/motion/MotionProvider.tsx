"use client"

import React from "react"
import { MotionConfig } from "framer-motion"

export interface MotionProviderProps {
  children: React.ReactNode
}

/**
 * Enforces accessibility globally by respecting prefers-reduced-motion media query.
 * All framer-motion animations under this provider will instantly resolve if the OS preference is set.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
