import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { Language } from "../data/i18n";
import { principles } from "../data/principles";
import { read } from "../data/experience";
import { AboutIcon } from "./AboutIcon";

type Principle = (typeof principles)[number];
function PrincipleBlock({ item, language, index }: { item: Principle; language: Language; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.66"], trackContentSize: true });
  const delay = index * .06;
  const iconOpacity = useTransform(scrollYProgress, [delay, delay + .25], [0, 1]);
  const iconTransform = useTransform(scrollYProgress, [delay, delay + .25], ["translateY(10px)", "translateY(0px)"]);
  const nameOpacity = useTransform(scrollYProgress, [delay + .08, delay + .38], [.15, 1]);
  const nameTransform = useTransform(scrollYProgress, [delay + .08, delay + .38], ["translateY(8px)", "translateY(0px)"]);
  const descriptionOpacity = useTransform(scrollYProgress, [delay + .16, delay + .55], [.15, 1]);
  const descriptionTransform = useTransform(scrollYProgress, [delay + .16, delay + .55], ["translateY(6px)", "translateY(0px)"]);
  const still = { opacity: 1, transform: "none" };
  return (
    <article ref={ref} className="about-principle" aria-labelledby={`principle-${item.id}`}>
      <motion.div className="about-principle-icon" style={reduced ? still : { opacity: iconOpacity, transform: iconTransform }}><AboutIcon name={item.id as "curiosity" | "purpose" | "precision"} /></motion.div>
      <motion.h3 id={`principle-${item.id}`} style={reduced ? still : { opacity: nameOpacity, transform: nameTransform }}>{read(item.name, language)}</motion.h3>
      <motion.p style={reduced ? still : { opacity: descriptionOpacity, transform: descriptionTransform }}>{read(item.description, language)}</motion.p>
    </article>
  );
}
export function Principles({ language }: { language: Language }) {
  return <div className="about-principles" role="group" aria-label={language === "es" ? "Mis principios" : "My principles"}>
    {principles.map((item, index) => <PrincipleBlock key={`${item.id}-${language}`} item={item} language={language} index={index} />)}
  </div>;
}
