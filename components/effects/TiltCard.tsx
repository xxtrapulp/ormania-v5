"use client";

/**
 * TiltCard — the canonical hover-choreography card wrapper.
 *
 * On hover, four things fire simultaneously (desktop only):
 *   1. 1° tilt toward the cursor (rotateX/Y from cursor position).
 *   2. Gold border brightens (border-gold/30 → border-gold/60).
 *   3. Image scales 1.04 (via <TiltCard.Image>).
 *   4. Info row slides up 6px (via <TiltCard.Info>).
 *
 * Touch devices and `prefers-reduced-motion` skip the motion but
 * keep the static border-brighten visual cue.
 */
import {
  useRef,
  useCallback,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cardHover, cardImageHover, cardInfoHover } from "@/lib/motion";

const wrapperVariants: Variants = { rest: {}, hover: {} };

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  maxRotate?: number;
  maxTranslate?: number;
  as?: "div" | "article" | "li" | "a";
}

export function TiltCard({
  children,
  className,
  innerClassName,
  maxRotate = 1,
  maxTranslate = 8,
  as = "div",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const reduce = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -maxRotate;
      const rotateY = (x - 0.5) * maxRotate;
      const translateX = (x - 0.5) * maxTranslate;
      const translateY = (y - 0.5) * maxTranslate;
      el.style.setProperty("--rotateX", `${rotateX}deg`);
      el.style.setProperty("--rotateY", `${rotateY}deg`);
      el.style.setProperty("--tiltTX", `${translateX}px`);
      el.style.setProperty("--tiltTY", `${translateY}px`);
    },
    [maxRotate, maxTranslate],
  );

  const handleMouseEnter = useCallback(() => setIsHover(true), []);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rotateX", "0deg");
    el.style.setProperty("--rotateY", "0deg");
    el.style.setProperty("--tiltTX", "0px");
    el.style.setProperty("--tiltTY", "0px");
    setIsHover(false);
  }, []);

  const Wrapper = motion[as] as typeof motion.div;
  return (
    <Wrapper
      ref={ref as React.Ref<HTMLDivElement>}
      className={`card-tilt group ${className || ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={reduce ? false : "rest"}
      animate={isHover && !reduce ? "hover" : "rest"}
      variants={wrapperVariants}
    >
      <div
        className={`card-tilt-inner h-full w-full border border-gold/30 ${innerClassName || ""}`}
        style={{ transition: "border-color 0.45s var(--ease-luxe)" }}
        data-tilt-inner
      >
        {children}
      </div>
    </Wrapper>
  );
}

interface TiltPartProps {
  children: ReactNode;
  className?: string;
}

function TiltCardImage({ children, className }: TiltPartProps) {
  return (
    <motion.div data-tilt-image className={className} variants={cardImageHover}>
      {children}
    </motion.div>
  );
}

function TiltCardInfo({ children, className }: TiltPartProps) {
  return (
    <motion.div data-tilt-info className={className} variants={cardInfoHover}>
      {children}
    </motion.div>
  );
}

TiltCard.Image = TiltCardImage;
TiltCard.Info = TiltCardInfo;

export {
  cardHover as tiltCardHover,
  cardImageHover as tiltCardImageHover,
  cardInfoHover as tiltCardInfoHover,
};
