import { useEffect, useState } from "react";
export function useModalOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setOpen(!!document.querySelector("dialog[open]"));
    const observer = new MutationObserver(update);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["open"],
    });
    update();
    return () => observer.disconnect();
  }, []);
  return open;
}
