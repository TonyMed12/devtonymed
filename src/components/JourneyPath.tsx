// Adapted from Animated Path by Maryam Zumi, Framer Limited license.
// Replaces its four-step loop with three real stages and selection-linked drawing.
import { motion } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function JourneyPath({ selected }: { selected: number }) {
  const reduced = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 760px)");
  const y = mobile ? 12 : 9;
  const path = mobile
    ? "M 50 12 H 250"
    : "M 50 9 C 75 28 125 28 150 9 C 175 28 225 28 250 9";
  const x = 50 + selected * 100;
  return (
    <svg
      className="journey-path"
      viewBox="0 0 300 36"
      preserveAspectRatio="none"
      aria-hidden="true"
      data-stage={selected}
    >
      <path d={path} className="journey-path-base" />
      <motion.path
        d={path}
        className="journey-path-progress"
        initial={false}
        animate={{ pathLength: (selected + 0.12) / 2.12 }}
        transition={{ duration: reduced ? 0 : 0.32 }}
      />
      {[50, 150, 250].map((cx, index) => (
        <circle
          key={cx}
          cx={cx}
          cy={y}
          r="3"
          className={index === selected ? "path-node active" : "path-node"}
        />
      ))}
      <motion.path
        key={selected}
        d={`M ${x} ${y + 4} V 35`}
        className="journey-path-progress"
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.24 }}
      />
    </svg>
  );
}
