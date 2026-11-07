import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Counts from 0 to `to` once, when it first scrolls into view. The text is written directly
// so the animation causes no React renders. Reduced motion keeps the final value.
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || !("IntersectionObserver" in window)) return;
    const text = element.firstChild;
    let control: { stop: () => void } | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || !text) return;
        observer.disconnect();
        text.nodeValue = "0";
        control = animate(0, to, {
          duration: 1.2,
          ease: "easeOut",
          onUpdate: (current) => { text.nodeValue = String(Math.round(current)); },
        });
      },
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      control?.stop();
    };
  }, [reduced, to]);
  return <span ref={ref}>{to}</span>;
}
