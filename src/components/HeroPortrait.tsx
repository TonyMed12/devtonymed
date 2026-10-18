import { useState } from "react";
import type { Language } from "../data/i18n";
import { portrait, portraitImageStyle } from "../data/portrait";
import { site } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { DeveloperTerminal } from "./DeveloperTerminal";
import "./HeroPortrait.css";

export function HeroPortrait({ language, enabled = true }: { language: Language; enabled?: boolean }) {
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="hero-portrait-composition" data-enabled={enabled} data-reduced={reduced}>
      <figure className="editorial-portrait" data-reduced={reduced}>
        <div className="portrait-card-photo">
          <img src={portrait.photo} alt={site.fullName} width={portrait.width} height={portrait.height} style={portraitImageStyle} fetchPriority="high" decoding="async" onError={() => setFailed(true)} />
          {failed && <span className="portrait-load-error" role="status">{language === "es" ? "No se pudo cargar la fotografía." : "The photograph could not be loaded."}</span>}
        </div>
        <figcaption className="sr-only">{language === "es" ? "Retrato de José Antonio Medina Ayala, desarrollador Full-Stack Junior." : "Portrait of José Antonio Medina Ayala, Junior Full-Stack Developer."}</figcaption>
      </figure>
      <DeveloperTerminal language={language} />
    </div>
  );
}
