import { useState, type CSSProperties } from "react";
import type { Language } from "../data/i18n";
import { projects, type Project } from "../data/portfolio";
import { projectStories, read } from "../data/experience";
import { AnimatedContent } from "./AnimatedContent";
import { Icon, TechnologyIcon } from "./Icons";
import { GlareHover } from "../vendor/react-bits/GlareHover";

// Featured projects lead; the rest follow under their own heading. Details live on the card's back face.
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

// Featured projects are image cards in one row; the other projects are thumbnail rows.
function ProjectGroup({ title, items, language, offset = 0, variant }: { title: string; items: Project[]; language: Language; offset?: number; variant: "featured" | "others" }) {
  return (
    <div className={`showcase-group showcase-group-${variant}`}>
      <h3 className="showcase-group-title">{title}</h3>
      <div className="showcase-grid">
        {items.map((project, index) => (
          <AnimatedContent as="article" key={project.id} id={project.id} className="showcase-card" delay={index * 0.08} distance={28}>
            <ShowcaseCard project={project} language={language} index={offset + index} />
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
}

// Featured cards flip in 3D to a case-study back face; the flip is a click on the button (keyboard and touch included).
function ShowcaseCard({ project, language, index }: { project: Project; language: Language; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const es = language === "es";
  const title = read(projectStories[project.id].title, language);
  const cs = project.caseStudy;
  const contribution = es ? project.myContribution : project.myContributionEn;
  const pending = es ? "Pendiente de documentar." : "To be documented.";
  return (
    <div className={`showcase-flip${flipped ? " is-flipped" : ""}`}>
      <div className="showcase-face showcase-face--front" inert={flipped}>
        <div className="showcase-media">
          {project.award && (
            <span className="showcase-award">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 21h8M12 17v4M7 4h10M17 4v8a5 5 0 0 1-10 0V4M5 9a2 2 0 1 1 0-4M19 9a2 2 0 1 0 0-4" />
              </svg>
              {project.award[es ? 0 : 1]}
            </span>
          )}
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
          <p className="showcase-description">{project.description?.[es ? 0 : 1]}</p>
          {contribution && (
            <div className="showcase-contribution">
              <span>{es ? "Mi contribución" : "My contribution"}</span>
              <p>{contribution}</p>
            </div>
          )}
          <div className="showcase-actions">
            {project.featured && (
              <button type="button" className="showcase-flip-toggle" aria-expanded={flipped} onClick={() => setFlipped(true)}>
                {es ? "Ver caso de estudio" : "View case study"} <Icon name="arrow" />
              </button>
            )}
            {project.repository && (
              <a href={project.repository} target="_blank" rel="noreferrer">
                <Icon name="github" /> {es ? "Repositorio" : "Repository"}
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer">
                Demo <Icon name="arrow" />
              </a>
            )}
          </div>
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
              <dd>{contribution ?? pending}</dd>
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
          {project.evidence && (
            <img className="showcase-evidence" src={project.evidence.image} alt={project.evidence.alt[es ? 0 : 1]} loading="lazy" draggable={false} />
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
