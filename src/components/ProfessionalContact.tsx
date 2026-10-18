import { useState } from "react";
import type { Language } from "../data/i18n";
import { contactLinks } from "../data/contact";
import { KineticInvitation } from "./KineticInvitation";
import { LocationGlobe } from "./LocationGlobe";
import { Icon } from "./Icons";
import { ResumeLink } from "./ResumeLink";

function ProfessionalContact({ language }: { language: Language }) {
  const es = language === "es";
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactLinks.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }
  return (
    <section
      id="contacto"
      className="section-wrap professional-contact"
      data-contact="professional"
      aria-label={es ? "Hablemos" : "Let’s talk"}
    >
      <div className="contact-composition">
        <div className="contact-editorial">
          <KineticInvitation language={language} />
          <p className="contact-support">
            {es
              ? "Disponible para trabajar y colaborar en nuevos proyectos. Escríbeme y conversemos."
              : "Available for work and new collaborations. Get in touch."}
          </p>
          <div className="contact-address">
            <a className="contact-email" href={`mailto:${contactLinks.email}`}>
              <Icon name="mail" />
              {contactLinks.email}
              <Icon name="arrow" />
            </a>
            <button
              className="copy-email"
              type="button"
              onClick={copyEmail}
              aria-label={
                es ? "Copiar dirección de correo" : "Copy email address"
              }
            >
              <Icon name={copyState === "copied" ? "check" : "copy"} />
              {es ? "Copiar correo" : "Copy email"}
            </button>
          </div>
          <div className="contact-channels contact-links">
            <a
              className="social-link"
              href={contactLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="github" />
              GitHub
              <Icon name="arrow" />
            </a>
            <a
              className="social-link"
              href={contactLinks.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="linkedin" />
              LinkedIn
              <Icon name="arrow" />
            </a>
            <ResumeLink language={language} className="social-link" />
          </div>
          <p className="copy-status" role="status" aria-live="polite">
            {copyState === "copied"
              ? es
                ? "Correo copiado al portapapeles."
                : "Email copied to clipboard."
              : copyState === "failed"
                ? es
                  ? "No se pudo copiar. Puedes seleccionar el correo o abrir tu aplicación de correo."
                  : "Could not copy. You can select the address or open your email app."
                : ""}
          </p>
        </div>
        <div className="contact-location">
          <LocationGlobe />
          <p className="contact-location-note">
            {es
              ? "Con base en Morelia. Abierto a nuevas colaboraciones."
              : "Based in Morelia. Open to new collaborations."}
          </p>
          <span className="contact-location-signature">TM · tonymed.dev</span>
        </div>
      </div>
    </section>
  );
}
export function Contact({ language }: { language: Language }) {
  return <ProfessionalContact language={language} />;
}
