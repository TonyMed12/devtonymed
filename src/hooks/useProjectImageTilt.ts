import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useMediaQuery } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

// Tilted Card's pointer normalization, restricted to the actual project image.
export function useProjectImageTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const rx = useSpring(x, { stiffness: 180, damping: 26 });
  const ry = useSpring(y, { stiffness: 180, damping: 26 });
  const transform = useTransform([rx, ry], ([a, b]) => `perspective(1000px) rotateX(${a}deg) rotateY(${b}deg)`);
  useEffect(() => {
    const element = ref.current;
    const reset = () => { x.set(0); y.set(0); };
    if (!element || !enabled || !fine || reduced) {
      reset(); rx.jump(0); ry.jump(0);
      return;
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      x.set(Math.max(-3.5, Math.min(3.5, -(event.clientY - rect.top - rect.height / 2) / (rect.height / 2) * 3.5)));
      y.set(Math.max(-3.5, Math.min(3.5, (event.clientX - rect.left - rect.width / 2) / (rect.width / 2) * 3.5)));
    };
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      reset(); rx.jump(0); ry.jump(0);
    };
  }, [enabled, fine, reduced, x, y, rx, ry]);
  return { ref, transform };
}
