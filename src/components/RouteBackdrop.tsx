import type { CSSProperties } from "react";
import { moreliaRoutes } from "../data/moreliaRoutes";

// Decorative map of Morelia's public transport routes (traced for RutaSegura ITM). Only shown by the cantera style.
export function RouteBackdrop() {
  return (
    <svg className="route-backdrop" viewBox={`0 0 ${moreliaRoutes.width} ${moreliaRoutes.height}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {moreliaRoutes.paths.map((d, index) => (
        <path key={index} d={d} pathLength={1} style={{ "--i": index } as CSSProperties} />
      ))}
    </svg>
  );
}
