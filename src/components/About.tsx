import type { Language } from "../data/i18n";
import { Principles } from "./Principles";
import { ScrollRevealText } from "./ScrollRevealText";
import { AboutIcon } from "./AboutIcon";
import { AnimatedContent } from "./AnimatedContent";
import { BlurText } from "../vendor/react-bits/BlurText";
import "./About.css";

export function About({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <section id="sobre-mi" className="section-wrap about-section about-editorial" aria-labelledby="about-title">
      <div className="about-intro-grid">
        <AnimatedContent className="about-heading" stagger={0.06} distance={24}>
          <p className="about-section-label"><span className="about-badge" aria-hidden="true">tm.</span><AboutIcon name="section" />{es ? "Detrás del código" : "Behind the code"}</p>          <BlurText as="h2" id="about-title" className="about-title-mask" text={es ? "Sobre mí" : "About me"} animateBy="words" direction="bottom" delay={50} blur={8} />
        </AnimatedContent>
        <div className="about-editorial-copy">
          <ScrollRevealText key={language}
            text={es
              ? "Me mueve la curiosidad por entender cómo funcionan las cosas y encontrar mejores formas de construirlas. Disfruto convertir ideas en software y, cuando un proyecto me exige algo nuevo, me comprometo a aprenderlo."
              : "I’m driven by curiosity about how things work and how to build them better. I enjoy turning ideas into software, and when a project calls for something new, I commit to learning it."}
            emphasis={es ? ["convertir ideas en software", "me comprometo a aprenderlo"] : ["turning ideas into software", "I commit to learning it"]} />
          <AnimatedContent as="p" className="about-supporting-copy" delay={0.08}>{es
            ? "Estudio Ingeniería en Sistemas Computacionales y he participado en programación, análisis de requisitos y coordinación de equipos de cinco personas como Scrum Master. Estas experiencias me han enseñado a organizar el trabajo, escuchar otras perspectivas y conectar la planificación con el desarrollo."
            : "I’m studying Computer Systems Engineering and have contributed to programming, requirements analysis, and coordinating five-person teams as a Scrum Master. These experiences have taught me to organize work, listen to different perspectives, and connect planning with development."}</AnimatedContent>
          
        </div>
      </div>
      <Principles language={language} />
    </section>
  );
}
