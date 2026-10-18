import type { Language } from "../data/i18n";
import { copy } from "../data/ui";
import { Reveal } from "./Reveal";
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
      <div className="research-intro">
        <h3>{es ? "Investigación." : "Research."}</h3>
        <p>{es ? "Preguntar, contrastar y compartir lo aprendido." : "Ask questions, examine evidence and share what I learn."}</p>
      </div>
      <div className="research-grid">
        {(["cloud-security", "fraud"] as const).map(id => {
          const cloud = id === "cloud-security";
          const item = cloud ? t.research.cloud : t.research.fraud;
          return (
            <Reveal key={id} className={`research-card research-${id}`}>
              <div className="research-identity">
                <img className="research-institution-logo" src={cloud ? "/institutions/cul.jpg" : "/institutions/itm.png"} alt={item.institution} width={120} height={70} loading="lazy" />
                <span>{cloud ? "Barranquilla, Colombia · 2025" : es ? "Morelia, México" : "Morelia, Mexico"}</span>
              </div>
              <div className="research-body">
                <p className="date">{item.institution}</p>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                {cloud && <p className="congress-milestone">{es
                  ? "Presentado en el Congreso Internacional del XXX Verano de la Investigación Científica y Tecnológica del Pacífico."
                  : "Presented at the International Congress of the 30th Pacific Summer of Scientific and Technological Research."}</p>}
                <div className="research-actions">
                  <span className="research-status">{item.status}</span>
                  <button className="text-link" type="button" aria-haspopup="dialog" onClick={() => onOpen(id)}>{t.viewResearch} <Icon name="arrow" /></button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
