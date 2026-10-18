// Adapted from ScrollRevealText, created by AliThemes.com, Framer Limited license.
// Retains the credited word/color idea; natural text flow, no blur or opacity mask.
import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

function Word({ text, progress, index, count }: { text: string; progress: MotionValue<number>; index: number; count: number }) {
  const start = (index / count) * .75;
  const color = useTransform(progress, value => {
    const amount = Math.max(0, Math.min(1, (value - start) / .25)) * 100;
    return `color-mix(in srgb, var(--ink) ${amount}%, var(--muted))`;
  });
  return <motion.span className="about-word" style={{ color }}>{text}</motion.span>;
}
export function ScrollRevealText({ text, emphasis = "" }: { text: string; emphasis?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  // All targets use native document scroll; the existing Lenis clock stays shared.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.84", "end 0.62"], trackContentSize: true });
  const emphasisTransform = useTransform(scrollYProgress, [0, 1], ["translateY(5px)", "translateY(0px)"]);
  const { groups, count } = useMemo(() => {
    const start = emphasis ? text.indexOf(emphasis) : -1;
    const pieces = start < 0 ? [{ text, highlighted: false }] : [
      { text: text.slice(0, start), highlighted: false },
      { text: emphasis, highlighted: true },
      { text: text.slice(start + emphasis.length), highlighted: false },
    ];
    let index = 0;
    const groups = pieces.map(piece => ({ ...piece, tokens: piece.text.split(/(\s+)/).filter(Boolean).map(token => ({ text: token, index: /^\s+$/.test(token) ? -1 : index++ })) }));
    return { groups, count: index };
  }, [text, emphasis]);
  return <p ref={ref} className="scroll-reveal-text about-lead" data-static={reduced}>
    {reduced ? text : groups.map((group, i) => {
      const words = group.tokens.map(token => token.index < 0 ? token.text : <Word key={`${token.index}-${token.text}`} text={token.text} progress={scrollYProgress} index={token.index} count={count} />);
      return group.highlighted
        ? <motion.span className="about-emphasis" key={i} style={{ transform: emphasisTransform }}>{words}</motion.span>
        : <span key={i}>{words}</span>;
    })}
  </p>;
}
