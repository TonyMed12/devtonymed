import type { Language } from "../data/i18n";
import { copy } from "../data/ui";

import { DetailDialog } from "./DetailDialog";
import { Icon } from "./Icons";
export type ResearchId = "cloud-security" | "fraud";
export function ResearchDialog({
  id,
  language,
  onClose,
  onLanguageChange,
}: {
  id: ResearchId;
  language: Language;
  onClose: () => void;
  onLanguageChange: () => void;
}) {
  const es = language === "es";
  const t = copy[language];
  const cloud = id === "cloud-security";
  const item = cloud ? t.research.cloud : t.research.fraud;
  return (
    <DetailDialog
      title={item.fullTitle}
      language={language}
      onClose={onClose}
      onLanguageChange={onLanguageChange}
    >
      <img
        className="research-dialog-logo"
        src={cloud ? "/institutions/cul.jpg" : "/institutions/itm.png"}
        alt={item.institution}
      />
      <p className="dialog-context">{item.type}</p>
      <p>{item.description}</p>
      <dl>
        <div>
          <dt>{es ? "Institución" : "Institution"}</dt>
          <dd>{item.institution}</dd>
        </div>
        <div>
          <dt>{es ? "Asesora / autores" : "Advisor / authors"}</dt>
          <dd>{item.people}</dd>
        </div>
        <div>
          <dt>{es ? "Estado" : "Status"}</dt>
          <dd>{item.status}</dd>
        </div>
      </dl>
      {cloud ? (
        <>
          <h3>{es ? "Problema investigado" : "Research problem"}</h3>
          <p>
            {es
              ? "Cómo se ha aplicado el aprendizaje automático para fortalecer la seguridad de la información en el desarrollo web en la nube, a partir de una revisión de la literatura."
              : "How machine learning has been applied to strengthen information security in cloud web development, examined through a literature review."}
          </p>
          <h3>
            {es ? "Participación y resultado" : "Participation and outcome"}
          </h3>
          <p>
            {es
              ? "Participé en la estancia del Programa Delfín en Barranquilla, Colombia, en la Corporación Universitaria Latinoamericana. Elaboré un artículo de revisión sistemática que no se ha publicado."
              : "I participated in the Delfín Program research placement at Corporación Universitaria Latinoamericana in Barranquilla, Colombia. I prepared a systematic review article that remains unpublished."}
          </p>
          <p>
            {es
              ? "Presentado en el Congreso Internacional del XXX Verano de la Investigación Científica y Tecnológica del Pacífico."
              : "Presented at the International Congress of the 30th Pacific Summer of Scientific and Technological Research."}
          </p>
        </>
      ) : (
        <>
          <p>
            {es
              ? "Participé como coautor en esta investigación académica del Instituto Tecnológico de Morelia. El trabajo se desarrolló en equipo en el contexto de Taller de Investigación II."
              : "I participated as a co-author in this academic research at Instituto Tecnológico de Morelia. The team worked on it in the context of Research Workshop II."}
          </p>
          <a
            className="button button-primary"
            href="https://github.com/Cesaredmyt/fraud-detection-itm"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" />
            GitHub ↗
          </a>
        </>
      )}
    </DetailDialog>
  );
}
