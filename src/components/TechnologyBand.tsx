import { useReducedMotion } from "../hooks/useReducedMotion";
import { useRef, useState } from "react";
import { useInView } from "motion/react";
import type { Language } from "../data/i18n";
import { technologies } from "../data/portfolio";
import { usePageVisible } from "../hooks/usePageVisible";
import { TechnologyIcon } from "./Icons";

export function TechnologyBand({ language }: { language: Language }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const visible = usePageVisible();
  const reduced = useReducedMotion();
  const es = language === "es";
  const paused = Boolean(reduced || hovered || focused || !inView || !visible);
  return (
    <div
      ref={ref}
      className="technology-band"
      data-static={Boolean(reduced)}
      data-paused={paused}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div
        className="band-viewport"
        tabIndex={0}
        aria-label={es ? "Banda de tecnologías" : "Technology band"}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <div className="band-track">
          <ul
            className="technology-sequence"
            aria-label={
              es
                ? "Tecnologías de mi portafolio"
                : "Technologies in my portfolio"
            }
          >
            {technologies.map((tech) => (
              <li key={tech.id}>
                <span className="band-item">
                  <TechnologyIcon name={tech.name} />
                  <span>{tech.name}</span>
                  <span className="band-item-dot" aria-hidden="true">
                    ·
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <ul
            className="technology-sequence band-copy"
            aria-hidden="true"
            inert
          >
            {technologies.map((tech) => (
              <li key={tech.id}>
                <span className="band-item">
                  <TechnologyIcon name={tech.name} />
                  <span>{tech.name}</span>
                  <span className="band-item-dot">·</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
