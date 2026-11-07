import { AnimatedContent } from "./AnimatedContent";
import type { Language } from "../data/i18n";
import { education } from "../data/education";
import { read } from "../data/experience";
import { site } from "../data/site";
import { Icon } from "./Icons";
import { BlurText } from "../vendor/react-bits/BlurText";
import { ExperienceCard, ExperienceCardPart } from "./ExperienceCard";
import "./Journey.css";

function AcademicCard({ item, language, index }: { item: typeof education[number]; language: Language; index: number }) {
  const es = language === "es";
  const graduation = education.find(entry => entry.future)!;
  return <ExperienceCard index={index} slotClassName={`academic-slot ${item.current ? "academic-slot-current" : ""}`} labelledBy={`academic-${item.id}`} className="academic-card">
      <ExperienceCardPart className="academic-identity">
        <div className={`academic-logo academic-logo-${item.id}`}><img src={item.logo} alt={item.current ? "TecNM · Instituto Tecnológico de Morelia" : "CBTis 147 · Jaguares"} /></div>
        <p className="academic-period">{item.year}{item.current && (es ? "actualidad" : "present")}</p>
        <p className="academic-status">{item.current && <span aria-hidden="true" />}{read(item.status, language)}</p>
      </ExperienceCardPart>
      <ExperienceCardPart className="academic-copy">
        <p className="academic-institution">{item.institution}</p>
        <h3 id={`academic-${item.id}`}>{read(item.title, language)}</h3>
        <p className="academic-description">{read(item.description, language)}</p>
      </ExperienceCardPart>
      <ExperienceCardPart className="academic-details">
        {item.current ? <>
          <p className="academic-specialty">{item.specialty && read(item.specialty, language)}</p>
          <dl className="academic-facts"><div><dt>{es ? "Promedio actual" : "Current average"}</dt><dd>{item.average}<span>/100</span></dd></div><div className="academic-milestone"><dt>{es ? "Egreso previsto" : "Expected completion"}</dt><dd>{graduation.year}</dd></div></dl>
          <div className="academic-actions"><a href={site.degreeUrl} target="_blank" rel="noreferrer">{es ? "Conocer la carrera" : "About the degree"}<Icon name="arrow" /></a><a href={site.curriculumUrl} target="_blank" rel="noreferrer">{es ? "Retícula oficial" : "Official curriculum"}<Icon name="arrow" /></a></div>
        </> : <>
          <dl className="academic-facts"><div><dt>{es ? "Cédula profesional" : "Professional license"}</dt><dd className="academic-license">{site.licenseNumber}</dd></div></dl>
          <div className="academic-actions"><a href={site.licenseSearchUrl} target="_blank" rel="noreferrer">{es ? "Consultar cédula" : "Look up license"}<Icon name="arrow" /></a></div>
        </>}
      </ExperienceCardPart>
  </ExperienceCard>;
}
export function Journey({ language }: { language: Language }) {
  const es = language === "es";
  return <div className="academic-journey">
    <AnimatedContent as="header" className="academic-heading" stagger={0.08} distance={24}>
      <BlurText as="h2" text={es ? "Formación y trayectoria." : "Education & journey."} animateBy="words" direction="bottom" delay={50} blur={8} />
      <p>{es ? "De Técnico en Programación a Ingeniería en Sistemas Computacionales. Egreso previsto en 2027." : "From Programming Technician to Computer Systems Engineering. Expected completion in 2027."}</p>
    </AnimatedContent>
    <div className="academic-grid">{education.filter(item => !item.future).map((item, index) => <AcademicCard key={item.id} index={index} item={item} language={language} />)}</div>
  </div>;
}
