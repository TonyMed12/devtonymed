import { useLayoutEffect, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { site } from "../data/site";

// Full page mounts replay the welcome; locale and navigation never remount it.
export function Welcome({ onComplete }: { onComplete?: () => void }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  useLayoutEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const overflow = html.style.overflow;
    html.dataset.welcome = "true";
    html.style.overflow = "hidden";
    const dismiss = () => setVisible(false);
    const timer = window.setTimeout(dismiss, 1450);
    document.addEventListener("keydown", dismiss, {
      once: true,
      capture: true,
    });
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", dismiss, true);
      html.style.overflow = overflow;
      delete html.dataset.welcome;
    };
  }, [visible]);
  useLayoutEffect(() => {
    if (!visible) onComplete?.();
  }, [visible, onComplete]);
  if (!visible) return null;
  return (
    <div
      className="brand-welcome"
      data-reduced={reduced}
      aria-hidden="true"
      onAnimationEnd={() => setVisible(false)}
      onPointerDown={() => setVisible(false)}
    >
      <span className="brand-mark">
        t<span>m</span>.
      </span>
      <div>
        <strong className="welcome-domain">{site.signature}</strong>
        <span className="welcome-greeting">
          <span lang="es">Bienvenido</span>
          <span aria-hidden="true"> / </span>
          <span lang="en">Welcome</span>
        </span>
      </div>
    </div>
  );
}
