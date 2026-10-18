// Adapted from Dot Grid Background by Aakash Mangla (Framer Limited license).
// Retains projected tilted orbits. Uses existing Motion scheduler, capped DPR,
// passive host events and bounded activity instead of an always-running RAF.
import { useEffect, useRef, type RefObject } from "react";
import { frame, cancelFrame } from "motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

const smoothstep = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};
export function DotGridBackdrop({
  hostRef,
  running,
  shared = false,
}: {
  hostRef: RefObject<HTMLElement | null>;
  running: boolean;
  shared?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  useEffect(() => {
    const canvas = ref.current,
      host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 1,
      height = 1,
      dark = false,
      spacing = 32;
    let mx = -9999,
      my = -9999,
      lastMove = -9999,
      queued = false;
    let dots: {
      bx: number;
      by: number;
      inclination: number;
      ascension: number;
      phase: number;
      speedMult: number;
    }[] = [];
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const decay =
        !reduced && fine && running
          ? smoothstep(1 - Math.max(0, time - lastMove - 1400) / 650)
          : 0;
      const rgb = dark ? "96,165,250" : "37,99,235";
      for (const d of dots) {
        const distance = Math.hypot(d.bx - mx, d.by - my);
        const inf = smoothstep(1 - distance / 125) * decay;
        let x = d.bx,
          y = d.by,
          scale = 1;
        if (inf > 0) {
          const theta = time * 0.0008 * d.speedMult + d.phase;
          const lx = Math.cos(theta),
            ly = Math.sin(theta) * Math.cos(d.inclination);
          const lz = Math.sin(theta) * Math.sin(d.inclination);
          const orbitR = spacing * 0.38 * inf;
          x +=
            (lx * Math.cos(d.ascension) - ly * Math.sin(d.ascension)) * orbitR;
          y +=
            (lx * Math.sin(d.ascension) + ly * Math.cos(d.ascension)) * orbitR;
          scale = 1 + (0.45 + lz * 0.2) * inf;
        }
        ctx.beginPath();
        ctx.arc(x, y, (fine ? 1.05 : 0.85) * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${(dark ? 0.25 : 0.19) + inf * 0.28})`;
        ctx.fill();
      }
    };
    const tick = ({ timestamp }: { timestamp: number }) => {
      draw(timestamp);
      if (timestamp - lastMove >= 2050) {
        queued = false;
        cancelFrame(tick);
      }
    };
    const request = () => {
      if (!queued && running && !reduced && fine && !document.hidden) {
        queued = true;
        frame.update(tick, true);
      }
    };
    const resize = () => {
      const box = host.getBoundingClientRect();
      width = Math.max(1, shared ? window.innerWidth : box.width);
      height = Math.max(1, shared ? window.innerHeight : box.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dark = document.documentElement.dataset.theme === "dark";
      spacing = width < 760 ? 44 : 32;
      dots = [];
      for (let y = 16; y < height; y += spacing)
        for (let x = 16; x < width; x += spacing) {
          const seed = x * 0.17 + y * 0.31;
          dots.push({
            bx: x,
            by: y,
            inclination: seed % Math.PI,
            ascension: (seed * 1.7) % (Math.PI * 2),
            phase: seed,
            speedMult: 0.7 + (Math.sin(seed) + 1) * 0.3,
          });
        }
      draw(performance.now());
    };
    const move = (event: PointerEvent) => {
      if (!fine || reduced || !running || event.pointerType !== "mouse") return;
      const box = host.getBoundingClientRect();
      mx = event.clientX - (shared ? 0 : box.left);
      my = event.clientY - (shared ? 0 : box.top);
      lastMove = performance.now();
      request();
    };
    const leave = () => {
      lastMove = performance.now() - 1400;
      request();
    };
    const hide = () => {
      if (document.hidden) {
        cancelFrame(tick);
        queued = false;
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    window.addEventListener("resize", resize);
    const theme = new MutationObserver(resize);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", hide);
    resize();
    return () => {
      cancelFrame(tick);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      theme.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", hide);
    };
  }, [hostRef, running, reduced, fine, shared]);
  return (
    <canvas
      ref={ref}
      className="dot-grid-backdrop"
      aria-hidden="true"
      data-running={running && !reduced}
      data-shared={shared}
    />
  );
}
