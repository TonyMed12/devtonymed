import type { Language } from "../data/i18n";
import { AnimatedContent } from "./AnimatedContent";
import { BlurText } from "../vendor/react-bits/BlurText";

export function ProjectPresentationHeading({ language }: { language: Language }) {
  const es = language === "es";
  return <AnimatedContent as="header" className="section-heading project-presentation-heading" stagger={0.08} distance={24}>
    <BlurText as="h2" text={es ? "Proyectos seleccionados." : "Selected projects."} animateBy="words" direction="bottom" delay={50} blur={8} />
    <p>{es ? "Desarrollo, coordinación e investigación. Explora el contexto y mi contribución en cada proyecto." : "Development, coordination and research. Explore the context and my contribution to each project."}</p>
  </AnimatedContent>;
}
