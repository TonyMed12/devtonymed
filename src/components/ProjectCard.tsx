import { useState } from "react";
import type { Project } from "../data/portfolio";
import type { Language } from "../data/i18n";
import { projectStories, read } from "../data/experience";
import { Icon, TechnologyIcon } from "./Icons";
import { DetailDialog } from "./DetailDialog";

export function ProjectCard({
  project,
  language,
  index,
  onLanguageChange,
  active,
}: {
  project: Project;
  language: Language;
  index: number;
  onLanguageChange: () => void;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const es = language === "es";
  const story = projectStories[project.id];
  const title = read(story.title, language);
  return (
    <article
      id={project.id}
      className={`project-card compact-project project-${project.id}`}
      aria-hidden={!active || undefined}
      inert={!active || undefined}
      role="group"
      aria-label={`${index + 1}. ${title}`}
      data-active={active}
    >
      <div className={`project-media media-${project.id}`}>
        {project.image ? (
          <img
            src={project.image}
            loading="lazy"
            draggable={false}
            alt={`${es ? "Vista de" : "View of"} ${title}`}
          />
        ) : (
          <div className="project-concept" aria-hidden="true">
            <span>
              {project.id === "caam"
                ? "MORELIA"
                : project.id === "todo"
                  ? "C# / JAVA / SQL"
                  : "ML / DATA"}
            </span>
            <b className="project-wordmark">
              {project.id === "caam"
                ? es
                  ? "Otra oportunidad."
                  : "Another chance."
                : project.id === "todo"
                  ? "To Do."
                  : es
                    ? "Fraude / datos"
                    : "Fraud / data"}
            </b>
            <span>{es ? "Captura no disponible" : "Screenshot not available"}</span>
          </div>
        )}
      </div>
      <div className="project-body">
        <h3>
          {title}
        </h3>
        <p className={`role-badge role-${story.kind}`}>
          <Icon name={story.kind === "coordination" ? "team" : "code"} />
          {es ? "Mi rol: " : "My role: "}
          {story.kind === "coordination"
            ? "Scrum Master"
            : story.kind === "research"
              ? es
                ? "Coautoría"
                : "Co-authorship"
              : project.id === "todo"
                ? es
                  ? "Programación"
                  : "Programming"
                : es
                  ? "Proyecto web"
                  : "Web project"}
        </p>
        <p className="project-context">{read(story.context, language)}</p>
        <p className="project-description">
          {project.description?.[es ? 0 : 1]}
        </p>
        <ul
          className="tags"
          aria-label={es ? "Tecnologías del proyecto" : "Project technologies"}
        >
          {project.mainTechnologies.map((tech) => (
            <li key={tech}>
              <TechnologyIcon name={tech} />
              {tech}
            </li>
          ))}
        </ul>
        {project.mainTechnologies.length === 0 && <p className="project-tech-pending">{es ? "Tecnologías pendientes de documentar" : "Technologies to be documented"}</p>}
        <div className="project-actions">
          <button
            type="button"
            aria-haspopup="dialog"
            onClick={() => setOpen(true)}
          >
            {es ? "Ver proyecto" : "Project details"} <Icon name="arrow" />
          </button>
          {project.repository && (
            <a href={project.repository} target="_blank" rel="noreferrer">
              <Icon name="github" />
              GitHub
            </a>
          )}
        </div>
      </div>
      {open && (
        <DetailDialog
          title={title}
          language={language}
          onClose={() => setOpen(false)}
          onLanguageChange={onLanguageChange}
        >
          {project.image && (
            <div className="dialog-project-preview">
              <img
                src={project.image}
                alt={`${es ? "Vista de" : "View of"} ${title}`}
              />
            </div>
          )}
          <p className="dialog-context">{read(story.context, language)}</p>
          <h3>{es ? "El problema" : "The problem"}</h3>
          <p>{project.description?.[es ? 0 : 1]}</p>
          <h3>{es ? "Mi contribución" : "My contribution"}</h3>
          <p>{read(story.contribution, language)}</p>
          <h3>
            {es ? "Organización del trabajo" : "How the work was organized"}
          </h3>
          <ul className="dialog-work">
            {story.work.map((item, index) => (
              <li key={index}>{read(item, language)}</li>
            ))}
          </ul>
          {story.scope && <p>{read(story.scope, language)}</p>}
          <h3>
            {es
              ? "Lo que conecto con mi práctica"
              : "What I connect with my practice"}
          </h3>
          <p>{read(story.learning, language)}</p>
          {project.technologies.length > 0 && (
            <>
              <h3>
                {es ? "Tecnologías del proyecto" : "Project technologies"}
              </h3>
              <ul className="tags">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <TechnologyIcon name={tech} />
                    {tech}
                  </li>
                ))}
              </ul>
            </>
          )}
          {project.authors && <p>{project.authors.join(" · ")}</p>}
          {project.repository && (
            <a
              className="button button-primary"
              href={project.repository}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" />
              GitHub ↗
            </a>
          )}
        </DetailDialog>
      )}
    </article>
  );
}
