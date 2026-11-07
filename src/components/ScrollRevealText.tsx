// Original Motion implementation. Replaces the former AliThemes/Framer adaptation;
// its historical asset credit remains in ASSET-CREDITS.
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useEntranceReady } from "../hooks/useEntranceReady";

function Word({ text, progress, index, count }: { text: string; progress: MotionValue<number>; index: number; count: number }) {
  const start = index / count * 0.76;
  const opacity = useTransform(progress, [start, start + 0.24], [0.4, 1]);
  const filter = useTransform(progress, [start, start + 0.24], ["blur(2px)", "blur(0px)"]);
  return <motion.span className="about-word" style={{ opacity, filter }}>{text}</motion.span>;
}

function Emphasis({ children, progress, start, end }: { children: ReactNode; progress: MotionValue<number>; start: number; end: number }) {
  const size = useTransform(progress, [start, end], ["0% 100%", "100% 100%"]);
  return <motion.span className="about-emphasis" style={{ backgroundSize: size }}>{children}</motion.span>;
}

export function ScrollRevealText({ text, emphasis = [] }: { text: string; emphasis?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const ready = useEntranceReady();
  const [enhanced, setEnhanced] = useState(false);
  const progress = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.90", "end 0.84"], trackContentSize: true });
  useEffect(() => {
    if (!ready || reduced || !("IntersectionObserver" in window)) return;
    setEnhanced(true);
    // Completed reading stays crisp when the visitor scrolls back.
    let complete = false;
    const update = (value: number) => {
      if (complete) return;
      progress.set(value);
      if (value >= 0.999) complete = true;
    };
    update(scrollYProgress.get());
    const stop = scrollYProgress.on("change", update);
    const revealForSelection = () => { complete = true; progress.set(1); };
    const host = ref.current;
    host?.addEventListener("pointerdown", revealForSelection);
    return () => { stop(); host?.removeEventListener("pointerdown", revealForSelection); };
  }, [ready, reduced, progress, scrollYProgress]);
  const { groups, count } = useMemo(() => {
    const matches = emphasis.map(phrase => ({ phrase, at: text.indexOf(phrase) })).filter(match => match.at >= 0).sort((a, b) => a.at - b.at);
    const pieces: { text: string; highlighted: boolean }[] = [];
    let cursor = 0;
    for (const match of matches) {
      pieces.push({ text: text.slice(cursor, match.at), highlighted: false }, { text: match.phrase, highlighted: true });
      cursor = match.at + match.phrase.length;
    }
    pieces.push({ text: text.slice(cursor), highlighted: false });
    let index = 0;
    const groups = pieces.map(piece => ({ ...piece, tokens: piece.text.split(/(\s+)/).filter(Boolean).map(token => ({ text: token, index: /^\s+$/.test(token) ? -1 : index++ })) }));
    return { groups, count: index };
  }, [text, emphasis]);
  const animated = enhanced && !reduced;
  return <p ref={ref} className="scroll-reveal-text about-lead" data-enhanced={animated}>
    {groups.map((group, i) => {
      const words = group.tokens.map(token => token.index < 0 || !animated ? token.text : <Word key={token.index} text={token.text} progress={progress} index={token.index} count={count} />);
      const indices = group.tokens.filter(token => token.index >= 0).map(token => token.index);
      return group.highlighted
        ? <Emphasis key={i} progress={progress} start={indices[0] / count * 0.76} end={indices.at(-1)! / count * 0.76 + 0.24}>{words}</Emphasis>
        : <span key={i}>{words}</span>;
    })}
  </p>;
}
