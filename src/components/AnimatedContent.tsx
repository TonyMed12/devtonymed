import { createElement, useEffect, useRef, type ReactNode } from "react";
import { animate, inView } from "motion";
import { motionSystem } from "../data/motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useEntranceReady } from "../hooks/useEntranceReady";

// Motion adaptation of React Bits Animated Content's vertical, once-on-scroll
// behavior: https://reactbits.dev/animations/animated-content.
// The DOM is visible by default. Only an intersecting group receives keyframes.
export function AnimatedContent({ children, className = "", delay = 0, distance = 36,
  stagger = 0, as = "div", ...attributes }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  stagger?: number;
  as?: "div" | "header" | "p" | "h2" | "h3" | "h4" | "article";
  id?: string;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const ready = useEntranceReady();
  const seen = useRef(false);
  useEffect(() => {
    const host = ref.current;
    if (!host || !ready || reduced || seen.current || !("IntersectionObserver" in window)) return;
    const targets = stagger ? Array.from(host.children).filter((el): el is HTMLElement => el instanceof HTMLElement) : [host];
    const controls: ReturnType<typeof animate>[] = [];
    let timer: number | undefined;
    const settle = () => {
      controls.forEach(control => control.stop());
      targets.forEach(el => { el.style.removeProperty("opacity"); el.style.removeProperty("transform"); });
      window.clearTimeout(timer);
    };
    const stop = inView(host, () => {
      if (seen.current) return;
      seen.current = true;
      try {
        targets.forEach((el, index) => {
          const control = animate(el, { opacity: [0.2, 1], transform: [`translateY(${distance}px)`, "translateY(0px)"] }, {
            duration: 0.75, ease: motionSystem.ease, delay: Math.min(delay + index * stagger, 0.24),
          });
          controls.push(control);
        });
        timer = window.setTimeout(settle, 950);
      } catch { settle(); }
    }, { amount: 0.08 });
    const focus = () => { seen.current = true; settle(); };
    host.addEventListener("focusin", focus);
    return () => { stop(); settle(); host.removeEventListener("focusin", focus); };
  }, [ready, reduced, delay, distance, stagger]);
  return createElement(as, { ...attributes, ref, className, "data-animated-content": "" }, children);
}
