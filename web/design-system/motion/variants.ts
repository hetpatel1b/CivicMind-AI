import type { Variants } from "framer-motion"
import { transition } from "./tokens"

/*
 * CivicMind AI - Reusable Variants
 */

export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transition.page },
  exit: { opacity: 0, transition: transition.page },
}

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: transition.page },
  exit: { opacity: 0, y: 15, transition: transition.page },
}

export const fadeDown: Variants = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0, transition: transition.page },
  exit: { opacity: 0, y: -15, transition: transition.page },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: transition.modal },
  exit: { opacity: 0, scale: 0.95, transition: transition.modal },
}

export const staggerContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: transition.page },
  exit: { opacity: 0, y: 10, transition: transition.page },
}

export const drawerRight: Variants = {
  initial: { opacity: 0, x: "100%" },
  animate: { opacity: 1, x: 0, transition: transition.drawer },
  exit: { opacity: 0, x: "100%", transition: transition.drawer },
}

// Hover & Tap Interactive Engines (Not variants, just state objects)
export const interactive = {
  cardLift: { y: -4, transition: transition.hover },
  buttonPress: { scale: 0.97, transition: transition.hover },
  softTilt: { rotateX: 2, rotateY: -2, transition: transition.hover },
  glowHover: {
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
    transition: transition.hover,
  },
}
