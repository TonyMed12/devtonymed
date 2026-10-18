import type { Language } from "../data/i18n";

export function Languages({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <div className="languages-section" aria-label={es ? "Idiomas" : "Languages"}>
      <h4>{es ? "Idiomas" : "Languages"}</h4>
      <div className="language-cards">
        <article className="native-language">
          <h5>{es ? "Español" : "Spanish"}</h5>
          <strong className="language-level">{es ? "Nativo" : "Native"}</strong>
        </article>
        <article className="english-language">
          <h5>{es ? "Inglés" : "English"}</h5>
          <strong className="language-level">B2</strong>
          <span className="reported-level">{es ? "Nivel reportado" : "Reported level"}</span>
          <span className="language-certification">{es ? "Certificación pendiente" : "Certification pending"}</span>
        </article>
      </div>
    </div>
  );
}
