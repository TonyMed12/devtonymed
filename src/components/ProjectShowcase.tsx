import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Language } from "../data/i18n";
import { projects, type Project } from "../data/portfolio";
import { projectStories, read } from "../data/experience";
import { AnimatedContent } from "./AnimatedContent";
import { Icon, TechnologyIcon } from "./Icons";
import { GlareHover } from "../vendor/react-bits/GlareHover";

type Tab = "summary" | "architecture" | "flow";

// Featured projects lead; the rest follow under their own heading. Details live in tabs, not dialogs.
export function ProjectShowcase({ language }: { language: Language }) {
  const es = language === "es";
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);
  return (
    <>
      <ProjectGroup title={es ? "Proyectos destacados" : "Featured projects"} items={featured} language={language} variant="featured" />
      {others.length > 0 && <ProjectGroup title={es ? "Otros proyectos" : "Other projects"} items={others} language={language} offset={featured.length} variant="others" />}
    </>
  );
}

// The first featured project is the spotlight: full width, the rest of the featured group sits in two columns.
// The other projects are compact vertical cards in three columns.
function ProjectGroup({ title, items, language, offset = 0, variant }: { title: string; items: Project[]; language: Language; offset?: number; variant: "featured" | "others" }) {
  return (
    <div className={`showcase-group showcase-group-${variant}`}>
      <h3 className="showcase-group-title">{title}</h3>
      <div className="showcase-grid">
        {items.map((project, index) => (
          <AnimatedContent as="article" key={project.id} id={project.id} className={`showcase-card${variant === "featured" && index === 0 ? " showcase-card--spotlight" : ""}`} delay={index * 0.08} distance={28}>
            <ShowcaseCard project={project} language={language} index={offset + index} />
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
}

// Featured cards flip in 3D to a case-study back face; the flip is a click on the button (keyboard and touch included).
function ShowcaseCard({ project, language, index }: { project: Project; language: Language; index: number }) {
  const [tab, setTab] = useState<Tab>("summary");
  const [flipped, setFlipped] = useState(false);
  const es = language === "es";
  const title = read(projectStories[project.id].title, language);
  const cs = project.caseStudy;
  const tabs: [Tab, string][] = [
    ["summary", es ? "Resumen" : "Summary"],
    ["architecture", es ? "Arquitectura" : "Architecture"],
    ["flow", es ? "Flujo" : "Flow"],
  ];
  const pending = es ? "Pendiente de documentar." : "To be documented.";
  return (
    <div className={`showcase-flip${flipped ? " is-flipped" : ""}`}>
      <div className="showcase-face showcase-face--front" inert={flipped}>
        <div className="showcase-media">
          <GlareHover width="100%" height="100%" borderRadius="0" glareOpacity={0.4} glareAngle={-35} className="showcase-glare">
            {project.image ? (
              <img src={project.image} alt={`${es ? "Vista de" : "View of"} ${title}`} loading="lazy" draggable={false} />
            ) : (
              // TODO: reemplazar con captura real.
              <span className="showcase-placeholder" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            )}
          </GlareHover>
        </div>
        <div className="showcase-body">
          <p className="showcase-role">{project.role ?? (es ? "Proyecto" : "Project")}</p>
          <h4>{title}</h4>
          <p className="showcase-context">{read(projectStories[project.id].context, language)}</p>
          {project.metrics && (
            <ul className="showcase-metrics">
              {project.metrics.map((metric) => (
                <li key={metric.value}><strong>{metric.value}</strong><span>{es ? metric.label[0] : metric.label[1]}</span></li>
              ))}
            </ul>
          )}
          <ul className="showcase-tech" aria-label={es ? "Tecnologías" : "Technologies"}>
            {project.mainTechnologies.map((name) => (
              <li key={name} data-tech={name}><TechnologyIcon name={name} />{name}</li>
            ))}
          </ul>
          <div className="showcase-tabs" role="group" aria-label={es ? "Detalle del proyecto" : "Project detail"}>
            {tabs.map(([id, label]) => (
              <button key={id} type="button" aria-pressed={tab === id} onClick={() => setTab(id)}>
                {tab === id && <motion.span layoutId={`showcase-tab-${project.id}`} className="showcase-tab-marker" />}
                <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="showcase-panel" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
                {tab === "summary" && (
                  <div className="showcase-summary">
                    <p>{project.description?.[es ? 0 : 1] ?? ""}</p>
                    <div className="showcase-result">
                      <span>{es ? "Resultado" : "Result"}</span>
                      <p>{cs ? (es ? cs.result[0] : cs.result[1]) : pending}</p>
                    </div>
                  </div>
                )}
                {tab === "architecture" && (
                  <ol className="showcase-nodes">
                    {cs ? cs.architecture.map(([a, b], i) => (
                      <li key={i} style={{ "--i": i } as CSSProperties}>{es ? a : b}</li>
                    )) : <li>{pending}</li>}
                  </ol>
                )}
                {tab === "flow" && (
                  <ol className="showcase-steps">
                    {cs ? cs.flow.map(([a, b], i) => (
                      <li key={i} style={{ "--i": i } as CSSProperties}><span>{i + 1}</span>{es ? a : b}</li>
                    )) : <li>{pending}</li>}
                  </ol>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {project.featured && (
            <button type="button" className="showcase-flip-toggle" aria-expanded={flipped} onClick={() => setFlipped(true)}>
              {es ? "Ver caso de estudio" : "View case study"} <Icon name="arrow" />
            </button>
          )}
        </div>
      </div>
      {project.featured && (
        <div className="showcase-face showcase-face--back" inert={!flipped}>
          <div className="showcase-back-head">
            <h4>{title}</h4>
            <button type="button" className="showcase-back-close" onClick={() => setFlipped(false)}>
              {es ? "Volver" : "Back"}
            </button>
          </div>
          <dl className="showcase-back-sections">
            <div>
              <dt>{es ? "Problema" : "Problem"}</dt>
              <dd>{read(projectStories[project.id].context, language)}</dd>
            </div>
            <div>
              <dt>{es ? "Mi contribución" : "My contribution"}</dt>
              <dd>{(es ? project.myContribution : project.myContributionEn) ?? pending}</dd>
            </div>
            <div>
              <dt>{es ? "Resultado" : "Result"}</dt>
              <dd>{cs ? (es ? cs.result[0] : cs.result[1]) : pending}</dd>
            </div>
          </dl>
          {cs && (
            <ol className="showcase-nodes showcase-back-flow">
              {cs.architecture.map(([a, b], i) => (
                <li key={i} style={{ "--i": i } as CSSProperties}>{es ? a : b}</li>
              ))}
            </ol>
          )}
          <div className="showcase-back-links">
            {project.repository && (
              <a href={project.repository} target="_blank" rel="noreferrer">
                {es ? "Ver repositorio" : "View repository"} <Icon name="arrow" />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer">
                {es ? "Ver demo" : "View demo"} <Icon name="arrow" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
