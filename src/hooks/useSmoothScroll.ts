import { useEffect } from "react";
import Lenis from "lenis";
import { frame, cancelFrame } from "motion";
import { useReducedMotion } from "./useReducedMotion";
import "lenis/dist/lenis.css";

// A single root scroller. Native horizontal tracks, touch and modal scrolling
// are deliberately left to the browser. Motion owns the animation clock.
export function useSmoothScroll() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.14,
      syncTouch: false,
      smoothWheel: true,
      anchors: false,
      prevent: (node) => !!node.closest("[data-lenis-prevent]"),
    });
    const tick = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    let wasLocked: boolean | undefined;
    const sync = () => {
      const locked =
        !!document.querySelector("dialog[open],.brand-welcome") || document.hidden;
      if (locked === wasLocked) return;
      wasLocked = locked;
      if (locked) {
        lenis.stop();
        cancelFrame(tick);
      } else {
        lenis.start();
        frame.update(tick, true);
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    document.addEventListener("visibilitychange", sync);
    // Keyboard navigation stays native; discard any pending wheel inertia first.
    const keyboard = (event: KeyboardEvent) => {
      if (
        [
          "Tab",
          "ArrowDown",
          "ArrowUp",
          "PageDown",
          "PageUp",
          "Home",
          "End",
          " ",
        ].includes(event.key)
      )
        lenis.scrollTo(window.scrollY, { immediate: true });
    };
    document.addEventListener("keydown", keyboard);
    const anchor = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      );
      if (!link || link.target === "_blank" || link.hasAttribute("download"))
        return;
      const url = new URL(link.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search ||
        !url.hash
      )
        return;
      let target: HTMLElement | null;
      try {
        target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch {
        return;
      }
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      const track = target.closest<HTMLElement>(".carousel-track");
      if (track && track !== target) {
        const first = track.firstElementChild as HTMLElement;
        track.scrollTo({
          left: target.offsetLeft - first.offsetLeft,
          behavior: "instant",
        });
      }
      const focus = () => {
        const temporary =
          !target!.hasAttribute("tabindex") &&
          !target!.matches("a,button,input,select,textarea");
        if (temporary) target!.setAttribute("tabindex", "-1");
        target!.focus({ preventScroll: true });
        if (temporary)
          target!.addEventListener(
            "blur",
            () => target!.removeAttribute("tabindex"),
            { once: true },
          );
      };
      lenis.scrollTo(target, { onComplete: focus });
    };
    document.addEventListener("click", anchor);
    sync();
    return () => {
      observer.disconnect();
      cancelFrame(tick);
      lenis.destroy();
      document.removeEventListener("visibilitychange", sync);
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("click", anchor);
    };
  }, [reduced]);
}
