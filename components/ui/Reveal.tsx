"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, drawLine, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Split text into words wrapped for mask-reveal animation. */
function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={cn("inline-flex flex-wrap gap-x-[0.25em]", className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.75, ease: [0.22, 0.61, 0.36, 1] },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Scroll-triggered fade-up reveal. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Parent that staggers its RevealItem children. */
export function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/** Gold divider line that draws in on scroll. */
export function GoldDivider({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={cn("gold-divider", className)}
      initial={reduce ? undefined : "hidden"}
      whileInView="visible"
      viewport={viewport}
      variants={drawLine}
    />
  );
}

/** Standard editorial section heading with split-text word reveal. */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "max-w-2xl mb-4 md:mb-6",
        align === "center" ? "mx-auto text-center" : ""
      )}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
    >
      {eyebrow && (
        <motion.span
          className="eyebrow block mb-3"
          variants={fadeUp}
        >
          {eyebrow}
        </motion.span>
      )}
      <h2
        className={cn(
          "text-balance text-[clamp(1.75rem,5.5vw,2.75rem)] leading-[1.18]",
          light ? "text-espresso" : "text-ivory"
        )}
      >
        <SplitWords text={title} />
      </h2>
      {sub && (
        <motion.p
          className={cn(
            "mt-4 text-[0.95rem] md:text-base leading-relaxed",
            light ? "text-espresso/70" : "text-text-2"
          )}
          variants={fadeUp}
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}
