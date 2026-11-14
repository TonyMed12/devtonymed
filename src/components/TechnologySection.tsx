import { copy, type Language } from "../data/i18n";
import { Reveal } from "./Reveal";
import { TechStack } from "./TechStack";
import { BlurText } from "../vendor/react-bits/BlurText";
import SplitText from "../vendor/react-bits/SplitText.jsx";

export function TechnologySection({ language }: { language: Language }) {
  const t = copy[language].tech.stack;
  return (
    <section id="tecnologias" className="section-wrap tech-section">
      <Reveal className="section-heading" stagger={0.08} distance={24}>
        <SplitText tag="h2" text={t.title} splitType="words" textAlign="left" delay={60} />
        <BlurText text={t.lead} animateBy="words" direction="bottom" delay={60} blur={8} />
      </Reveal>
      <Reveal distance={20} delay={0.12}>
        {/* Cambia a variant="chips" para la propuesta compacta. */}
        <TechStack language={language} variant="cards" />
      </Reveal>
    </section>
  );
}
