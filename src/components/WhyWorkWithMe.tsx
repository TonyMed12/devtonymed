import type { Language } from "../data/i18n";
import { AnimatedContent } from "./AnimatedContent";
import { Icon } from "./Icons";

// Each row pairs a soft skill with the technical work that proves it; claims come from the projects, courses and talks in this portfolio.
const ROWS: { title: [string, string]; text: [string, string]; tags: string[] }[] = [
  {
    title: ["Liderazgo y coordinación", "Leadership and coordination"],
    text: [
      "He dirigido equipos de entre 3 y 13 personas como Scrum Master y Project Manager, además de programar: lógica de negocio, reparto de roles, contratos claros entre módulos e integración del trabajo de todos en Git.",
      "I have led teams of 3 to 13 people as Scrum Master and Project Manager, on top of programming: business logic, role split, clear contracts between modules and integrating everyone's work in Git.",
    ],
    tags: ["Scrum", "Project Management", "Git"],
  },
  {
    title: ["Comunicación clara", "Clear communication"],
    text: [
      "Traduzco necesidades en requisitos (ERS y BPMN) y las explico con claridad. Un ejemplo: la presentación de prototipos ante jurados (RutaSegura ITM, 1.er lugar en HackaPony) y mi investigación como ponente en el Congreso Internacional del Verano de la Investigación Científica y Tecnológica del Pacífico.",
      "I turn needs into requirements (SRS and BPMN) and explain them clearly. An example: presenting prototypes to juries (RutaSegura ITM, 1st place at HackaPony) and my research as a speaker at the International Congress of the Pacific Summer of Scientific and Technological Research.",
    ],
    tags: ["Requisitos", "BPMN", "Presentaciones"],
  },
  {
    title: ["Pienso en quién lo usa", "I think about who uses it"],
    text: [
      "Me pongo en el lugar de quien lo usa. En RutaSegura, reportes de accesibilidad que cualquier persona entiende en un toque; en Alvare Ditana, no solo un proyecto sino un negocio real, que cuido con SEO para que más personas lo encuentren. Más allá de las necesidades, los detalles cuentan siempre.",
      "I put myself in the user's place. In RutaSegura, accessibility reports anyone can understand in one tap; in Alvare Ditana, not just a project but a real business, which I look after with SEO so more people can find it. Beyond needs, details always count.",
    ],
    tags: ["Accesibilidad", "SEO", "Next.js"],
  },
  {
    title: ["Aprendo lo que el proyecto pide", "I learn what the project needs"],
    text: [
      "Un proyecto no es superficial: si se necesita aprender algo, lo voy a hacer. Por eso, además de construir, sigo preparándome en mi día a día, integrando lo técnico con las habilidades blandas.",
      "A project is never superficial: if something needs to be learned, I will learn it. That is why, besides building, I keep preparing myself day by day, integrating technical skills with soft skills.",
    ],
    tags: ["AWS", "Seguridad", "Ciencia de datos"],
  },
  {
    title: ["IA con criterio", "AI with judgment"],
    text: [
      "Integro la inteligencia artificial en mi flujo de desarrollo para producir más, sin soltar el criterio: doy contexto claro y reviso todo lo que genera. En el hackatón, por ejemplo, el equipo trabajó con reglas para sus asistentes de IA: carpetas por persona y contratos entre módulos.",
      "I integrate artificial intelligence into my development workflow to be more productive without letting go of judgment: I give clear context and review everything it generates. At the hackathon, for example, the team worked with rules for its AI assistants: folders per person and contracts between modules.",
    ],
    tags: ["IA generativa", "Claude Code", "Revisión de código"],
  },
  {
    title: ["Rigor y atención al detalle", "Rigor and attention to detail"],
    text: [
      "Reviso lo que construyo, porque cada error tiene una consecuencia. En la detección de fraude, por ejemplo, un falso negativo es dinero perdido.",
      "I check what I build, because every mistake has a consequence. In fraud detection, for example, a false negative is lost money.",
    ],
    tags: ["Vitest", "Pytest", "Zod", "scikit-learn"],
  },
];

export function WhyWorkWithMe({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <section id="por-que-trabajar" className="section-wrap why-section" aria-labelledby="why-title">
      <AnimatedContent className="why-heading" distance={24}>
        <p className="why-eyebrow">{es ? "Habilidades blandas y técnicas" : "Soft and technical skills"}</p>
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
