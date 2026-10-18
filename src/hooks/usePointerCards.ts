import { useEffect, type RefObject } from "react";
import { frame, cancelFrame } from "motion";
import { useMediaQuery } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

export function usePointerCards(ref: RefObject<HTMLElement | null>) {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = ref.current;
    if (!root || !fine || reduced) return;
    let card: HTMLElement | null = null,
      queued = false;
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0;
    const tick = () => {
      if (!card) return;
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      card.style.setProperty("--card-x", `${x}px`);
      card.style.setProperty("--card-y", `${y}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) < 0.1) {
        queued = false;
        cancelFrame(tick);
      }
    };
    function leave() {
      cancelFrame(tick);
      queued = false;
      card?.removeAttribute("data-pointer");
      card = null;
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        leave();
        return;
      }
      const next = (event.target as Element).closest<HTMLElement>(
        ".pointer-card,.compact-project,.credential-card",
      );
      if (!next) {
        leave();
        return;
      }
      const box = next.getBoundingClientRect();
      targetX = event.clientX - box.left;
      targetY = event.clientY - box.top;
      if (next !== card) {
        leave();
        card = next;
        x = targetX;
        y = targetY;
      }
      card.dataset.pointer = "true";
      if (!queued) {
        queued = true;
        frame.update(tick, true);
      }
    }
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", leave);
    return () => {
      leave();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", leave);
    };
  }, [ref, fine, reduced]);
}
