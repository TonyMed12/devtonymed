import { useRef } from "react";
import { motion, useAnimationFrame, useInView, useMotionValue, useTransform } from "motion/react";
import type { Language } from "../data/i18n";
import { useReducedMotion } from "../hooks/useReducedMotion";

const ITEMS: Record<Language, string[]> = {
  es: ["¿Tienes una idea?", "Hagámosla realidad"],
  en: ["Have an idea?", "Let’s bring it to life"],
};
const COPIES = [0, 1, 2, 3, 4, 5];
// One copy is this share of the track, so wrapping the offset at SHARE loops seamlessly.
const SHARE = 100 / COPIES.length;

function Track({ items }: { items: string[] }) {
  return (
    <>
      {COPIES.map((copy) => (
        <div className="contact-band-unit" key={copy}>
          {items.map((text) => (
            <span key={text}>{text}<i>✦</i></span>
          ))}
        </div>
      ))}
    </>
  );
}

// Static band for reduced motion: same look, no movement and no frame loop.
function StaticBand({ items, className }: { items: string[]; className: string }) {
  return (
    <div className={`contact-band ${className}`}>
      <div className="contact-band-track"><Track items={items} /></div>
    </div>
  );
}

// Marquee band driven by Motion at a constant speed; it only advances while visible.
function MovingBand({ items, className, direction, speed }: { items: string[]; className: string; direction: 1 | -1; speed: number }) {
  const host = useRef<HTMLDivElement>(null);
  const visible = useInView(host);
  const progress = useMotionValue(0);
  const x = useTransform(progress, (value) => `${direction === 1 ? -(value % SHARE) : (value % SHARE) - SHARE}%`);
  useAnimationFrame((_, delta) => {
    if (visible) progress.set(progress.get() + speed * (Math.min(delta, 50) / 1000));
  });
  return (
    <div ref={host} className={`contact-band ${className}`}>
      <motion.div className="contact-band-track" style={{ x }}><Track items={items} /></motion.div>
    </div>
  );
}

// Decorative ribbons that separate the contact card from the previous section.
export function ContactRibbons({ language }: { language: Language }) {
  const reduced = useReducedMotion();
  const items = ITEMS[language];
  return (
    <div className="contact-ribbons" aria-hidden="true">
      {reduced ? (
        <>
          <StaticBand items={items} className="contact-band--back" />
          <StaticBand items={items} className="contact-band--front" />
        </>
      ) : (
        <>
          <MovingBand items={items} className="contact-band--back" direction={-1} speed={0.7} />
          <MovingBand items={items} className="contact-band--front" direction={1} speed={1.1} />
        </>
      )}
    </div>
  );
}
