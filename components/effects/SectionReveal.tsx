"use client";

/**
 * SectionReveal — the canonical motion-grammar reveal primitive.
 *
 * Wrap a section's direct children. When the section enters the
 * viewport, the children stagger in with three coordinated motions:
 *   • `title`     — slides up 16px + fades  (0.6s, luxeEase)
 *   • `body`      — clip-reveals (mask + y) one by one (0.05s stagger)
 *   • `support`   — scales 0.96 → 1  (0.5s)
 *
 * Behind a `useReducedMotion` guard: when the user prefers reduced
 * motion, all children render immediately with no animation.
 *
 * Consumers use the convenience components: `<SectionReveal.Title>`,
 * `<SectionReveal.Body>`, `<SectionReveal.Support>`.
 */
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type ReactNode } from "react";
import { sectionReveal, titleReveal, lineReveal, supportReveal } from "@/lib/motion";

export type SectionRole = "title" | "body" | "support";

export interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  margin?: string;
  repeat?: boolean;
  className?: string;
  as?: "div" | "section" | "ul" | "ol";
}

const roleToVariant: Record<SectionRole, Variants> = {
  title: titleReveal,
  body: lineReveal,
  support: supportReveal,
};

function SectionRevealRoot({
  children,
  delay = 0,
  stagger = 0.05,
  margin = "-80px",
  repeat = false,
  className,
  as = "div",
}: SectionRevealProps) {
  const reduce = useReducedMotion();
  const parentVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.05 + delay,
      },
    },
  };
  const Wrapper = motion[as] as typeof motion.div;
  return (
    <Wrapper
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "visible"}
      viewport={{ once: !repeat, margin }}
      variants={parentVariants}
    >
      {children}
    </Wrapper>
  );
}

function SectionRevealChild({
  role,
  children,
  className,
  as = "div",
}: {
  role: SectionRole;
  children: ReactNode;
  className?: string;
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
}) {
  // Children DO NOT carry their own `whileInView` / `initial`. They
  // participate in the parent stagger via the `variants` prop only —
  // the parent's `whileInView="visible"` propagates `animate="visible"`
  // down, and each child's role variant defines its own hidden/visible
  // shape. This avoids the double-observer race that strands children
  // at `opacity: 0` if their own observer never fires (which was
  // breaking the e2e "scroll-reveal elements animate in" test).
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      data-section-role={role}
      className={className}
      variants={roleToVariant[role]}
    >
      {children}
    </Comp>
  );
}

export const SectionReveal = Object.assign(SectionRevealRoot, {
  Title: function SectionRevealTitle({
    children,
    className,
    as = "h2",
  }: {
    children: ReactNode;
    className?: string;
    as?: "div" | "span" | "p" | "h1" | "h2" | "h3";
  }) {
    return (
      <SectionRevealChild role="title" className={className} as={as as "div"}>
        {children}
      </SectionRevealChild>
    );
  },
  Body: function SectionRevealBody({
    children,
    className,
    as = "p",
  }: {
    children: ReactNode;
    className?: string;
    as?: "div" | "span" | "p" | "h2" | "h3";
  }) {
    return (
      <SectionRevealChild role="body" className={className} as={as as "div"}>
        {children}
      </SectionRevealChild>
    );
  },
  Support: function SectionRevealSupport({
    children,
    className,
    as = "div",
  }: {
    children: ReactNode;
    className?: string;
    as?: "div" | "span" | "li";
  }) {
    return (
      <SectionRevealChild role="support" className={className} as={as as "div"}>
        {children}
      </SectionRevealChild>
    );
  },
});

export const sectionRevealVariants = {
  sectionReveal,
  titleReveal,
  lineReveal,
  supportReveal,
} as const;
