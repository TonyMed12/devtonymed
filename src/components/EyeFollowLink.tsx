// Portfolio adaptation of Eye Follow Button / FollowEyes by Aathif Thajudeen.
// Framer Limited license; source versions and changes: docs/ITERATION-07.md.
import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import type { Language } from "../data/i18n";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";

function Eye({
  x,
  y,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
}) {
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });
  return (
    <span className="follow-eye">
      <motion.i style={{ x: sx, y: sy }} />
    </span>
  );
}
export function EyeFollowLink({ language }: { language: Language }) {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const lx = useMotionValue(0),
    ly = useMotionValue(0),
    rx = useMotionValue(0),
    ry = useMotionValue(0);
  function reset() {
    lx.set(0);
    ly.set(0);
    rx.set(0);
    ry.set(0);
  }
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (!fine || reduced || event.pointerType !== "mouse") return;
    const eyes = event.currentTarget
      .querySelector(".follow-eyes")!
      .getBoundingClientRect();
    const dx = event.clientX - eyes.left - eyes.width / 2;
    const dy = event.clientY - eyes.top - eyes.height / 2;
    // Original bounded polar pupil tracking. Only the pupils move, never the link.
    for (const [offset, x, y] of [
      [-11, lx, ly],
      [11, rx, ry],
    ] as const) {
      const angle = Math.atan2(dy, dx - offset);
      const distance = Math.min(Math.hypot(dx - offset, dy), 4.7);
      x.set(Math.cos(angle) * distance);
      y.set(Math.sin(angle) * distance);
    }
  }
  return (
    <a
      className="button button-secondary eye-follow-link"
      href="#contacto"
      data-eye-follow
      data-tracking={fine && !reduced}
      onPointerMove={move}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {language === "es" ? "Hablemos" : "Let’s talk"}
      <span className="follow-eyes" aria-hidden="true">
        {fine && !reduced ? (
          <>
            <Eye x={lx} y={ly} />
            <Eye x={rx} y={ry} />
          </>
        ) : (
          <>
            <span className="follow-eye">
              <i />
            </span>
            <span className="follow-eye">
              <i />
            </span>
          </>
        )}
      </span>
    </a>
  );
}
