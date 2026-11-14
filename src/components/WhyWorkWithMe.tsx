import type { Language } from "../data/i18n";
import { AnimatedContent } from "./AnimatedContent";
import { Icon } from "./Icons";

// Strengths drawn from the existing profile, projects and technology list; no metrics or testimonials.
const ROWS: { title: [string, string]; text: [string, string]; tags: string[] }[] = [
  {
    title: ["Coordinación de equipos", "Team coordination"],
    text: [
      "Scrum Master de un equipo de cinco personas: planificación, seguimiento y comunicación entre roles.",
      "Scrum Master for a five-person team: planning, follow-up and communication across roles.",
    ],
    tags: ["Scrum", "Planificación", "Comunicación"],
  },
  {
    title: ["Desarrollo full-stack", "Full-stack development"],
    text: [
      "Interfaces en React y Next.js conectadas a APIs con Spring Boot y bases de datos relacionales.",
      "React and Next.js interfaces connected to APIs built with Spring Boot and relational databases.",
    ],
    tags: ["Next.js", "Spring Boot", "PostgreSQL"],
  },
  {
    title: ["Datos y aprendizaje automático", "Data and machine learning"],
    text: [
      "Modelos predictivos para detectar fraude, con evaluación cuidadosa en datos desbalanceados.",
      "Predictive models for fraud detection, carefully evaluated on imbalanced data.",
    ],
    tags: ["scikit-learn", "XGBoost", "Pandas"],
  },
  {
    title: ["Calidad y entrega", "Quality and delivery"],
    text: [
      "Pruebas automatizadas con Vitest y Pytest, y validación de datos con Zod.",
      "Automated tests with Vitest and Pytest, and data validation with Zod.",
    ],
    tags: ["Vitest", "Pytest", "Zod"],
  },
];

export function WhyWorkWithMe({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <section id="por-que-trabajar" className="section-wrap why-section" aria-labelledby="why-title">
      <AnimatedContent className="why-heading" distance={24}>
        <p className="why-eyebrow">{es ? "Lo que hago bien" : "What I do well"}</p>
        <h2 id="why-title">{es ? "Por qué trabajar conmigo" : "Why work with me"}</h2>
      </AnimatedContent>
      <ol className="why-list">
        {ROWS.map((row, index) => (
          <li key={row.title[0]} className="why-row">
            <AnimatedContent className="why-row-inner" delay={index * 0.08} distance={24}>
              <span className="why-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{row.title[es ? 0 : 1]}</h3>
              <p>{row.text[es ? 0 : 1]}</p>
              <ul className="why-tags">
                {row.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </AnimatedContent>
          </li>
        ))}
      </ol>
      <a className="button button-primary why-cta" href="#contacto">
        {es ? "Hablemos" : "Let’s talk"} <Icon name="arrow" />
      </a>
    </section>
  );
}
