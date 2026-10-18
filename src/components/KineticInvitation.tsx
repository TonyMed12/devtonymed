// Adapted from Kinetic Typography / Reactive Typography by Orix Studio.
// Exact Framer module: Kinetic-Typography-AmloH2.js@tHy6gRwfgbJ04LktvYNT.
// Retains per-character cursor proximity lift/scale and cached geometry.
// Fixed editorial lines replace its repeated marquee; no Framer runtime.
import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { frame, cancelFrame } from "motion";
import type { Language } from "../data/i18n";
import { motionSystem } from "../data/motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { usePageVisible } from "../hooks/usePageVisible";

export function KineticInvitation({ language }: { language: Language }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const visible = usePageVisible();
  const inView = useInView(ref, { amount: 0.2 });
  const lines = language === "es" ? ["¿Tienes una idea?", "Hagámosla realidad."] : ["Have an idea?", "Let’s bring it to life."];
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const chars = Array.from(host.querySelectorAll<HTMLElement>(".kinetic-character"));
    const reset = () => chars.forEach(char => { char.style.transform = ""; });
    if (reduced || !fine || !visible || !inView) { reset(); return; }
    let cancelled = false, queued = false;
    let pointer = { x: -9999, y: -9999 };
    let offsets: { x: number; y: number; value: number }[] = [];
    function measure() {
      reset();
      const box = host!.getBoundingClientRect();
      offsets = chars.map(char => {
        const r = char.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, value: 0 };
      });
    }
    const tick = () => {
      let settling = false;
      chars.forEach((char, index) => {
        const item = offsets[index];
        if (!item) return;
        const distance = Math.hypot(pointer.x - item.x, pointer.y - item.y);
        const target = Math.max(0, 1 - distance / 110);
        item.value += (target - item.value) * 0.2;
        if (Math.abs(target - item.value) > 0.002) settling = true;
        else item.value = target;
        char.style.transform = item.value ? `translateY(${-item.value * 6}px) scale(${1 + item.value * 0.045})` : "";
      });
      if (!settling) { cancelFrame(tick); queued = false; }
    };
    const request = () => { if (!queued) { queued = true; frame.update(tick, true); } };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const box = host.getBoundingClientRect();
      pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
      request();
    };
    const leave = () => { pointer = { x: -9999, y: -9999 }; request(); };
    const scroll = () => { pointer = { x: -9999, y: -9999 }; cancelFrame(tick); queued = false; offsets.forEach(item => { item.value = 0; }); reset(); };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(host);
    void document.fonts?.ready.then(() => { if (!cancelled) measure(); });
    host.addEventListener("pointermove", move, { passive: true });
    host.addEventListener("pointerenter", measure);
    host.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("blur", leave);
    return () => {
      cancelled = true; cancelFrame(tick); reset(); resize.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", measure);
      host.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("blur", leave);
    };
  }, [language, reduced, fine, visible, inView]);
  return (
    <h2 ref={ref} className="contact-invitation" lang={language} aria-label={lines.join(" ")} data-kinetic="proximity" data-static={reduced}>
      {lines.map((line, index) => (
        <motion.span className="kinetic-line" key={`${language}-${index}`} aria-hidden="true" initial={false}
          whileInView={reduced ? undefined : { transform: ["translateY(12px)", "translateY(0)"], opacity: [0.8, 1] }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.65, delay: index * 0.12, ease: motionSystem.ease }}>
          {line.split(/(\s+)/).map((word, wordIndex) => /\s+/.test(word) ? word : (
            <span className="kinetic-word" key={wordIndex}>{Array.from(word).map((char, charIndex) => <span className="kinetic-character" key={charIndex}>{char}</span>)}</span>
          ))}
        </motion.span>
      ))}
    </h2>
  );
}
