// Calendar dates use UTC consistently. Aug 1 is an estimation reference only.
export const gciPeriod = {
  start: Date.UTC(2026, 7, 1),
  end: Date.UTC(2026, 11, 31),
};
export function gciPeriodPercent(now: Date) {
  const day = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  return Math.round(
    Math.max(
      0,
      Math.min(1, (day - gciPeriod.start) / (gciPeriod.end - gciPeriod.start)),
    ) * 100,
  );
}
