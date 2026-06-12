/**
 * Ormania Design Tokens — single source of truth for colors, typography,
 * spacing, motion, and effects across the entire showroom rebuild.
 */

export const colors = {
  ink: {
    DEFAULT: "#0a0908",
    2: "#14110f",
    3: "#1c1814",
  },
  espresso: "#2a201a",
  charcoal: "#3a2f26",
  ivory: {
    DEFAULT: "#f8f4eb",
    2: "#efe7d6",
  },
  beige: "#e5d9c0",
  pearl: "#fbf8f1",
  gold: {
    DEFAULT: "#c9a86a",
    2: "#b89758",
    3: "#d9bc85",
  },
  text: {
    2: "#c9c0b0",
    3: "#8a8174",
  },
} as const;

export const effects = {
  line: "rgba(201, 168, 106, 0.18)",
  line2: "rgba(201, 168, 106, 0.3)",
  surface: "rgba(255, 255, 255, 0.04)",
  surface2: "rgba(255, 255, 255, 0.07)",
  glowGold:
    "0 0 0 1px rgba(201, 168, 106, 0.35), 0 0 24px rgba(201, 168, 106, 0.25)",
  glowGoldSoft:
    "0 0 0 1px rgba(201, 168, 106, 0.2), 0 0 14px rgba(201, 168, 106, 0.12)",
} as const;

export const ease = {
  luxe: [0.22, 0.61, 0.36, 1] as const,
  luxeOut: [0.22, 1, 0.36, 1] as const,
  spring: { type: "spring" as const, stiffness: 120, damping: 20 },
};

export const duration = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  reveal: 0.6,
  hero: 0.9,
} as const;

export const spacing = {
  section: {
    mobile: "py-12",
    desktop: "md:py-24",
  },
  gap: {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  },
} as const;

export const typography = {
  display: "font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[1.05] tracking-[-0.02em]",
  h1: "font-serif text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18]",
  h2: "font-serif text-[clamp(1.5rem,4vw,2.25rem)] leading-[1.2]",
  h3: "font-serif text-[1.15rem] leading-[1.3]",
  body: "text-[0.95rem] md:text-base leading-relaxed font-light",
  small: "text-[0.85rem] leading-relaxed",
  micro: "text-[0.72rem] tracking-[0.28em] uppercase font-medium",
} as const;

export const z = {
  base: 0,
  dropdown: 50,
  sticky: 100,
  header: 150,
  modal: 200,
  toast: 250,
  loader: 300,
} as const;
