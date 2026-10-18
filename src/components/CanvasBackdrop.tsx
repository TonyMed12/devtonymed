import { useEffect, useRef, type RefObject } from "react";
import { frame, cancelFrame } from "motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";

// Original 2D composition: circuit-like blue paths and the rounded TM rhythm.
// The opening runs once (< 5s); pointer response settles, then stops drawing.
export function CanvasBackdrop({
  hostRef,
  running,
}: {
  hostRef: RefObject<HTMLElement | null>;
  running: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const introDone = useRef(false);
  useEffect(() => {
    const canvas = ref.current,
      host = hostRef.current;
    if (!canvas || !host) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let width = 1,
      height = 1,
      dark = false,
      started = 0;
    let x = 0,
      y = 0,
      targetX = 0,
      targetY = 0,
      queued = false;
    const draw = (progress: number) => {
      context.clearRect(0, 0, width, height);
      context.save();
      context.translate(x, y);
      const glow = context.createRadialGradient(
        width * 0.68,
        height * 0.42,
        0,
        width * 0.68,
        height * 0.42,
        width * 0.7,
      );
      glow.addColorStop(
        0,
        dark ? "rgba(37,99,235,.19)" : "rgba(96,165,250,.16)",
      );
      glow.addColorStop(1, "rgba(37,99,235,0)");
      context.fillStyle = glow;
      context.fillRect(-30, -30, width + 60, height + 60);
      context.strokeStyle = dark
        ? "rgba(96,165,250,.25)"
        : "rgba(37,99,235,.18)";
      context.lineWidth = 1;
      const shift = (1 - progress) * 25;
      for (let i = 0; i < 6; i++) {
        const left = width * (0.3 + i * 0.09),
          top = height * (0.24 + (i % 2) * 0.08) + shift;
        context.beginPath();
        context.moveTo(left, height + 10);
        context.lineTo(left, top + 48);
        context.quadraticCurveTo(left, top, left + 48, top);
        context.lineTo(left + width * 0.2, top);
        context.stroke();
        context.beginPath();
        context.arc(left + width * 0.2, top, i % 2 ? 3 : 5, 0, Math.PI * 2);
        context.fillStyle = dark ? "#60a5fa" : "#2563eb";
        context.fill();
      }
      context.restore();
    };
    const tick = ({ timestamp }: { timestamp: number }) => {
      if (!started) started = timestamp;
      const progress = introDone.current
        ? 1
        : Math.min(1, (timestamp - started) / 3600);
      x += (targetX - x) * 0.13;
      y += (targetY - y) * 0.13;
      draw(1 - Math.pow(1 - progress, 3));
      if (
        progress >= 1 &&
        Math.abs(targetX - x) + Math.abs(targetY - y) < 0.05
      ) {
        introDone.current = true;
        queued = false;
        cancelFrame(tick);
      }
    };
    const request = () => {
      if (!queued && running && !reduced) {
        queued = true;
        frame.update(tick, true);
      }
    };
    const resize = () => {
      const box = host.getBoundingClientRect();
      width = Math.max(1, box.width);
      height = Math.max(1, box.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      dark = document.documentElement.dataset.theme === "dark";
      draw(1);
      request();
    };
    const pointer = (event: PointerEvent) => {
      if (!fine || reduced || event.pointerType !== "mouse") return;
      const box = host.getBoundingClientRect();
      targetX = Math.max(
        -10,
        Math.min(10, ((event.clientX - box.left - width / 2) / width) * 20),
      );
      targetY = Math.max(
        -8,
        Math.min(8, ((event.clientY - box.top - height / 2) / height) * 16),
      );
      request();
    };
    const leave = () => {
      targetX = targetY = 0;
      request();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const theme = new MutationObserver(resize);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    host.addEventListener("pointermove", pointer, { passive: true });
    host.addEventListener("pointerleave", leave);
    resize();
    if (reduced) introDone.current = true;
    return () => {
      cancelFrame(tick);
      observer.disconnect();
      theme.disconnect();
      host.removeEventListener("pointermove", pointer);
      host.removeEventListener("pointerleave", leave);
    };
  }, [hostRef, running, reduced, fine]);
  return (
    <canvas
      ref={ref}
      className="canvas-backdrop"
      aria-hidden="true"
      data-running={running && !reduced}
    />
  );
}
