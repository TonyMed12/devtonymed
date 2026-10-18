import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Language } from "../data/i18n";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Principles } from "./Principles";
import { ScrollRevealText } from "./ScrollRevealText";
import { AboutIcon } from "./AboutIcon";
import "./About.css";

export function About({ language }: { language: Language }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const es = language === "es";
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.90", "start 0.58"], trackContentSize: true });
  const titleTransform = useTransform(scrollYProgress, [0, 1], ["translateY(28%)", "translateY(0%)"]);
  const titleOpacity = useTransform(scrollYProgress, [0, .8], [.2, 1]);
  return (
    <section ref={ref} id="sobre-mi" className="section-wrap about-section about-editorial" aria-labelledby="about-title">
      <div className="about-intro-grid">
        <div className="about-heading">
          <p className="about-section-label"><AboutIcon name="section" />{es ? "Detrás del código" : "Behind the code"}</p>
          <h2 id="about-title" className="about-title-mask">
            <motion.span style={reduced ? { transform: "none", opacity: 1 } : { transform: titleTransform, opacity: titleOpacity }}>{es ? "Sobre mí" : "About me"}</motion.span>
          </h2>
        </div>
        <div className="about-editorial-copy">
          <ScrollRevealText key={language}
            text={es
              ? "He coordinado equipos de cinco personas como Scrum Master. Conecto requisitos, planificación y programación para trabajar con claridad."
              : "I have coordinated five-person teams as Scrum Master. I connect requirements, planning and programming to work with clarity."}
            emphasis={es ? "con claridad." : "with clarity."} />
          <p className="about-supporting-copy">{es
            ? "He participado en requisitos, ERS, BPMN y seguimiento de tareas. También he trabajado con C#, Java y SQL en proyectos de programación."
            : "I have contributed to requirements, SRS, BPMN and task follow-up. I have also worked with C#, Java and SQL in programming projects."}</p>
        </div>
      </div>
      <Principles language={language} />
    </section>
  );
}
