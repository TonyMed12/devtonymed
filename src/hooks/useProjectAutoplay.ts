import { useEffect, useRef } from "react";
import { animate, useMotionValue } from "motion/react";

const interval = 6000;
// Projects owns its clock. The timeout and indicator share the same remaining
// time; a pause preserves it, while any navigation starts a fresh five seconds.
export function useProjectAutoplay(advance: () => void, paused: boolean, resetKey: string) {
  const progress = useMotionValue(0);
  const callback = useRef(advance);
  const clock = useRef({ key: resetKey, remaining: interval });
  useEffect(() => { callback.current = advance; }, [advance]);
  useEffect(() => {
    if (clock.current.key !== resetKey) {
      clock.current = { key: resetKey, remaining: interval };
      progress.set(0);
    }
    if (paused) return;
    const remaining = clock.current.remaining;
    const started = performance.now();
    let completed = false;
    const indicator = animate(progress, 1, { duration: remaining / 1000, ease: "linear" });
    const timer = window.setTimeout(() => {
      completed = true;
      clock.current.remaining = interval;
      progress.set(0);
      callback.current();
    }, remaining);
    return () => {
      clearTimeout(timer);
      indicator.stop();
      if (!completed) {
        clock.current.remaining = Math.max(0, remaining - (performance.now() - started));
        progress.set(1 - clock.current.remaining / interval);
      }
    };
  }, [paused, resetKey, progress]);
  return progress;
}
