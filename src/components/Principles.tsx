import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { Language } from "../data/i18n";
import { principles } from "../data/principles";
import { read } from "../data/experience";
import { useProjectImageTilt } from "../hooks/useProjectImageTilt";
import { AboutIcon } from "./AboutIcon";
import { AnimatedContent } from "./AnimatedContent";

// Pointer tilt for the card body; the outer article keeps its entrance animation.
function TiltBody({ children }: { children: ReactNode }) {
  const tilt = useProjectImageTilt(true);
  return <motion.div ref={tilt.ref} style={{ transform: tilt.transform }}>{children}</motion.div>;
}

export function Principles({ language }: { language: Language }) {
  return <div className="about-principles" role="group" aria-label={language === "es" ? "Mis principios" : "My principles"}>
    {principles.map((item, index) => <AnimatedContent as="article" className="about-principle" key={item.id} delay={index * 0.06} aria-labelledby={`principle-${item.id}`}>
      <TiltBody>
        <div className="about-principle-icon"><AboutIcon name={item.id as "curiosity" | "purpose" | "precision"} /></div>
        <h3 id={`principle-${item.id}`}>{read(item.name, language)}</h3>
        <p>{read(item.description, language)}</p>
      </TiltBody>
    </AnimatedContent>)}
  </div>;
}
