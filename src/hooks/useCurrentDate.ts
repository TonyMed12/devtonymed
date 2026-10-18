import { useEffect, useState } from "react";
export function useCurrentDate(supplied?: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (supplied) return;
    const update = () => setNow(new Date());
    const timer = window.setInterval(update, 60000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, [supplied]);
  return supplied || now;
}
