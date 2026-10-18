/** Local pictograms share the site's 24px viewBox and rounded 1.7px stroke. */
export function AboutIcon({ name }: { name: "section" | "curiosity" | "purpose" | "precision" }) {
  return (
    <svg className="about-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {name === "section" && <path d="m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 18" />}
      {name === "curiosity" && <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></>}
      {name === "purpose" && <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>}
      {name === "precision" && <><path d="M3 6h4m4 0h10M3 12h10m4 0h4M3 18h4m4 0h10" /><circle cx="9" cy="6" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="9" cy="18" r="2" /></>}
    </svg>
  );
}
