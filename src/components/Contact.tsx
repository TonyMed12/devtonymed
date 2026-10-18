import { useReducedMotion } from "../hooks/useReducedMotion";
import { contactLinks } from "../data/contact";
import { useState } from "react";
import { motion } from "motion/react";
import type { Language } from "../data/i18n";
import { Icon } from "./Icons";
import { Reveal } from "./Reveal";
import { ResumeLink } from "./ResumeLink";

export function Contact({ language }: { language: Language }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const reduced = useReducedMotion();
  const es = language === "es";
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactLinks.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }
  return (
    <section id="contacto" className="section-wrap contact contact-section">
      <Reveal className="contact-card">
        <div className="contact-brand" aria-hidden="true">
          <span className="brand-mark">
            t<span>m</span>.
          </span>
          <span>{es ? "IDEA → CÓDIGO" : "IDEA → CODE"}</span>
        </div>
        <p className="availability">
          <i />
          {es
            ? "Disponible para trabajar y colaborar"
            : "Available for work and collaboration"}
        </p>
        <h2>
          {es ? "Construyamos" : "Let’s build"}
          <br />
          <em>{es ? "lo que sigue." : "what comes next."}</em>
        </h2>
        <p>
          {es
            ? "Estoy disponible para colaborar en proyectos de software y nuevas oportunidades profesionales. Cuéntame qué necesitas y conversemos sobre cómo puedo aportar."
            : "I am available to collaborate on software projects and new professional opportunities. Tell me what you need and let’s talk about how I can contribute."}
        </p>
        <div className="contact-links">
          <motion.a
            className="button button-primary"
            href={`mailto:${contactLinks.email}`}
            whileHover={reduced ? undefined : { y: -3 }}
          >
            <Icon name="mail" />
            {contactLinks.email}
            <Icon name="arrow" />
          </motion.a>
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
          <a
            className="social-link"
            href={contactLinks.github}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" />
            GitHub <Icon name="arrow" />
          </a>
          <a
            className="social-link"
            href={contactLinks.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="linkedin" />
            LinkedIn <Icon name="arrow" />
          </a>
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
        <ResumeLink language={language} className="social-link" />
        <span className="contact-signature">
          {es
            ? "De la idea al código. Contigo."
            : "From idea to code. With you."}
        </span>
      </Reveal>
    </section>
  );
}
