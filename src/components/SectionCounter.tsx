import { useEffect, useState } from "react";
import type { Language } from "../data/i18n";

// Real sections of the page, in order.
const SECTIONS = ["inicio", "sobre-mi", "proyectos", "tecnologias", "formacion", "contacto"];

// Scroll-spy: the current section is the last one whose top has crossed 40% of the viewport.
function currentIndex() {
  const line = window.innerHeight * 0.4;
  let current = 0;
  SECTIONS.forEach((id, index) => {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top <= line) current = index;
  });
  return current;
}

// Fixed counter at the bottom of the page ("02 / 06"), following the section in view.
export function SectionCounter({ language }: { language: Language }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setActive(currentIndex());
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const pad = (value: number) => String(value).padStart(2, "0");
  return (
    <p className="section-counter" aria-label={language === "es" ? "Sección actual" : "Current section"}>
      {pad(active + 1)} / {pad(SECTIONS.length)}
    </p>
  );
}
