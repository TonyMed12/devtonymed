import { AnimatePresence, motion } from "motion/react";
import { motionSystem } from "../data/motion";

// Rotating Text's slide/exit pattern follows the selected project, not a second
// timer. Keep the name's line box fixed so the toolbar never jumps.
export function ProjectPresentationName({ title, id, instant }: { title: string; id: string; instant: boolean }) {
  return <span className="carousel-current-name">
    {instant ? <span>{title}</span> : <AnimatePresence initial={false} mode="wait">
      <motion.span key={id} initial={{ opacity: 0, transform: "translateY(85%) rotateX(-12deg)" }}
        animate={{ opacity: 1, transform: "translateY(0%) rotateX(0deg)" }} exit={{ opacity: 0, transform: "translateY(-85%) rotateX(12deg)" }}
        transition={{ duration: 0.24, ease: motionSystem.ease }}>{title}</motion.span>
    </AnimatePresence>}
  </span>;
}
