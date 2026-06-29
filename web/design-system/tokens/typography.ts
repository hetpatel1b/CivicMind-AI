/**
 * Neural Civic OS - Typography Tokens
 */

export const typography = {
  fonts: {
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },
  sizes: {
    "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
    "display-l": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
    "display-m": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
    "heading-xl": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
    "heading-l": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
    "heading-m": ["1.5rem", { lineHeight: "1.3", letterSpacing: "0em" }],
    "heading-s": ["1.25rem", { lineHeight: "1.3", letterSpacing: "0em" }],
    "body-xl": ["1.125rem", { lineHeight: "1.5", letterSpacing: "0em" }],
    "body-l": ["1rem", { lineHeight: "1.5", letterSpacing: "0em" }],
    "body": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0em" }],
    "small": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0em" }],
    "caption": ["0.625rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
    "overline": ["0.625rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
  },
  weights: {
    light: "300",
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  }
} as const;
