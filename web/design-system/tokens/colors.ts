/**
 * Neural Civic OS - Color Tokens
 * Premium AI-focused color palette.
 * These map directly to CSS variables defined in globals.css
 */

export const colors = {
  primary: {
    50: "var(--color-primary-50)",
    100: "var(--color-primary-100)",
    200: "var(--color-primary-200)",
    300: "var(--color-primary-300)",
    400: "var(--color-primary-400)",
    500: "var(--color-primary-500)", // Primary Blue
    600: "var(--color-primary-600)",
    700: "var(--color-primary-700)",
    800: "var(--color-primary-800)",
    900: "var(--color-primary-900)",
    950: "var(--color-primary-950)",
  },
  accent: {
    500: "var(--color-accent-500)", // Electric Blue
  },
  neural: {
    500: "var(--color-neural-500)", // Neural Purple
  },
  ai: {
    500: "var(--color-ai-500)", // AI Cyan
  },
  success: {
    500: "var(--color-success-500)", // Soft Emerald
  },
  warning: {
    500: "var(--color-warning-500)", // Warning Amber
  },
  danger: {
    500: "var(--color-danger-500)", // Danger Red
  },
  surface: {
    light: "var(--color-surface-light)",
    dark: "var(--color-surface-dark)",
    glass: "var(--color-surface-glass)",
  }
} as const;
