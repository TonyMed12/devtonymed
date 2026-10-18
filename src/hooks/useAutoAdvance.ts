import { useEffect, useRef } from "react";

// Every resume or manual choice gets a full reading interval, never a backlog.
export function useAutoAdvance(
  advance: () => void,
  paused: boolean,
  resetKey: string | number,
  delay = 6000,
) {
  const callback = useRef(advance);
  useEffect(() => {
    callback.current = advance;
  }, [advance]);
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => callback.current(), delay);
    return () => window.clearTimeout(timer);
  }, [paused, resetKey, delay]);
}
