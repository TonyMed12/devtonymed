import { useReducedMotion } from "../hooks/useReducedMotion";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { motionSystem } from "../data/motion";

// Content stays visible even when animation or IntersectionObserver is unavailable.
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? undefined : { transform: ["translateY(12px)", "translateY(0)"], opacity: [0.75, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay, duration: motionSystem.entrance, ease: motionSystem.ease }}
    >
      {children}
    </motion.div>
  );
}
