import { useEffect, useRef } from "react";
import { useMediaQuery } from "./useMediaQuery";
import { useReducedMotion } from "./useReducedMotion";

// Spotlight Card's local pointer coordinates, with a fixed gradient moved on its
// own layer. No React commits per move and no animation loop while idle.
export function useCardSpotlight<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  useEffect(() => {
    const card = ref.current;
    const light = card?.querySelector<HTMLElement>(".card-spotlight");
    if (!card || !light || !enabled || !fine || reduced) return;
    let frame = 0, clientX = 0, clientY = 0, inside = false;
    const paint = () => {
      frame = 0;
      const rect = card.getBoundingClientRect();
      light.style.transform = `translate3d(${clientX - rect.left - 180}px, ${clientY - rect.top - 180}px, 0)`;
      card.dataset.spotlight = "true";
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      inside = true;
      clientX = event.clientX; clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const clear = () => {
      cancelAnimationFrame(frame); frame = 0;
      inside = false;
      delete card.dataset.spotlight;
    };
    const scroll = () => {
      if (!inside) return;
      const rect = card.getBoundingClientRect();
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) clear();
      else if (!frame) frame = requestAnimationFrame(paint);
    };
    card.addEventListener("pointermove", move, { passive: true });
    card.addEventListener("pointerleave", clear);
    card.addEventListener("pointercancel", clear);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("visibilitychange", clear);
    return () => {
      clear();
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerleave", clear);
      card.removeEventListener("pointercancel", clear);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", clear);
    };
  }, [enabled, fine, reduced]);
  return ref;
}
