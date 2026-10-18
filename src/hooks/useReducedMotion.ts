import { useMediaQuery } from "./useMediaQuery";

// React to OS preference changes during a visit, including already-open panels.
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
