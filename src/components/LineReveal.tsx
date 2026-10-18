import { motion } from "motion/react";
import { motionSystem } from "../data/motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** One clipped span per editorial line; the heading supplies its accessible name. */
export function LineReveal({ lines, ready }: { lines: string[]; ready: boolean }) {
  const reduced = useReducedMotion();
  return lines.map((line, index) => (
    <span className="line-reveal" key={line} aria-hidden="true">
      <motion.span
        initial={false}
        animate={ready || reduced
          ? { transform: "none", opacity: 1 }
          : { transform: "translateY(35%)", opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.55, delay: ready && !reduced ? 0.06 + index * 0.075 : 0, ease: motionSystem.ease }}
      >{line}{index < lines.length - 1 ? " " : ""}</motion.span>
    </span>
  ));
}
