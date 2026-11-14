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
  if (!site.resumeHref) return null;
  return (
    <a className={`${className} resume-link`} href={site.resumeHref} target="_blank" rel="noreferrer">
      <Icon name="document" />
      {language === "es" ? "Ver CV" : "View résumé"}
    </a>
  );
}
