import type { CSSProperties } from "react";
import { AnimatedContent } from "./AnimatedContent";
import type { Language } from "../data/i18n";

// Circular gauge: the arc fills to the level as the card scrolls into view (see motion-sections.css).
function LevelArc({ filled }: { filled: number }) {
  return (
    <svg className="level-arc" viewBox="0 0 48 48" aria-hidden="true" style={{ "--value": filled / 6 } as CSSProperties}>
      <circle className="level-arc__track" cx="24" cy="24" r="20" pathLength={1} />
      <circle className="level-arc__fill" cx="24" cy="24" r="20" pathLength={1} />
    </svg>
  );
}

export function Languages({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <div className="languages-section" aria-label={es ? "Idiomas" : "Languages"}>
      <AnimatedContent as="h4" distance={24}>{es ? "Idiomas" : "Languages"}</AnimatedContent>
      <AnimatedContent className="language-cards" stagger={0.06}>
        <article className="native-language">
          <h5>{es ? "Español" : "Spanish"}</h5>
          <strong className="language-level">{es ? "Nativo" : "Native"}</strong>
          <LevelArc filled={6} />
          <span className="language-code" aria-hidden="true">ES</span>
        </article>
        <article className="english-language">
          <h5>{es ? "Inglés" : "English"}</h5>
          <strong className="language-level">B2</strong>
          <LevelArc filled={4} />
          <span className="language-code" aria-hidden="true">EN</span>
          <span className="reported-level">{es ? "Nivel reportado" : "Reported level"}</span>
          <span className="language-certification">{es ? "Certificación pendiente" : "Certification pending"}</span>
        </article>
      </AnimatedContent>
    </div>
  );
}
