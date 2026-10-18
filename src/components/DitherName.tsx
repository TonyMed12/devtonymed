// Adapted from Dither Text Reveal by Nora Salem. Framer Limited license.
// Brief glyph locking over real, continuously readable text; no Framer runtime.
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function DitherName({ text, ready }: { text: string; ready: boolean }) {
  const host = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!ready || reduced || played.current) return;
    played.current = true;
    const glyphs = host.current?.querySelectorAll<HTMLElement>(".dither-glyph");
    if (!glyphs) return;
    const pool = ["░", "▒", "▓", "█"];
    let elapsed = 0;
    const clear = () =>
      glyphs.forEach((glyph) => {
        delete glyph.dataset.glyph;
      });
    const timer = window.setInterval(() => {
      elapsed += 60;
      glyphs.forEach((glyph, index) => {
        if (elapsed < 170 + index * 7)
          glyph.dataset.glyph = pool[(index + elapsed / 60) % pool.length];
        else delete glyph.dataset.glyph;
      });
      if (elapsed >= 450) {
        window.clearInterval(timer);
        clear();
      }
    }, 60);
    return () => {
      window.clearInterval(timer);
      clear();
    };
  }, [ready, reduced]);
  return (
    <span ref={host} className="dither-name">
      {text.split(" ").map((word, wi) => (
        <span key={wi}>
          {wi > 0 && " "}
          <span className="dither-word">
            {Array.from(word).map((char, ci) => (
              <span className="dither-letter" key={ci}>
                {char}
                <i className="dither-glyph" aria-hidden="true" />
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
