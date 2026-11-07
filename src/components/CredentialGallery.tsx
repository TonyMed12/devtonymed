import { useState, type ReactNode } from "react";
import { LayoutGroup, motion } from "motion/react";
import type { Language } from "../data/i18n";
import { credentialGallery, read } from "../data/experience";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useCurrentDate } from "../hooks/useCurrentDate";
import { gciPeriodPercent } from "../data/gciPeriod";
import { secureSoftwareTopics } from "../data/secureSoftware";
import { DetailDialog } from "./DetailDialog";
import { GciCalendar } from "./GciCalendar";
import { Icon } from "./Icons";
import { CredentialReveal } from "./CredentialReveal";
import { CountUp } from "./CountUp";
import { CardSpotlight } from "./CardSpotlight";
import { useCardSpotlight } from "../hooks/useCardSpotlight";


function CredentialButton({ children, className, selected, dialogId, onClick }: {
  children: ReactNode; className: string; selected: boolean; dialogId?: string; onClick: () => void;
}) {
  const ref = useCardSpotlight<HTMLButtonElement>(!selected);
  return <motion.button ref={ref} type="button" className={className} aria-haspopup="dialog" aria-expanded={selected} aria-controls={dialogId} onClick={onClick}>
    {children}<CardSpotlight />
  </motion.button>;
}

export function CredentialGallery({
  language,
  onLanguageChange,
}: {
  language: Language;
  onLanguageChange: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = credentialGallery.find((item) => item.id === selectedId);
  const reduced = useReducedMotion(),
    now = useCurrentDate();
  const percent = gciPeriodPercent(now);
  const es = language === "es";
  const origin = selected ? `credential-${selected.id}` : undefined;
  return (
    <LayoutGroup id="credentials">
      <div className="credential-grid">
        {credentialGallery.map((item, index) => (
          <CredentialReveal key={item.id} index={index}>
            <CredentialButton
              className={`credential-card credential-${item.id}`}
              selected={selectedId === item.id}
              dialogId={
                selectedId === item.id
                  ? `credential-${item.id}-dialog`
                  : undefined
              }
              onClick={() => setSelectedId(item.id)}
            >
              <motion.span className="credential-top">
                <span className="issuer-mark" aria-hidden="true">
                  <motion.img
                    layoutId={reduced ? undefined : `credential-${item.id}-logo`}
                    src={item.logo}
                    alt=""
                    loading="lazy"
                  />
                </span>
                <span className="course-status">
                  {read(item.status, language)}
                </span>
              </motion.span>
              <motion.strong

                layoutId={reduced ? undefined : `credential-${item.id}-title`}
              >
                {read(item.title, language)}
              </motion.strong>
              <motion.span className="credential-issuer">
                {item.format && <>{read(item.format, language)} · </>}
                {item.issuer}
              </motion.span>
              {item.credits && (
                <motion.span className="credential-credits">{item.credits}</motion.span>
              )}
              {item.id === "gci" && (
                <motion.span className="gci-period-preview">
                  <span className="gci-period-dates">
                    {es ? "Agosto–diciembre de 2026" : "August–December 2026"}
                  </span>
                  <span className="gci-period-label">
                    {es ? "Periodo transcurrido" : "Elapsed period"} · <CountUp to={percent} /> %
                  </span>
                  <span className="gci-period-bar" aria-hidden="true">
                    <span style={{ width: `${percent}%` }} />
                  </span>
                </motion.span>
              )}
              <motion.span className="credential-open">
                {es ? "Ver credencial" : "View credential"}
                <Icon name="arrow" />
              </motion.span>
            </CredentialButton>
          </CredentialReveal>
        ))}
      </div>
      {selected && (
        <DetailDialog
          id={`credential-${selected.id}-dialog`}
          className="credential-dialog"
          title={read(selected.title, language)}
          origin={origin}
          language={language}
          onLanguageChange={onLanguageChange}
          onClose={() => setSelectedId(null)}
          header={
            <motion.img
              className="credential-dialog-logo"
              layoutId={reduced ? undefined : `${origin}-logo`}
              src={selected.logo}
              alt={selected.issuer}
            />
          }
        >
          <p className="dialog-context">{selected.issuer}</p>
          <div className="credential-dialog-meta">
            <span>{read(selected.status, language)}</span>
            {selected.format && (
              <span className="credential-format">
                {read(selected.format, language)} · {selected.credits}
              </span>
            )}
          </div>
          <p>{read(selected.description, language)}</p>
          {selected.id === "upv" && (
            <ol className="secure-topics">
              {secureSoftwareTopics.map((topic, index) => (
                <li key={index}>
                  <span aria-hidden="true">
                    {index + 1}
                  </span>
                  {read(topic, language)}
                </li>
              ))}
            </ol>
          )}
          {selected.id === "gci" && (
            <GciCalendar language={language} now={now} />
          )}
          {selected.credentialId && (
            <p className="credential-evidence">
              <strong>{es ? "ID de credencial" : "Credential ID"}</strong>
              <span>{selected.credentialId}</span>
            </p>
          )}
          {selected.url && (
            <a
              className="text-link credential-source"
              href={selected.url}
              target="_blank"
              rel="noreferrer"
            >
              {es ? "Consultar programa oficial" : "View official program"} ↗
            </a>
          )}
          {selected.id === "upv" && (
            <a
              className="text-link credential-source"
              href="https://www.cfp.upv.es/formacion-permanente/curso/desarrollo-software-seguro_102257.html"
              target="_blank"
              rel="noreferrer"
            >
              {es
                ? "Programa de la microcredencial"
                : "Microcredential syllabus"}{" "}
              ↗
            </a>
          )}
        </DetailDialog>
      )}
    </LayoutGroup>
  );
}
