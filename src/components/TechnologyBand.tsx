import { useReducedMotion } from "../hooks/useReducedMotion";
import { useRef, useState } from "react";
import { useInView } from "motion/react";
import type { Language } from "../data/i18n";
import { technologies, type Technology } from "../data/portfolio";
import { usePageVisible } from "../hooks/usePageVisible";
import { TechnologyIcon } from "./Icons";

const ORDER: Technology["category"][] = ["web", "backend", "data", "tools"];
const LABELS: Record<Technology["category"], [string, string]> = {
  web: ["Web", "Web"],
  backend: ["Backend", "Backend"],
  data: ["Datos", "Data"],
  tools: ["Herramientas", "Tools"],
};

// One conveyor per category. Alternate rows run in reverse; a single pause control stops all rows.
export function TechnologyBand({ language }: { language: Language }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.05 });
  const visible = usePageVisible();
  const reduced = useReducedMotion();
  const es = language === "es";
  const paused = Boolean(reduced || stopped || hovered || focused || !inView || !visible);
  const rows = ORDER.map((category) => ({
    category,
    items: technologies.filter((tech) => tech.category === category),
  })).filter((row) => row.items.length > 0);

  return (
    <div
      ref={ref}
      className="technology-band"
      data-static={Boolean(reduced)}
      data-paused={paused}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {!reduced && (
        // WCAG 2.2.2: moving content that runs longer than 5 s needs a visible pause.
        <button
          type="button"
          className="band-pause"
          onClick={() => setStopped(!stopped)}
          aria-label={stopped ? (es ? "Reanudar banda de tecnologías" : "Resume technology band") : (es ? "Pausar banda de tecnologías" : "Pause technology band")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" width="14" height="14">
            {stopped ? <path d="m8 5 11 7-11 7Z" /> : <path d="M6 5h4v14H6zm8 0h4v14h-4z" />}
          </svg>
        </button>
      )}
      {rows.map((row, rowIndex) => (
        <div className="band-row" key={row.category} data-direction={rowIndex % 2 ? "reverse" : "forward"}>
          <p className="band-label">{LABELS[row.category][es ? 0 : 1]}</p>
          <div
            className="band-viewport"
            tabIndex={0}
            aria-label={`${es ? "Banda de" : "Band of"} ${LABELS[row.category][es ? 0 : 1]}`}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setHovered(true);
            }}
            onPointerLeave={() => setHovered(false)}
          >
            <div className="band-track">
              <ul className="technology-sequence" aria-label={es ? "Tecnologías de mi portafolio" : "Technologies in my portfolio"}>
                {row.items.map((tech) => (
                  <li key={tech.id}>
                    <span className="band-item" data-tech={tech.name}>
                      <TechnologyIcon name={tech.name} />
                      <span>{tech.name}</span>
                      <span className="band-item-dot" aria-hidden="true">·</span>
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="technology-sequence band-copy" aria-hidden="true" inert>
                {row.items.map((tech) => (
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
      ))}
    </div>
  );
}
