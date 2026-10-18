import { useEffect, useRef, useState } from "react";
import type { Language } from "../data/i18n";
import { useReducedMotion } from "../hooks/useReducedMotion";

const phrases = {
  es: [
    "ideas con propósito.",
    "soluciones con código.",
    "experiencias para la web.",
  ],
  en: [
    "ideas with purpose.",
    "solutions through code.",
    "experiences for the web.",
  ],
};
// The keyed child resets the sequence atomically when language changes.
function Sequence({
  language,
  running,
}: {
  language: Language;
  running: boolean;
}) {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");
  const cursor = useRef({ index: 0, count: 0, deleting: false });
  useEffect(() => {
    if (reduced || !running) return;
    let timer = 0,
      { index, count, deleting } = cursor.current,
      disposed = false;
    const schedule = (delay: number) => {
      timer = window.setTimeout(tick, delay);
    };
    function tick() {
      if (disposed) return;
      if (document.hidden) {
        schedule(300);
        return;
      }
      const phrase = phrases[language][index];
      count += deleting ? -1 : 1;
      setText(phrase.slice(0, count));
      if (!deleting && count === phrase.length) {
        deleting = true;
        schedule(2300);
      } else if (deleting && count === 0) {
        deleting = false;
        index = (index + 1) % phrases[language].length;
        schedule(350);
      } else schedule(deleting ? 34 : 72);
    }
    schedule(250);
    return () => {
      cursor.current = { index, count, deleting };
      disposed = true;
      window.clearTimeout(timer);
    };
  }, [language, reduced, running]);
  return (
    <span className="typewriter-dynamic">
      {reduced ? phrases[language][0] : text}
      <span className="typing-cursor" data-paused={!running} />
    </span>
  );
}
export function Typewriter({
  language,
  running,
}: {
  language: Language;
  running: boolean;
}) {
  const fixed = language === "es" ? "Construyendo" : "Building";
  return (
    <p className="hero-typewriter" data-running={running}>
      <span className="sr-only">
        {fixed} {phrases[language][0]}
      </span>
      <span aria-hidden="true">
        <span className="typewriter-fixed">{fixed}</span>{" "}
        <Sequence key={language} language={language} running={running} />
      </span>
    </p>
  );
}
