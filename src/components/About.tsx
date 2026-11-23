import type { Language } from "../data/i18n";
import { Principles } from "./Principles";
import { ScrollRevealText } from "./ScrollRevealText";
import { AboutIcon } from "./AboutIcon";
import { AnimatedContent } from "./AnimatedContent";
import { KaizenCycle } from "./KaizenCycle";
import { BlurText } from "../vendor/react-bits/BlurText";
import "./About.css";

export function About({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <section id="sobre-mi" className="section-wrap about-section about-editorial" aria-labelledby="about-title">
      <div className="about-intro-grid">
        <div className="about-left">
        <AnimatedContent className="about-heading" stagger={0.06} distance={24}>
          <p className="about-section-label"><span className="about-badge" aria-hidden="true">tm.</span><AboutIcon name="section" />{es ? "Detrás del código" : "Behind the code"}</p>          <BlurText as="h2" id="about-title" className="about-title-mask" text={es ? "Más sobre mí" : "More about me"} animateBy="words" direction="bottom" delay={50} blur={8} />
        </AnimatedContent>
        <KaizenCycle language={language} />
        </div>
        <div className="about-editorial-copy">
          <ScrollRevealText key={language}
            text={es
              ? "Me mueve la curiosidad por entender cómo funcionan las cosas y encontrar mejores formas de construirlas. Disfruto convertir ideas en software y, cuando un proyecto me exige algo nuevo, me comprometo a aprenderlo."
              : "I’m driven by curiosity about how things work and how to build them better. I enjoy turning ideas into software, and when a project calls for something new, I commit to learning it."}
            emphasis={es ? ["convertir ideas en software", "me comprometo a aprenderlo"] : ["turning ideas into software", "I commit to learning it"]} />
          <AnimatedContent as="p" className="about-supporting-copy" delay={0.08}>{es
            ? "He participado en programación, análisis de requisitos y en la dirección de equipos de entre 3 y 13 personas como Scrum Master y Project Manager. Esto me ha enseñado a organizar el trabajo y a escuchar otras perspectivas. Me interesa mejorar siempre: aprendo de los demás y contribuyo en lo que me sea posible."
            : "I have worked in programming, requirements analysis, and leading teams of 3 to 13 people as a Scrum Master and Project Manager. This has taught me to organize work and listen to different perspectives. I’m always looking to improve: I learn from others and contribute wherever I can."}</AnimatedContent>
        </div>
      </div>
      <Principles language={language} />
    </section>
  );
}
