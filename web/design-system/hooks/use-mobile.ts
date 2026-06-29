"use client"

import { useEffect, useState } from "react"

/**
 * Neural Civic OS Hook
 * Safely detects mobile viewport size (<= 768px).
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)")
    const onChange = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    mql.addEventListener("change", onChange)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(window.innerWidth <= 768)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
