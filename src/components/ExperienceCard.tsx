import type { ReactNode } from "react";
import { AnimatedContent } from "./AnimatedContent";
import "./ExperienceCard.css";

// One entrance on the outer slot; the article retains its independent hover.
export function ExperienceCard({ children, className, slotClassName = "", labelledBy, index = 0 }: {
  children: ReactNode;
  className: string;
  slotClassName?: string;
  labelledBy: string;
  index?: number;
}) {
  return <AnimatedContent className={`experience-reveal ${slotClassName}`} distance={32} delay={(index % 2) * 0.06}>
    <article className={`experience-card ${className}`} aria-labelledby={labelledBy}>{children}</article>
  </AnimatedContent>;
}
export function ExperienceCardPart({ children, className }: { children: ReactNode; className: string }) {
  return <div className={`experience-card-part ${className}`}>{children}</div>;
}
