import type { CSSProperties } from "react";
import { moreliaContours as contours } from "../data/moreliaContours";

// Decorative contour lines of the Morelia valley (real elevations). Only shown by the cantera style.
export function ContourBackdrop() {
  return (
    <svg className="contour-backdrop" viewBox={`0 0 ${contours.width} ${contours.height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g className="contour-minor">
        {contours.minor.map((d, index) => <path key={index} d={d} />)}
      </g>
      <g className="contour-major">
        {contours.major.map((d, index) => <path key={index} d={d} pathLength={1} style={{ "--i": index } as CSSProperties} />)}
      </g>
    </svg>
  );
}
