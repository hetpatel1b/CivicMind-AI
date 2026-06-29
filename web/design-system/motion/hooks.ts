"use client"

import { useState, useEffect } from "react"
import { useReducedMotion as useFramerReducedMotion } from "framer-motion"

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return mousePosition
}

/**
 * Hook to determine if user prefers reduced motion.
 * Directly exports Framer Motion's hook for architecture abstraction.
 */
export function useReducedMotion() {
  return useFramerReducedMotion()
}

/**
 * Reusable hook to track hover state on any DOM node.
 */
export function useHoverState() {
  const [isHovered, setIsHovered] = useState(false)
  
  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }

  return { isHovered, hoverProps }
}
