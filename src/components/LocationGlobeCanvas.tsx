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
    const paint = (progress: number) => {
      const dark = document.documentElement.dataset.theme === "dark";
      const ink = dark ? "#60a5fa" : "#1d4ed8";
      const grid = dark ? "#334766" : "#cbd5e1";
      const k = camera(
        location.longitude + (1 - progress) * 14,
        location.latitude - (1 - progress) * 5,
      );
      const r = size * 0.43,
        center = size / 2;
      const project = (v: SpherePoint) => {
        const p = look(v, k);
        return { x: center + p[0] * r, y: center - p[1] * r, z: p[2] };
      };
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = dark ? "#101c31" : "#eff6ff";
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
    };
    paint(1);
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
    };
  }, [mobile, reduced, visible, inView]);
  return (
    <canvas
      ref={ref}
      className="location-globe-canvas"
      aria-hidden="true"
      data-latitude={location.latitude}
      data-longitude={location.longitude}
    />
  );
}
