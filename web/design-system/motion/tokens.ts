import type { Transition } from "framer-motion"

/* 
 * CivicMind AI - Motion Tokens
 * Premium, gentle, and highly tuned motion physics.
 */

// Easing Curves (Bezier)
type CubicBezier = [number, number, number, number];

export const ease: Record<string, CubicBezier> = {
  fast: [0.25, 1, 0.5, 1],
  medium: [0.4, 0, 0.2, 1],
  slow: [0.22, 1, 0.36, 1],
  out: [0.0, 0.0, 0.2, 1],
  in: [0.4, 0.0, 1, 1],
  inOut: [0.4, 0.0, 0.2, 1],
  smooth: [0.16, 1, 0.3, 1],
}

// Spring Physics
export const spring = {
  bouncy: { type: "spring", stiffness: 400, damping: 15, mass: 1 },
  gentle: { type: "spring", stiffness: 200, damping: 20, mass: 1 },
  slow: { type: "spring", stiffness: 100, damping: 20, mass: 1 },
  stiff: { type: "spring", stiffness: 500, damping: 30, mass: 1 },
  wobbly: { type: "spring", stiffness: 300, damping: 10, mass: 1 },
} as Record<string, Transition>

// Duration Presets (for tweens/eases)
export const duration = {
  fast: 0.15,
  medium: 0.3,
  slow: 0.5,
  hero: 0.8,
}

// Pre-packaged Transitions
export const transition: Record<string, Transition> = {
  layout: spring.gentle,
  hover: { type: "tween", ease: ease.out, duration: duration.fast },
  modal: spring.gentle,
  drawer: spring.gentle,
  tooltip: { type: "tween", ease: ease.out, duration: duration.fast },
  page: { type: "tween", ease: ease.smooth, duration: duration.medium },
}
