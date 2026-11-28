import type { Language } from "../data/i18n";

// Figure caption for the hero's map background: says what the lines are and what they mean. Only shown by the cantera style.
export function MapNote({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <aside className="map-note" aria-label={es ? "Nota del mapa" : "Map note"}>
      <p className="map-note-title">{es ? "Fig. 1 · Valle de Morelia" : "Fig. 1 · Morelia valley"}</p>
      <p className="map-note-contours">
        {es ? "Curvas de nivel cada 20 m, de 1,854 a 2,734 m." : "Contour lines every 20 m, from 1,854 to 2,734 m."}
      </p>
      <p className="map-note-routes">
        {es ? "Rutas de transporte público de Morelia, trazadas para RutaSegura ITM." : "Morelia's public transport routes, traced for RutaSegura ITM."}
      </p>
      <p className="map-note-meaning">
        {es ? "Cada línea, un nivel. Cada nivel, más panorama. En un mapa o en mi vida." : "Each line, a level. Each level, a wider view. On a map or in my life."}
      </p>
    </aside>
  );
}
