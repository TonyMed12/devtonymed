import { Component, Suspense, lazy, useRef, type ReactNode } from "react";
import { useInView } from "motion/react";
import { professionalLocation } from "../data/location";
import { Icon } from "./Icons";
const Globe = lazy(() => import("./LocationGlobeCanvas"));

function GlobeFallback() {
  return (
    <svg className="globe-fallback" viewBox="0 0 320 320" aria-hidden="true">
      <g fill="none" stroke="currentColor" opacity=".45">
        <circle cx="160" cy="160" r="136" />
        <ellipse cx="160" cy="160" rx="62" ry="136" />
        <ellipse cx="160" cy="160" rx="136" ry="53" />
      </g>
      <circle cx="160" cy="160" r="4" fill="currentColor" />
    </svg>
  );
}
class GlobeBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <GlobeFallback /> : this.props.children;
  }
}
export function LocationGlobe() {
  const ref = useRef<HTMLElement>(null);
  const near = useInView(ref, { margin: "300px", once: true });
  return (
    <figure ref={ref} className="location-globe">
      <div className="globe-reserved">
        <GlobeBoundary>
          <Suspense fallback={<GlobeFallback />}>
            {near ? <Globe /> : <GlobeFallback />}
          </Suspense>
        </GlobeBoundary>
      </div>
      <figcaption>
        <Icon name="location" />
        {professionalLocation.label}
      </figcaption>
    </figure>
  );
}
