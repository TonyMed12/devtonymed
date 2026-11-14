// Adaptation of 3D Flip Card by Can Girgin, Framer Limited license.
// Source: FlipCard-5rQ9.js@Bfm4iXxehEahJxoOelkH.
import { useId, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Language } from "../data/i18n";
import { contactLinks } from "../data/contact";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { Contact as ClassicContact } from "./Contact";
import { Icon } from "./Icons";
import { ResumeLink } from "./ResumeLink";

function FlipContact({ language }: { language: Language }) {
  const [flipped, setFlipped] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const reduced = useReducedMotion();
  const es = language === "es";
  const frontButton = useRef<HTMLButtonElement>(null);
  const backHeading = useRef<HTMLHeadingElement>(null);
  const previous = useRef(false);
  const id = useId();
  useLayoutEffect(() => {
    if (previous.current === flipped) return;
    previous.current = flipped;
    (flipped ? backHeading.current : frontButton.current)?.focus({
      preventScroll: true,
    });
  }, [flipped]);
  const transition = {
    duration: reduced ? 0.16 : 0.6,
    ease: "easeInOut" as const,
  };
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
      className="section-wrap contact contact-section"
      data-contact="flip"
    >
      <div
        className="contact-flip"
        data-flipped={flipped}
        data-reduced={reduced}
        onKeyDown={(event) => {
          if (flipped && event.key === "Escape") {
            event.preventDefault();
            setFlipped(false);
          }
        }}
      >
        <motion.div
          className="contact-card flip-face flip-front"
          data-active={!flipped}
          aria-hidden={flipped || undefined}
          inert={flipped || undefined}
          initial={false}
          animate={
            reduced
              ? { rotateY: 0, opacity: flipped ? 0 : 1 }
              : { rotateY: flipped ? -180 : 0, opacity: 1 }
          }
          transition={transition}
          onClick={(event) => {
            if (!(event.target as Element).closest("a,button"))
              setFlipped(true);
          }}
        >
          <div className="contact-brand" aria-hidden="true">
            <span className="brand-mark">
              t<span>m</span>.
            </span>
            <span>tonymed.dev</span>
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
              ? "Una idea, un proyecto o una oportunidad. Cuéntame qué necesitas y conversemos sobre cómo puedo aportar."
              : "An idea, a project or an opportunity. Tell me what you need and let’s talk about how I can contribute."}
          </p>
          <button
            ref={frontButton}
            type="button"
            className="button button-primary flip-open"
            aria-expanded={flipped}
            aria-controls={`${id}-back`}
            onClick={() => setFlipped(true)}
          >
            {es ? "Girar para ver contacto" : "Flip for contact details"}
            <span aria-hidden="true">↻</span>
          </button>
          <span className="contact-signature">
            {es
              ? "De la idea al código. Contigo."
              : "From idea to code. With you."}
          </span>
        </motion.div>
        <motion.div
          id={`${id}-back`}
          className="contact-card flip-face flip-back"
          data-active={flipped}
          aria-hidden={!flipped || undefined}
          inert={!flipped || undefined}
          initial={false}
          animate={
            reduced
              ? { rotateY: 0, opacity: flipped ? 1 : 0 }
              : { rotateY: flipped ? 0 : 180, opacity: 1 }
          }
          transition={transition}
        >
          <div className="flip-back-heading">
            <h3 ref={backHeading} tabIndex={-1}>
              {es ? "Hablemos." : "Let’s talk."}
            </h3>
            <button
              className="flip-return social-link"
              type="button"
              onClick={() => setFlipped(false)}
            >
              <span aria-hidden="true">↶</span>
              {es ? "Volver" : "Back"}
            </button>
          </div>
          <p className="eyebrow">
            {es ? "UN PRIMER MENSAJE" : "A FIRST MESSAGE"}
          </p>
          <a className="contact-email" href={`mailto:${contactLinks.email}`}>
            {contactLinks.email}
            <Icon name="arrow" />
          </a>
          <div className="contact-links">
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
          <span className="contact-signature">TM · Full-Stack Developer</span>
        </motion.div>
      </div>
    </section>
  );
}
export function Contact({ language }: { language: Language }) {
  return new URLSearchParams(window.location.search).get("contact") ===
    "classic" ? (
    <ClassicContact language={language} />
  ) : (
    <FlipContact language={language} />
  );
}
