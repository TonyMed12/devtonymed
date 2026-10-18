import type { Language } from "../data/i18n";
import { site } from "../data/site";
import { Icon } from "./Icons";
export function ResumeLink({
  language,
  className = "button button-secondary",
}: {
  language: Language;
  className?: string;
}) {
  return (
    <a className={`${className} resume-link`} href={site.resumeHref}>
      <Icon name="document" />
      {language === "es" ? "Ver currículum" : "View résumé"}
    </a>
  );
}
