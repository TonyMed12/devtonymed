import type { Language } from "../data/i18n";
import { Reveal } from "./Reveal";
import { TechBento } from "./TechBento";
import { BlurText } from "../vendor/react-bits/BlurText";
import SplitText from "../vendor/react-bits/SplitText.jsx";

export function TechnologySection({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <section id="tecnologias" className="section-wrap tech-section">
      <Reveal className="section-heading" stagger={0.08} distance={24}>
        <SplitText
          tag="h2"
          text={es ? "De la idea al código." : "From idea to code."}
          splitType="words"
          textAlign="left"
          delay={60}
        />
        <BlurText
          text={es
            ? "Tecnologías que he usado para desarrollar y aprender. Cada una conserva el contexto de mi participación."
            : "Technologies I have used to build and learn. Each one keeps the context of my involvement."}
          animateBy="words"
          direction="bottom"
          delay={60}
          blur={8}
        />
      </Reveal>
      <Reveal distance={20} delay={0.12}>
        <TechBento language={language} />
      </Reveal>
    </section>
  );
}
