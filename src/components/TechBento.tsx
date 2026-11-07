import { useEffect, useState, type PointerEvent } from "react";
import { motion } from "motion/react";
import type { Language } from "../data/i18n";
import { technologies } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";
import SpotlightCard from "../vendor/react-bits/SpotlightCard.jsx";
import { TechnologyIcon } from "./Icons";

// Generic snippets: illustrative code, not attributed to any project.
const SNIPPETS = {
  TypeScript: "const sum = (a: number, b: number): number => a + b;",
  Python: "def total(values: list[int]) -> int:\n    return sum(values)",
  SQL: "SELECT id, name\nFROM users\nWHERE active = true;",
  Java: "int sum(int a, int b) {\n    return a + b;\n}",
} as const;
type Lang = keyof typeof SNIPPETS;
const LANGS = Object.keys(SNIPPETS) as Lang[];

function useTyped(text: string, enabled: boolean) {
  const [shown, setShown] = useState(enabled ? "" : text);
  useEffect(() => {
    if (!enabled) {
      setShown(text);
      return undefined;
    }
    setShown("");
    let count = 0;
    const id = window.setInterval(() => {
      count += 1;
      setShown(text.slice(0, count));
      if (count >= text.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [text, enabled]);
  return shown;
}

function LanguagesCard({ reduced }: { reduced: boolean }) {
  const [lang, setLang] = useState<Lang>("TypeScript");
  const code = useTyped(SNIPPETS[lang], !reduced);
  return (
    <div className="bento-body">
      <div className="bento-tabs" role="group" aria-label="Lenguajes">
        {LANGS.map((name) => (
          <button key={name} type="button" aria-pressed={lang === name} onClick={() => setLang(name)}>
            {lang === name && <motion.span layoutId="bento-lang-marker" className="bento-tab-marker" />}
            <span>{name}</span>
          </button>
        ))}
      </div>
      <pre className="bento-code"><code>{code}</code></pre>
    </div>
  );
}

function BackendCard() {
  return (
    <div className="bento-body">
      <svg className="bento-flow" viewBox="0 0 300 70" role="img" aria-label="Cliente, API y PostgreSQL">
        <line x1="50" y1="35" x2="130" y2="35" className="bento-link" />
        <line x1="170" y1="35" x2="250" y2="35" className="bento-link" />
        <g className="bento-node"><rect x="8" y="20" width="84" height="30" rx="8" /><text x="50" y="40">Cliente</text></g>
        <g className="bento-node"><rect x="108" y="20" width="84" height="30" rx="8" /><text x="150" y="40">API</text></g>
        <g className="bento-node"><rect x="208" y="20" width="84" height="30" rx="8" /><text x="250" y="40">PostgreSQL</text></g>
      </svg>
      <ul className="bento-chips">
        {["APIs REST", "PostgreSQL", "JWT y RBAC", "Modelado SQL", "Webhooks", "Jobs y colas", "Validación"].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function QualityCard() {
  const items = ["Git", "Vitest", "Pytest", "Zod", "ESLint", "PWA"];
  return (
    <ul className="bento-checks">
      {items.map((item, index) => (
        <li key={item} style={{ animationDelay: `${index * 0.08}s` }}>
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" /></svg>
          {item}
        </li>
      ))}
    </ul>
  );
}

function InfraCard({ reduced }: { reduced: boolean }) {
  const lines = ["docker compose up -d", "✔ contenedores en ejecución"];
  const first = useTyped(lines[0], !reduced);
  return (
    <div className="bento-body">
      <div className="bento-terminal">
        <p><span className="bento-prompt">$</span> {first}{first.length < lines[0].length && <span className="bento-caret" />}</p>
        {first.length >= lines[0].length && <p className="bento-ok">{lines[1]}</p>}
      </div>
      <p className="bento-service"><span className="bento-up" aria-hidden="true" /><span>Docker up</span></p>
    </div>
  );
}

// Marquee per subgroup; hover pauses it. Chips pull slightly toward the cursor.
function Chip({ name, learning, label }: { name: string; learning: boolean; label: string }) {
  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.translate = `${((event.clientX - rect.left - rect.width / 2) * 0.12).toFixed(1)}px ${((event.clientY - rect.top - rect.height / 2) * 0.12).toFixed(1)}px`;
  };
  return (
    <span className="tech-chip" tabIndex={0} onPointerMove={onMove} onPointerLeave={(e) => { e.currentTarget.style.translate = ""; }}>
      <TechnologyIcon name={name} />
      {name}
      {learning && <em>{label}</em>}
    </span>
  );
}

const GROUPS: { title: [string, string]; names: string[] }[] = [
  { title: ["ML y evaluación", "ML and evaluation"], names: ["scikit-learn", "XGBoost", "Random Forest", "Isolation Forest", "Pandas", "NumPy", "imbalanced-learn"] },
  { title: ["Full stack e integración", "Full stack and integration"], names: ["Next.js", "React", "Tailwind CSS", "Spring Boot", "Supabase", "Twilio", "React Query"] },
  { title: ["Experiencia adicional", "Additional experience"], names: ["JavaScript", "PHP", "C#", "MySQL", "MVC", "OOP"] },
  { title: ["Operación self-hosted", "Self-hosted operations"], names: ["n8n"] },
];

function Marquee({ names, language, reduced }: { names: string[]; language: Language; reduced: boolean }) {
  const items = names
    .map((name) => technologies.find((tech) => tech.name === name))
    .filter((tech): tech is NonNullable<typeof tech> => Boolean(tech));
  const row = (copy: boolean) => (
    <ul className="tech-marquee-row" aria-hidden={copy || undefined}>
      {items.map((tech) => (
        <li key={`${copy ? "c" : "o"}-${tech.id}`}>
          <Chip name={tech.name} learning={Boolean(tech.learning)} label={language === "es" ? "aprendiendo" : "learning"} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="tech-marquee" aria-label={language === "es" ? "Tecnologías" : "Technologies"}>
      <div className={reduced ? "tech-marquee-track is-static" : "tech-marquee-track"}>
        {row(false)}
        {!reduced && row(true)}
      </div>
    </div>
  );
}

export function TechBento({ language }: { language: Language }) {
  const reduced = useReducedMotion();
  const es = language === "es";
  return (
    <div className="tech-bento">
      <div className="bento-grid">
        <SpotlightCard className="bento-card bento-lang">
          <h3 className="bento-title">{es ? "Lenguajes" : "Languages"}</h3>
          <LanguagesCard reduced={reduced} />
        </SpotlightCard>
        <SpotlightCard className="bento-card bento-backend">
          <h3 className="bento-title">{es ? "Backend y datos" : "Backend and data"}</h3>
          <BackendCard />
        </SpotlightCard>
        <SpotlightCard className="bento-card bento-quality">
          <h3 className="bento-title">{es ? "Entrega y calidad" : "Delivery and quality"}</h3>
          <QualityCard />
        </SpotlightCard>
        <SpotlightCard className="bento-card bento-infra">
          <h3 className="bento-title">{es ? "Infraestructura" : "Infrastructure"}</h3>
          <InfraCard reduced={reduced} />
        </SpotlightCard>
      </div>
      <div className="tech-complementary">
        <p className="tech-complementary-label">{es ? "Tecnologías complementarias" : "Complementary technologies"}</p>
        {GROUPS.map((group) => (
          <div className="tech-subgroup" key={group.title[0]}>
            <h4>{group.title[es ? 0 : 1]}</h4>
            <Marquee names={group.names} language={language} reduced={reduced} />
          </div>
        ))}
      </div>
    </div>
  );
}
