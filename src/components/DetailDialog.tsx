import { useReducedMotion } from "../hooks/useReducedMotion";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { motion, useAnimationControls } from "motion/react";
import type { Language } from "../data/i18n";
import { motionSystem } from "../data/motion";

export function DetailDialog({
  title,
  language,
  children,
  onClose,
  origin,
  onLanguageChange,
  id,
  className = "",
  header,
}: {
  title: string;
  language: Language;
  children: ReactNode;
  onClose: () => void;
  origin?: string;
  onLanguageChange?: () => void;
  id?: string;
  className?: string;
  header?: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  const closing = useRef(false);
  async function close() {
    if (closing.current) return;
    closing.current = true;
    if (!reduced)
      await controls.start({
        opacity: 0,
        transform: "translateY(8px) scale(0.985)",
        transition: { duration: motionSystem.feedback, ease: motionSystem.ease },
      });
    onClose();
  }
  useEffect(() => {
    void controls.start({ opacity: 1, transform: "translateY(0) scale(1)" });
  }, [controls]);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      id={id}
      className={`detail-dialog ${className}`}
      data-lenis-prevent
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        void close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) void close();
      }}
    >
      <motion.div
        className="dialog-content"
        layoutRoot
        initial={reduced ? false : { opacity: 0.6, transform: "translateY(12px) scale(0.97)" }}
        animate={controls}
        transition={{ duration: reduced ? 0 : motionSystem.state, ease: motionSystem.ease }}
      >
        <div className="dialog-toolbar">
          {onLanguageChange && (
            <button
              type="button"
              className="dialog-language"
              onClick={onLanguageChange}
              aria-label={
                language === "es"
                  ? "Cambiar idioma a inglés"
                  : "Switch language to Spanish"
              }
            >
              {language === "es" ? "ES → EN" : "EN → ES"}
            </button>
          )}
          <button
            ref={closeRef}
            type="button"
            className="dialog-close"
            onClick={() => void close()}
          >
            {language === "es" ? "Cerrar ficha" : "Close details"}{" "}
            <span aria-hidden="true">×</span>
          </button>
        </div>
        {header}
        <motion.h2
          id={titleId}
          layoutId={reduced || !origin ? undefined : `${origin}-title`}
        >
          {title}
        </motion.h2>
        {children}
      </motion.div>
    </dialog>
  );
}
