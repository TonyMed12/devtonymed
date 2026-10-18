import { useReducedMotion } from "../hooks/useReducedMotion";
import { TechnologyBand } from "./TechnologyBand";
import { useId, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { copy as translations, type Language } from "../data/i18n";
import { projects, technologies, type Technology } from "../data/portfolio";
import { localized, projectStories, read } from "../data/experience";
import { Reveal } from "./Reveal";
import { TechnologyIcon } from "./Icons";

const groups = {
  web: "Frontend",
  backend: "Backend",
  data: "Datos / Data",
  tools: "Herramientas / Tools",
};
const evidence = {
  springboot: localized(
    "Backend del equipo de ProjeXus. Mi participación fue Scrum Master, requisitos y planificación.",
    "ProjeXus team backend. My participation was Scrum Master, requirements and planning.",
  ),
  csharp: localized(
    "Versión de la aplicación To Do desarrollada en C# durante cuarto semestre.",
    "C# version of the To Do application developed during the fourth semester.",
  ),
  java: localized(
    "Versión de la aplicación To Do desarrollada en Java durante cuarto semestre.",
    "Java version of the To Do application developed during the fourth semester.",
  ),
  sql: localized(
    "Base de datos SQL con relaciones de muchos a muchos en To Do.",
    "SQL database with many-to-many relationships in To Do.",
  ),
  react: localized(
    "Componentes e interacciones de este portafolio, cuyo código utiliza React.",
    "Components and interactions in this portfolio, whose source uses React.",
  ),
};

export function TechnologySection({ language }: { language: Language }) {
  const [selectedId, setSelectedId] = useState("next");
  const [filter, setFilter] = useState<Technology["category"]>("web");

  const groupId = useId();
  const reduced = useReducedMotion();
  const es = language === "es";
  const selected = technologies.find((tech) => tech.id === selectedId)!;
  const application =
    evidence[selected.id as keyof typeof evidence]?.[language] ||
    translations[language].tech.applications[
      selected.id as keyof typeof translations.es.tech.applications
    ] ||
    (es
      ? "Tecnología utilizada en el proyecto de investigación de fraude."
      : "Technology used in the fraud research project.");
  const selectedProject = projects.find(
    (project) => project.id === selected.projectId && project.id !== "library",
  );
  function select(id: string) {
    const tech = technologies.find((tech) => tech.id === id)!;
    setFilter(tech.category);
    setSelectedId(id);
  }
  function selectGroup(category: Technology["category"]) {
    setFilter(category);
    setSelectedId(technologies.find((tech) => tech.category === category)!.id);
  }
  return (
    <section id="tecnologias" className="section-wrap tech-section">
      <Reveal className="section-heading">
        <div>
          <h2>{es ? "De la idea al código." : "From idea to code."}</h2>
        </div>
        <p>
          {es
            ? "Tecnologías que he usado para desarrollar y aprender. Cada una conserva el contexto de mi participación."
            : "Technologies I have used to build and learn. Each one keeps the context of my involvement."}
        </p>
      </Reveal>
      <TechnologyBand language={language} />
      <details className="technology-details">
        <summary>{es ? "Explorar tecnologías y su aplicación" : "Explore technologies and their application"}</summary>
      <div className="tech-layout tech-only">
        <Reveal className="tech-browser">
          <LayoutGroup id={groupId}>
            <div
              className="tech-essentials"
              aria-label={
                es ? "Tecnologías destacadas" : "Featured technologies"
              }
            >
              {["next", "springboot", "java", "csharp", "sql"].map((id) => {
                const tech = technologies.find((tech) => tech.id === id)!;
                return (
                  <motion.button
                    key={id}
                    type="button"
                    aria-pressed={selectedId === id}
                    onClick={() => select(id)}
                    whileHover={reduced ? undefined : { y: -4 }}
                    whileTap={reduced ? undefined : { scale: 0.96 }}
                  >
                    <TechnologyIcon name={tech.name} />
                    <span>{tech.name}</span>
                  </motion.button>
                );
              })}
            </div>
            <div
              className="filter-bar"
              role="group"
              aria-label={es ? "Áreas de tecnologías" : "Technology areas"}
            >
              {(Object.keys(groups) as Technology["category"][]).map(
                (category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={filter === category}
                    onClick={() => selectGroup(category)}
                  >
                    {filter === category && (
                      <motion.span
                        layoutId={reduced ? undefined : "category-selection"}
                        className="filter-selection"
                      />
                    )}
                    <span>
                      {category === "data"
                        ? es
                          ? "Datos"
                          : "Data"
                        : category === "tools"
                          ? es
                            ? "Herramientas"
                            : "Tools"
                          : groups[category]}
                    </span>
                  </button>
                ),
              )}
            </div>
            <motion.div className="tech-picker" layout={!reduced}>
              {technologies
                .filter((tech) => tech.category === filter)
                .map((tech) => (
                  <motion.button
                    layout={!reduced}
                    key={tech.id}
                    type="button"
                    className="tech-choice"
                    aria-pressed={selectedId === tech.id}
                    aria-controls={`${groupId}-detail`}
                    onClick={() => setSelectedId(tech.id)}
                    whileTap={reduced ? undefined : { scale: 0.96 }}
                  >
                    <TechnologyIcon name={tech.name} />
                    <span>{tech.name}</span>
                    {selectedId === tech.id && (
                      <motion.span
                        layoutId={reduced ? undefined : "tech-outline"}
                        className="tech-outline"
                      />
                    )}
                  </motion.button>
                ))}
            </motion.div>
            <motion.div
              layout={!reduced}
              id={`${groupId}-detail`}
              className="technology-evidence"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="evidence-heading">
                <TechnologyIcon name={selected.name} />
                <h3>{selected.name}</h3>
                <span className="mini-label">
                  {selected.personal
                    ? es
                      ? "Experiencia práctica"
                      : "Practical experience"
                    : es
                      ? "Stack del equipo"
                      : "Team stack"}
                </span>
              </div>
              <p>{application}</p>
              {selectedProject ? (
                <a className="text-link" href={`#${selectedProject.id}`}>
                  {projectStories[selectedProject.id]
                    ? read(projectStories[selectedProject.id].title, language)
                    : selectedProject.title}{" "}
                  ↗
                </a>
              ) : selected.projectId === "portfolio" ? (
                <a className="text-link" href="#inicio">
                  {es ? "Este portafolio" : "This portfolio"} ↗
                </a>
              ) : null}
            </motion.div>
          </LayoutGroup>
        </Reveal>
      </div>
      </details>
    </section>
  );
}
