import { motion, useScroll } from "motion/react";

// Native scroll position, also used by Lenis. No additional RAF or scroller.
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
