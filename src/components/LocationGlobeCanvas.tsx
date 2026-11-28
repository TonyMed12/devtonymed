// Sextant / Global Locations Pro by Design Foundry, adapted to one city.
// Retains spherical projection, graticule and engraved land; no office directory.
import { useEffect, useRef } from "react";
import { animate } from "motion";
import { professionalLocation as location } from "../data/location";
import {
  engraving,
  onSphere,
  camera,
  look,
  type SpherePoint,
} from "../vendor/SextantGeometry";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { usePageVisible } from "../hooks/usePageVisible";
import { useInView } from "motion/react";

// Places from the author's trajectory: GCI in Tokyo, CUL in Barranquilla, UPV in Valencia.
const destinations = [
  { latitude: 35.6762, longitude: 139.6503 },
  { latitude: 10.9639, longitude: -74.7964 },
  { latitude: 39.4699, longitude: -0.3763 },
];

// Great-circle path between two unit vectors, lifted off the sphere so the arc reads in 3D.
const arcBetween = (from: SpherePoint, to: SpherePoint): SpherePoint[] => {
  const dot = Math.max(-1, Math.min(1, from[0] * to[0] + from[1] * to[1] + from[2] * to[2]));
  const omega = Math.acos(dot);
  const points: SpherePoint[] = [];
  for (let s = 0; s <= 40; s++) {
    const t = s / 40;
    const a = Math.sin((1 - t) * omega) / Math.sin(omega);
    const b = Math.sin(t * omega) / Math.sin(omega);
    const lift = 1 + 0.18 * Math.sin(Math.PI * t);
    points.push([(a * from[0] + b * to[0]) * lift, (a * from[1] + b * to[1]) * lift, (a * from[2] + b * to[2]) * lift]);
  }
  return points;
};

export default function LocationGlobeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 760px)");
  const visible = usePageVisible();
  const inView = useInView(ref, { amount: 0.1 });
  const played = useRef(false);
  useEffect(() => {
    const canvas = ref.current,
      ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const size = mobile ? 210 : 320;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const runs = engraving(mobile ? 4 : 2.5);
    // Interactive globe: drag to turn it, slow spin at rest, dashes flow along the arcs.
    const state = { lng: location.longitude, lat: location.latitude, drag: false, lastX: 0, lastY: 0, time: 0 };
    const paint = (progress: number) => {
      const dark = document.documentElement.dataset.theme === "dark";
      const css = getComputedStyle(document.documentElement);
      const pick = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
      const ink = pick("--globe-ink", dark ? "#60a5fa" : "#1d4ed8");
      const grid = pick("--globe-grid", dark ? "#334766" : "#cbd5e1");
      const k = camera(
        state.lng + (1 - progress) * 14,
        state.lat - (1 - progress) * 5,
      );
      const r = size * 0.43,
        center = size / 2;
      const project = (v: SpherePoint) => {
        const p = look(v, k);
        return { x: center + p[0] * r, y: center - p[1] * r, z: p[2] };
      };
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = pick("--globe-fill", dark ? "#101c31" : "#eff6ff");
      ctx.beginPath();
      ctx.arc(center, center, r, 0, Math.PI * 2);
      ctx.fill();
      const line = (points: SpherePoint[]) => {
        let pen = false;
        for (const v of points) {
          const p = project(v);
          if (p.z > 0.025) {
            if (pen) ctx.lineTo(p.x, p.y);
            else ctx.moveTo(p.x, p.y);
            pen = true;
          } else pen = false;
        }
      };
      ctx.strokeStyle = grid;
      ctx.lineWidth = 0.65;
      ctx.beginPath();
      for (let lng = -180; lng < 180; lng += 30) {
        const points: SpherePoint[] = [];
        for (let lat = -88; lat <= 88; lat += 4)
          points.push(onSphere(lat, lng));
        line(points);
      }
      for (let lat = -60; lat <= 60; lat += 30) {
        const points: SpherePoint[] = [];
        for (let lng = -180; lng <= 180; lng += 4)
          points.push(onSphere(lat, lng));
        line(points);
      }
      ctx.stroke();
      ctx.strokeStyle = ink;
      ctx.lineWidth = mobile ? 0.8 : 0.9;
      ctx.beginPath();
      for (const run of runs) {
        const points: SpherePoint[] = [];
        const steps = Math.max(1, Math.ceil((run.b - run.a) / 3));
        for (let s = 0; s <= steps; s++)
          points.push(onSphere(run.lat, run.a + ((run.b - run.a) * s) / steps));
        line(points);
      }
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(center, center, r, 0, Math.PI * 2);
      ctx.stroke();
      const marker = project(onSphere(location.latitude, location.longitude));
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, 9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = ink;
      ctx.beginPath();
      ctx.arc(marker.x, marker.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      const origin = onSphere(location.latitude, location.longitude);
      ctx.save();
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = -state.time * 0.4;
      ctx.beginPath();
      for (const place of destinations) line(arcBetween(origin, onSphere(place.latitude, place.longitude)));
      ctx.stroke();
      ctx.restore();
      for (const place of destinations) {
        const dot = project(onSphere(place.latitude, place.longitude));
        if (dot.z <= 0.025) continue;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    paint(1);

    // Drag to turn (horizontal) and tilt (vertical); vertical page scroll still works on touch.
    const onDown = (event: PointerEvent) => {
      state.drag = true;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!state.drag) return;
      state.lng -= (event.clientX - state.lastX) * 0.35;
      state.lat = Math.max(-60, Math.min(60, state.lat + (event.clientY - state.lastY) * 0.25));
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      paint(1);
    };
    const onUp = () => {
      state.drag = false;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    // Slow spin and dash flow only while the globe is on screen and motion is allowed.
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      state.time += dt * 60;
      if (!state.drag) state.lng += dt * 3;
      paint(1);
      frame = requestAnimationFrame(tick);
    };
    const canAnimate = typeof window.requestAnimationFrame === "function";
    if (!reduced && visible && inView && canAnimate) frame = requestAnimationFrame(tick);
    const theme = new MutationObserver(() => paint(1));
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const run = !reduced && !played.current && visible && inView;
    if (run) played.current = true;
    const animation = run
      ? animate(0, 1, {
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: paint,
          onComplete: () => {
            played.current = true;
          },
        })
      : null;
    return () => {
      animation?.stop();
      theme.disconnect();
      if (canAnimate) cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, [mobile, reduced, visible, inView]);
  return (
    <canvas
      ref={ref}
      className="location-globe-canvas"
      aria-hidden="true"
      style={{ touchAction: "pan-y", cursor: "grab" }}
      data-latitude={location.latitude}
      data-longitude={location.longitude}
    />
  );
}
