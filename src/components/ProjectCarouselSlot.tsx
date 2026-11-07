import { useEffect, useRef, type ReactNode } from "react";
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "motion/react";
import { ProjectPresentationFrame } from "./ProjectPresentationDecor";

const spring = { type: "spring" as const, stiffness: 180, damping: 30, mass: 1 };
// Stack placement and ambient motion retain their own layers. The parent now
// owns the entrance, so slot translations never accumulate with another reveal.
// Playback controls also let us freeze an unfinished transition off screen.
export function ProjectCarouselSlot({ children, offset, projectId, transform, opacity, suspended, immediate, reduced, onSelect }: {
  children: ReactNode; offset: number; projectId: string; transform: string; opacity: number; width: number;
  entered: boolean; suspended: boolean; immediate: boolean; reduced: boolean; onSelect: () => void;
}) {
  const placement = useMotionValue(transform), visibility = useMotionValue(opacity);
  const positionControls = useRef<AnimationPlaybackControls[]>([]);
  const pausedControls = useRef(new Set<AnimationPlaybackControls>());
  useEffect(() => {
    if (reduced || immediate) {
      placement.jump(transform); visibility.jump(opacity);
      positionControls.current = [];
      return;
    }
    const controls: AnimationPlaybackControls[] = [];
    if (placement.get() !== transform) controls.push(animate(placement, transform, spring));
    if (visibility.get() !== opacity) controls.push(animate(visibility, opacity, spring));
    positionControls.current = controls;
    const held = pausedControls.current;
    return () => controls.forEach(control => { control.stop(); held.delete(control); });
  }, [transform, opacity, immediate, reduced, placement, visibility]);
  useEffect(() => {
    for (const control of positionControls.current) {
      if (suspended) { control.pause(); pausedControls.current.add(control); }
      else if (pausedControls.current.delete(control)) control.play();
    }
  }, [suspended, transform, opacity, immediate, reduced]);
  return <motion.div className="coverflow-slot" data-offset={offset} data-project={projectId}
    style={{ transform: placement, opacity: visibility, zIndex: 3 - Math.abs(offset), pointerEvents: Math.abs(offset) > 1 ? "none" : "auto" }}>
    <div className="coverflow-arrival">
      <div className="coverflow-float" data-secondary={offset !== 0}><ProjectPresentationFrame active={offset === 0} />{children}</div>
    </div>
    {Math.abs(offset) === 1 && <button type="button" className="coverflow-select" tabIndex={-1} aria-hidden="true"
      onPointerDown={event => event.preventDefault()} onClick={onSelect} />}
  </motion.div>;
}
