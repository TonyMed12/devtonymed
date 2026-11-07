export function ProjectPresentationDecor() {
  return <svg className="project-presentation-decor" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
    <g transform="translate(500 330) rotate(-12) scale(1 .58)">
      <circle className="project-orbit-track" r="438" />
      <g className="project-orbit-clock"><circle className="project-orbit-dot" cx="438" cy="0" r="5" /><circle className="project-orbit-dot project-orbit-dot-small" cx="-438" cy="0" r="3" /></g>
    </g>
    <path className="project-orbit-track project-orbit-arc" d="M 80 590 Q 500 690 920 590" />
    <g className="project-constellation"><circle cx="115" cy="130" r="3" /><circle cx="135" cy="130" r="2" /><circle cx="135" cy="150" r="2" /></g>
  </svg>;
}

export function ProjectPresentationFrame({ active }: { active: boolean }) {
  return <span className="project-presentation-frame" aria-hidden="true" data-active={active}>
    {active && <svg viewBox="0 0 100 100" preserveAspectRatio="none"><rect x=".3" y=".3" width="99.4" height="99.4" rx="2.4" pathLength="1" /></svg>}
  </span>;
}
