import { useEffect, useRef } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function CursorTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  useEffect(() => {
    const trail = ref.current;
    if (!trail || !fine || reduced) return;
    const marks = Array.from(trail.children) as HTMLElement[];
    let frame = 0,
      lastTime = 0;
    let targetX = 0,
      targetY = 0;
    let lastMove = 0;
    const positions = marks.map(() => ({ x: 0, y: 0 }));
    let seeded = false;
    function hide() {
      cancelAnimationFrame(frame);
      frame = 0;
      seeded = false;
      trail!.dataset.visible = "false";
    }
    function tick(time: number) {
      frame = 0;
      const elapsed = Math.min(time - lastTime, 40);
      lastTime = time;
      const age = time - lastMove;
      marks.forEach((mark, index) => {
        const alpha = 1 - Math.exp(-elapsed / (22 + index * 15));
        positions[index].x += (targetX - positions[index].x) * alpha;
        positions[index].y += (targetY - positions[index].y) * alpha;
        // A short tail, never an accumulating particle chain. Keep its extent bounded.
        const dx = positions[index].x - targetX,
          dy = positions[index].y - targetY;
        const distance = Math.hypot(dx, dy);
        if (distance > 30) {
          positions[index].x = targetX + (dx / distance) * 30;
          positions[index].y = targetY + (dy / distance) * 30;
        }
        mark.style.transform = `translate3d(${positions[index].x}px,${positions[index].y}px,0) translate(-50%,-50%) rotate(-18deg)`;
        mark.style.opacity = String(
          Math.max(0, 1 - age / 180) * (0.42 - index * 0.1),
        );
      });
      if (age < 180) frame = requestAnimationFrame(tick);
      else hide();
    }
    function move(event: PointerEvent) {
      if (event.target instanceof Element && event.target.closest("[data-eye-follow]")) {
        hide();
        return;
      }
      if (event.pointerType !== "mouse") {
        hide();
        return;
      }
      if (document.hidden) return;
      targetX = event.clientX + 9;
      targetY = event.clientY + 11;
      lastMove = performance.now();
      if (!seeded) {
        positions.forEach((position) => {
          position.x = targetX;
          position.y = targetY;
        });
        seeded = true;
      }
      trail!.dataset.visible = "true";
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }
    function visibility() {
      if (document.hidden) hide();
    }
    function leave(event: PointerEvent) {
      if (!event.relatedTarget) hide();
    }
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerout", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [fine, reduced]);
  if (!fine || reduced) return null;
  return (
    <div
      ref={ref}
      className="cursor-trail"
      data-visible="false"
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </div>
  );
}
