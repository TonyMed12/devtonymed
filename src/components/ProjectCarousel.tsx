import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import type { Language } from "../data/i18n";
import { projects } from "../data/portfolio";
import { projectStories, read } from "../data/experience";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { usePageVisible } from "../hooks/usePageVisible";
import { useModalOpen } from "../hooks/useModalOpen";
import { useProjectAutoplay } from "../hooks/useProjectAutoplay";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ProjectCard } from "./ProjectCard";
import { Icon } from "./Icons";
import { ProjectCarouselSlot } from "./ProjectCarouselSlot";
import { ProjectPresentationDecor } from "./ProjectPresentationDecor";
import { ProjectPresentationName } from "./ProjectPresentationName";
import "./ProjectCarousel.css";

const items = projects;
const count = items.length;
const wrap = (value: number) => ((value % count) + count) % count;
const spring = { type: "spring" as const, stiffness: 180, damping: 30, mass: 1 };

export function ProjectCarousel({ language, onLanguageChange }: { language: Language; onLanguageChange: () => void }) {
  // Absolute positions keep their keys as the window moves. Only invisible end
  // slots are recycled, so crossing the last/first project never resets a track.
  const [position, setPosition] = useState(0);
  const positionRef = useRef(0);
  const [reset, setReset] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [immediate, setImmediate] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [size, setSize] = useState({ width: 620, height: 640 });
  const host = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const gesture = useRef({ down: false, pointer: -1, x: 0, y: 0, started: 0, moved: false });
  const suppressClick = useRef(false);
  const dragX = useMotionValue(0);
  const dragTransform = useTransform(dragX, value => `translateX(${value}px)`);
  const reduced = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 760px)");
  const pageVisible = usePageVisible();
  const modalOpen = useModalOpen();
  const inView = useInView(host, { amount: 0.15 });
  const entered = useInView(host, { amount: 0.15, once: true });
  const id = useId();
  const es = language === "es";
  const active = wrap(position);
  const suspended = reduced || !inView || !pageVisible || modalOpen;
  const paused = reduced || stopped || hovered || focused || dragging || modalOpen || !inView || !pageVisible;
  useEffect(() => {
    setSceneReady(false);
    if (!entered || suspended) return;
    const timer = window.setTimeout(() => setSceneReady(true), 1050);
    return () => window.clearTimeout(timer);
  }, [entered, position, suspended]);
  const go = useCallback((next: number, manual = true, instantly = false) => {
    positionRef.current = next;
    setImmediate(instantly);
    setPosition(next);
    if (manual) setReset(value => value + 1);
  }, []);
  const progress = useProjectAutoplay(() => go(positionRef.current + 1, false), paused, `${position}:${reset}`);
  const countdown = useTransform(progress, value => `scaleX(${1 - value})`);
  const choose = (index: number, instantly = false) => {
    let delta = wrap(index - wrap(positionRef.current));
    if (delta > count / 2) delta -= count;
    go(positionRef.current + delta, true, instantly);
  };
  useEffect(() => {
    // Preserve existing links from Technologies and direct project bookmarks.
    const selectHash = (hash: string) => {
      let name: string;
      try { name = decodeURIComponent(hash.slice(1)); } catch { return; }
      const index = items.findIndex(item => item.id === name);
      if (index < 0) return;
      let delta = wrap(index - wrap(positionRef.current));
      if (delta > count / 2) delta -= count;
      go(positionRef.current + delta, true, true);
    };
    const locationChanged = () => selectHash(location.hash);
    const linkClicked = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search) selectHash(url.hash);
    };
    locationChanged();
    document.addEventListener("click", linkClicked, true);
    window.addEventListener("hashchange", locationChanged);
    window.addEventListener("popstate", locationChanged);
    return () => {
      document.removeEventListener("click", linkClicked, true);
      window.removeEventListener("hashchange", locationChanged);
      window.removeEventListener("popstate", locationChanged);
    };
  }, [go]);
  useLayoutEffect(() => {
    const element = stage.current;
    if (!element) return;
    const measure = () => {
      const cards = [...element.querySelectorAll<HTMLElement>(".project-card")];
      const width = element.querySelector<HTMLElement>(".coverflow-slot")?.offsetWidth || 620;
      const height = Math.max(...cards.map(card => card.offsetHeight), 1);
      setSize(previous => previous.width === width && previous.height === height ? previous : { width, height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    element.querySelectorAll(".project-card").forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [position, language]);
  useEffect(() => {
    if (!inView || !pageVisible || modalOpen || reduced) {
      gesture.current.down = false;
      setDragging(false);
      dragX.set(0);
    }
  }, [inView, pageVisible, modalOpen, reduced, dragX]);
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if ((event.target as Element).closest("dialog")) return;
    const next = event.key === "ArrowRight" ? positionRef.current + 1
      : event.key === "ArrowLeft" ? positionRef.current - 1
      : event.key === "Home" ? positionRef.current - wrap(positionRef.current)
      : event.key === "End" ? positionRef.current + count - 1 - wrap(positionRef.current) : undefined;
    if (next === undefined) return;
    event.preventDefault();
    // Move focus out of a card before making its controls inert.
    if ((event.target as Element).closest(".coverflow-slot")) host.current?.focus({ preventScroll: true });
    go(next, true, true);
  }
  function release(pointer: number, x: number, cancelled = false) {
    const current = gesture.current;
    if (!current.down || current.pointer !== pointer) return;
    current.down = false;
    setDragging(false);
    setReset(value => value + 1);
    const delta = x - current.x;
    const velocity = Math.abs(delta) / Math.max(performance.now() - current.started, 1);
    if (current.moved && !cancelled && (Math.abs(delta) > Math.min(90, size.width * .18) || velocity > .45)) {
      go(positionRef.current + (delta < 0 ? 1 : -1));
    }
    animate(dragX, 0, reduced ? { duration: 0 } : spring);
  }
  return (
    <div ref={host} className="project-carousel coverflow-carousel" role="region" tabIndex={0}
      aria-roledescription={es ? "carrusel" : "carousel"}
      aria-label={es ? "Proyectos seleccionados. Usa las flechas para navegar." : "Selected projects. Use arrow keys to navigate."}
      data-autoplay={paused ? "paused" : "running"} data-active-index={active}
      data-reduced={reduced} data-floating={!paused && sceneReady} data-ambient={!paused && sceneReady}
      data-presentation-running={!suspended} data-instant={immediate} data-phase={suspended ? "suspended" : !sceneReady ? "entrance" : paused ? "reading" : "ambient"} onKeyDown={keyboard}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="carousel-toolbar">
        <p aria-live={paused ? "polite" : "off"} aria-atomic="true"><span key={active} className="carousel-count">{active + 1}</span> <span>/ {count}</span><ProjectPresentationName id={items[active].id} title={read(projectStories[items[active].id].title, language)} instant={reduced || immediate || suspended} /></p>
        <div>
          {!reduced && <button type="button" className="carousel-play" onClick={() => { setStopped(!stopped); setReset(value => value + 1); }} aria-pressed={stopped}
            aria-label={stopped ? (es ? "Activar avance automático" : "Enable autoplay") : (es ? "Pausar avance automático" : "Pause autoplay")}>
            <svg viewBox="0 0 24 24" className="icon" aria-hidden="true" fill="currentColor">{stopped ? <path d="m8 5 11 7-11 7Z" /> : <path d="M6 5h4v14H6zm8 0h4v14h-4z" />}</svg>
          </button>}
          <button type="button" className="carousel-previous" onClick={event => go(positionRef.current - 1, true, event.detail === 0)} aria-label={es ? "Proyecto anterior" : "Previous project"} aria-controls={id}><Icon name="arrow" /></button>
          <button type="button" className="carousel-next" onClick={event => go(positionRef.current + 1, true, event.detail === 0)} aria-label={es ? "Proyecto siguiente" : "Next project"} aria-controls={id}><Icon name="arrow" /></button>
        </div>
      </div>
      {!reduced && <div className="carousel-countdown" aria-hidden="true" data-paused={paused}>
        <span>{paused ? (es ? "En pausa" : "Paused") : (es ? "Siguiente proyecto" : "Next project")}</span>
        <span className="carousel-countdown-track"><motion.span style={{ transform: countdown }} /></span>
        <span>6 s</span>
      </div>}
      <div ref={stage} id={id} className="coverflow-stage" style={{ height: size.height + (mobile ? 48 : 72) }} data-dragging={dragging}
        onPointerDown={event => {
          if (!event.isPrimary || event.button !== 0 || gesture.current.down) return;
          suppressClick.current = false;
          if ((event.target as Element).closest("a,button,dialog")) return;
          dragX.stop();
          gesture.current = { down: true, pointer: event.pointerId, x: event.clientX, y: event.clientY, started: performance.now(), moved: false };
          setDragging(true);
        }}
        onPointerMove={event => {
          const current = gesture.current;
          if (!current.down || current.pointer !== event.pointerId) return;
          const dx = event.clientX - current.x, dy = event.clientY - current.y;
          if (!current.moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.2) {
            current.moved = true; suppressClick.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          if (current.moved) { event.preventDefault(); dragX.set(Math.max(-size.width * .42, Math.min(size.width * .42, dx * .45))); }
        }}
        onPointerUp={event => release(event.pointerId, event.clientX)}
        onPointerCancel={event => release(event.pointerId, event.clientX, true)}
        onLostPointerCapture={event => {
          // Touch starts with implicit capture on the image. Its release while
          // transferring capture to the stage is not a cancelled gesture.
          if (event.target === event.currentTarget) release(event.pointerId, event.clientX, true);
        }}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        <ProjectPresentationDecor />
        <motion.div className="coverflow-drag-plane" style={{ transform: dragTransform }}>
          {/* Fewer than five projects would repeat a card at offsets ±2 (duplicate ids); those slots are invisible anyway. */}
          {(count >= 5 ? [-2, -1, 0, 1, 2] : [-1, 0, 1]).map(offset => {
            const absolute = position + offset;
            const index = wrap(absolute);
            const project = items[index];
            const side = Math.sign(offset);
            const distance = offset * size.width * (mobile ? .94 : .69);
            const depth = Math.abs(offset) * (mobile ? -24 : -100);
            const tilt = -side * (mobile ? 4 : 14);
            const scale = offset === 0 ? 1 : mobile ? .93 : .82;
            const transform = `translateX(calc(-50% + ${distance}px)) translateY(${offset === 0 ? 0 : mobile ? 12 : 24}px) translateZ(${depth}px) rotateY(${tilt}deg) rotateZ(${side * (mobile ? .4 : 1.3)}deg) scale(${scale})`;
            const hidden = Math.abs(offset) > 1;
            return (
              <ProjectCarouselSlot key={absolute} offset={offset} projectId={project.id} transform={transform}
                opacity={hidden ? 0 : offset === 0 ? 1 : .78} width={size.width} entered={entered} suspended={suspended}
                immediate={immediate} reduced={reduced} onSelect={() => go(absolute)}>
                <ProjectCard project={project} language={language} index={index} active={offset === 0}
                  motionEnabled={!suspended && !dragging} onLanguageChange={onLanguageChange} />
              </ProjectCarouselSlot>
            );
          })}
        </motion.div>
      </div>
      <div className="carousel-dots" role="group" aria-label={es ? "Elegir proyecto" : "Choose project"}>
        {items.map((item, index) => <button key={item.id} type="button" aria-label={`${es ? "Ir a" : "Go to"} ${read(projectStories[item.id].title, language)}`}
          aria-pressed={active === index} aria-controls={id} onClick={event => choose(index, event.detail === 0)}><span /></button>)}
      </div>
    </div>
  );
}
