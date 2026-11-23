import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Language } from "../data/i18n";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Ciclo de mejora continua (Planear, Hacer, Verificar, Ajustar): cómo trabajo, en cuatro pasos.
const STEPS: { step: [string, string]; text: [string, string] }[] = [
  { step: ["Planear", "Plan"], text: ["Entender el problema y definir requisitos", "Understand the problem and define requirements"] },
  { step: ["Hacer", "Do"], text: ["Construir en pasos pequeños", "Build in small steps"] },
  { step: ["Verificar", "Check"], text: ["Probar y revisar con el equipo", "Test and review with the team"] },
  { step: ["Ajustar", "Adjust"], text: ["Aprender de lo ocurrido y mejorar la siguiente vuelta", "Learn from what happened and improve the next round"] },
];

// idle: todo visible (sin JS, sin IntersectionObserver o con movimiento reducido). armed: oculto hasta entrar en pantalla. live: animado.
export function KaizenCycle({ language }: { language: Language }) {
  const es = language === "es";
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "armed" | "live">("idle");
  useEffect(() => {
    const host = ref.current;
    if (!host || reduced || !("IntersectionObserver" in window)) return undefined;
    setPhase("armed");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPhase("live");
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(host);
    return () => {
      observer.disconnect();
      setPhase("idle");
    };
  }, [reduced]);
  return (
    <div ref={ref} className="about-kaizen" data-phase={phase}>
      <div className="about-kaizen-head">
        <span className="about-kaizen-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <g>
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </g>
            <path d="M8 15.5h2.5V13H13v-2.5h2.5V8" />
          </svg>
        </span>
        <p className="about-kaizen-label">
          <span className="about-kaizen-title">{es ? "Kaizen personal" : "Personal kaizen"}</span>
          <span className="about-kaizen-sub"><span lang="ja">改善</span> · {es ? "mejora continua" : "continuous improvement"}</span>
        </p>
      </div>
      <ol className="about-kaizen-steps">
        {STEPS.map((item, index) => (
          <li key={item.step[0]} style={{ "--i": index } as CSSProperties}>
            <span className="about-kaizen-n" aria-hidden="true">{index + 1}</span>
            <strong>{item.step[es ? 0 : 1]}</strong>
            <span>{item.text[es ? 0 : 1]}</span>
          </li>
        ))}
      </ol>
      <p className="about-kaizen-loop" aria-hidden="true">
        <span className="about-kaizen-spin">↻</span> {es ? "y vuelta a empezar, un poco mejor" : "and around again, a little better"}
      </p>
    </div>
  );
}
