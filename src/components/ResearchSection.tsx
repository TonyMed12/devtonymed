import { AnimatedContent } from "./AnimatedContent";
import type { Language } from "../data/i18n";
import { copy } from "../data/ui";
import { ExperienceCard, ExperienceCardPart } from "./ExperienceCard";
import { Icon } from "./Icons";
import type { ResearchId } from "./ResearchDialog";

export function ResearchSection({ language, onOpen }: {
  language: Language;
  onOpen: (id: ResearchId) => void;
}) {
  const es = language === "es";
  const t = copy[language];
  return (
    <div id="investigacion" className="research-section">
      <AnimatedContent className="research-intro" stagger={0.08} distance={24}>
        <h3>{es ? "Investigación." : "Research."}</h3>
        <p>{es ? "Preguntar, contrastar y compartir lo aprendido." : "Ask questions, examine evidence and share what I learn."}</p>
      </AnimatedContent>
      <div className="research-grid">
        {(["cloud-security", "fraud"] as const).map((id, index) => {
          const cloud = id === "cloud-security";
          const item = cloud ? t.research.cloud : t.research.fraud;
          return (
            <ExperienceCard key={id} index={index} labelledBy={`research-${id}-title`} className={`research-card research-${id}`}>
              <ExperienceCardPart className="research-identity">
                <img className="research-institution-logo" src={cloud ? "/institutions/cul.jpg" : "/institutions/itm.png"} alt={item.institution} width={120} height={70} loading="lazy" />
                <span>{cloud ? "Barranquilla, Colombia · 2025" : es ? "Morelia, México" : "Morelia, Mexico"}</span>
              </ExperienceCardPart>
              <ExperienceCardPart className="research-body">
                <p className="date">{item.institution}</p>
                <h4 id={`research-${id}-title`}>{item.title}</h4>
                <p>{item.description}</p>
                {cloud && <p className="congress-milestone">{es
                  ? "Presentado como ponente en el Congreso Internacional Virtual del 30.º Verano de la Investigación Científica y Tecnológica del Pacífico, 24–26 de septiembre de 2025."
                  : "Presented as a speaker at the Virtual International Congress of the 30th Pacific Summer of Scientific and Technological Research, September 24–26, 2025."}</p>}
                <div className="research-actions">
                  <span className="research-status">{item.status}</span>
                  <button className="text-link" type="button" aria-haspopup="dialog" onClick={() => onOpen(id)}>{t.viewResearch} <Icon name="arrow" /></button>
                  {cloud && (
                    <a className="text-link" href="/credentials/delfin-ponente-2025.pdf" target="_blank" rel="noreferrer">
                      {es ? "Reconocimiento como ponente (PDF)" : "Speaker recognition (PDF)"} <Icon name="arrow" />
                    </a>
                  )}
                </div>
              </ExperienceCardPart>
            </ExperienceCard>
          );
        })}
      </div>
    </div>
  );
}
