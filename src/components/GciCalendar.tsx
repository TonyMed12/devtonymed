import type { Language } from "../data/i18n";
import { gciPeriodPercent } from "../data/gciPeriod";
import { useCurrentDate } from "../hooks/useCurrentDate";

export function GciCalendar({
  language,
  now: suppliedNow,
}: {
  language: Language;
  now?: Date;
}) {
  const now = useCurrentDate(suppliedNow);
  const percent = gciPeriodPercent(now),
    es = language === "es";
  const date = new Intl.DateTimeFormat(es ? "es-MX" : "en-US", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
  return (
    <div className="gci-calendar">
      <div className="calendar-heading">
        <h5>
          {es ? "Periodo transcurrido" : "Elapsed period"} · {percent} %
        </h5>
        <span>{es ? "En curso" : "In progress"}</span>
      </div>
      <div
        className="gci-period-bar"
        role="progressbar"
        aria-label={
          es
            ? "Estimación del periodo transcurrido"
            : "Estimated elapsed period"
        }
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      <p>
        {es ? "Agosto — 31 de diciembre de 2026" : "August — December 31, 2026"}
      </p>
      <p className="calendar-today">
        {es ? "Fecha actual (UTC): " : "Current date (UTC): "}
        {date}
      </p>
      <p className="calendar-estimate">
        {es
          ? "Estimación del periodo, tomando agosto como mes de inicio"
          : "Period estimate, using August as the starting month"}
      </p>
      <small>
        {es
          ? "Referencia de cálculo: 1 de agosto de 2026. Representa tiempo transcurrido, no actividades completadas."
          : "Calculation reference: August 1, 2026. Represents elapsed time, not completed activities."}
      </small>
    </div>
  );
}
