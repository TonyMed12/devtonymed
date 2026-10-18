import { useId, useRef, useState, type KeyboardEvent } from "react";
import { LayoutGroup, motion } from "motion/react";
import type { Language } from "../data/i18n";
import { education } from "../data/education";
import { read } from "../data/experience";
import { site } from "../data/site";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Icon } from "./Icons";
import { JourneyPath } from "./JourneyPath";

export function Journey({ language }: { language: Language }) {
  const [selected, setSelected] = useState(1);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const group = useId();
  const reduced = useReducedMotion();
  const es = language === "es";
  const item = education[selected];
  const names = es
    ? ["Formación técnica", "Ingeniería en Sistemas", "Egreso previsto"]
    : ["Technical education", "Systems Engineering", "Expected completion"];
  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    const next =
      event.key === "ArrowRight"
        ? (selected + 1) % education.length
        : event.key === "ArrowLeft"
          ? (selected + education.length - 1) % education.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? education.length - 1
              : undefined;
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    refs.current[next]?.focus({ preventScroll: true });
    refs.current[next]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "instant",
    });
  }
  return (
    <LayoutGroup id={group}>
      <div className="compact-journey" data-reduced={reduced}>
        <div
          className="station-tabs"
          role="tablist"
          aria-label={es ? "Etapas de mi formación" : "Education stages"}
        >
          {education.map((station, index) => (
            <button
              key={station.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              id={`${group}-tab-${station.id}`}
              role="tab"
              type="button"
              aria-selected={index === selected}
              aria-controls={`${group}-panel`}
              tabIndex={index === selected ? 0 : -1}
              onKeyDown={keyboard}
              onClick={() => setSelected(index)}
              className={station.future ? "tab-future" : ""}
            >
              {selected === index && (
                <motion.span
                  layoutId={reduced ? undefined : "education-selection"}
                  className="education-selection"
                  transition={{ type: "spring", stiffness: 360, damping: 32 }}
                />
              )}
              <span className="station-tab-year">
                {station.year}
                {station.current && (es ? "actualidad" : "present")}
              </span>
              <span className="station-tab-name">{names[index]}</span>
            </button>
          ))}
        </div>
        <JourneyPath selected={selected} />
        <motion.article
          layout={!reduced}
          id={`${group}-panel`}
          role="tabpanel"
          aria-labelledby={`${group}-tab-${item.id}`}
          tabIndex={0}
          className={`journey-panel pointer-card ${item.current ? "journey-current" : ""}`}
        >
          <motion.div
            key={item.id}
            initial={reduced ? false : { opacity: 0.35, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.24 }}
            className="journey-panel-content"
          >
            <div className="journey-identity">
              <img
                className={`institution-logo logo-${item.id}`}
                src={item.logo}
                alt={item.institution}
              />
              <span className="status-pill">{read(item.status, language)}</span>
              <span className="journey-year">
                {item.year}
                {item.current && (es ? "actualidad" : "present")}
              </span>
            </div>
            <div className="journey-text">
              <h3>{read(item.title, language)}</h3>
              <p className="station-institution">{item.institution}</p>
              <p>{read(item.description, language)}</p>
              {item.id === "technical" && (
                <div className="license-block">
                  <Icon name="document" />
                  <div>
                    <span>
                      {es ? "Cédula profesional" : "Professional license"}
                    </span>
                    <strong>{site.licenseNumber}</strong>
                    <small>
                      {es
                        ? "Técnico en Programación"
                        : "Programming Technician"}
                    </small>
                  </div>
                  <a
                    href={site.licenseSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {es ? "Consultar cédula" : "Look up license"} ↗
                  </a>
                </div>
              )}
              {item.id === "isc" && (
                <div className="degree-specialty">
                  <p>
                    <Icon name="code" />
                    {item.specialty && read(item.specialty, language)}
                  </p>
                  <span className="degree-average">
                    {es ? "Promedio actual" : "Current average"}: {item.average}
                    /100
                  </span>
                </div>
              )}
              {item.id === "isc" && (
                <div className="degree-links">
                  <a
                    className="text-link"
                    href={site.degreeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {es ? "Conocer la carrera" : "About the degree"} ↗
                  </a>
                  <a
                    className="text-link"
                    href={site.curriculumUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {es ? "Retícula oficial" : "Official curriculum"} ↗
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.article>
      </div>
    </LayoutGroup>
  );
}
