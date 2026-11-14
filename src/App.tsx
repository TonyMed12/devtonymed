import { useReducedMotion } from "./hooks/useReducedMotion";
import { useCallback, useEffect, useRef, useState } from "react";
import {LayoutGroup, MotionConfig, motion} from "motion/react";
import { site } from "./data/site";
import { motionSystem } from "./data/motion";
import { profile, read } from "./data/experience";
import { copy } from "./data/ui";
import type { Language } from "./data/i18n";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { ScrollProgress } from "./components/ScrollProgress";
import "./projects-showcase.css";
import { ProjectPresentationHeading } from "./components/ProjectPresentationHeading";
import { DotGridBackdrop } from "./components/DotGridBackdrop";
import { Welcome } from "./components/Welcome";
import { ResumeLink } from "./components/ResumeLink";
import { HeroTerminal } from "./components/HeroTerminal";
import { WhyWorkWithMe } from "./components/WhyWorkWithMe";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { Languages } from "./components/Languages";
import { Reveal } from "./components/Reveal";
import { EntranceReady } from "./hooks/useEntranceReady";
import { ProjectCard } from "./components/ProjectCard";
import { projects } from "./data/portfolio";
import { ResearchDialog, type ResearchId } from "./components/ResearchDialog";
import { TechnologySection } from "./components/TechnologySection";
import { HeroPortrait } from "./components/HeroPortrait";
import { LineReveal } from "./components/LineReveal";
import { About } from "./components/About";
import { ReadingProgress } from "./components/ReadingProgress";
import { Journey } from "./components/Journey";
import { CredentialGallery } from "./components/CredentialGallery";
import { Contact } from "./components/ProfessionalContact";
import { ResearchSection } from "./components/ResearchSection";
import { contactLinks } from "./data/contact";
import { Icon } from "./components/Icons";
import "./portfolio.css";
import "./hero-life.css";
import "./motion-sections.css";
import "./hero-stage-one.css";

type Theme = "light" | "dark";
const sections = [
  "inicio",
  "sobre-mi",
  "proyectos",
  "tecnologias",
  "formacion",
  "contacto",
];
function preference(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function App({ staticView = false, staticLanguage = "es" }: { staticView?: boolean; staticLanguage?: Language } = {}) {
  const [language, setLanguage] = useState<Language>(() =>
    staticView ? staticLanguage : preference("portfolio-language") === "en" ? "en" : "es",
  );
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = preference("portfolio-theme");
    return saved === "light" || saved === "dark"
      ? saved
      : typeof window !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [introReady, setIntroReady] = useState(staticView);
  const finishWelcome = useCallback(() => setIntroReady(true), []);
  const [active, setActive] = useState("inicio");
  const [researchId, setResearchId] = useState<ResearchId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useSmoothScroll();
  const [pageVisible, setPageVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const fallback = window.setTimeout(finishWelcome, 1900);
    return () => window.clearTimeout(fallback);
  }, [finishWelcome]);
  const es = language === "es";
  const t = copy[language];
  useEffect(() => {
    if (menuOpen)
      document.querySelector<HTMLAnchorElement>("#main-nav a")?.focus();
  }, [menuOpen]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language;
    document.title = site.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", read(profile.description, language));
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", read(profile.description, language));
    try {
      localStorage.setItem("portfolio-theme", theme);
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* Preferences work without persistence. */
    }
  }, [theme, language]);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  const nav = es
    ? [
        "Inicio",
        "Sobre mí",
        "Proyectos",
        "Tecnologías",
        "Formación",
        "Contacto",
      ]
    : ["Home", "About me", "Projects", "Technologies", "Education", "Contact"];
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "system";
  }, [reduced]);
  return (
    <MotionConfig
      reducedMotion={reduced ? "always" : "never"}
      transition={{ duration: reduced ? 0 : motionSystem.state, ease: motionSystem.ease }}
    >
      <LayoutGroup id="portfolio">
        <div
          ref={rootRef}
          className="site-shell"
          data-active-section={active}
          data-intro={introReady ? "ready" : "waiting"}
        >
          {!staticView && <Welcome onComplete={finishWelcome} />}
          <ReadingProgress />
          <DotGridBackdrop
            hostRef={rootRef}
            running={pageVisible && !reduced && active === "inicio"}
            shared
          />
          <a className="skip-link" href="#contenido">
            {es ? "Saltar al contenido" : "Skip to content"}
          </a>
          <header className="site-header intro-block intro-navigation">
            <motion.a
              className="brand"
              href="#inicio"
              onClick={() => setMenuOpen(false)}
              aria-label={
                es
                  ? `${site.fullName} · volver al inicio`
                  : `${site.fullName} · back to home`
              }
              initial={false}
            >
              <span className="brand-mark">
                t<span>m</span>.
              </span>
            </motion.a>
            <nav
              id="main-nav"
              aria-label={es ? "Navegación principal" : "Main navigation"}
              className={`main-nav ${menuOpen ? "is-open" : ""}`}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setMenuOpen(false);
                  document.getElementById("menu-toggle")?.focus();
                }
              }}
            >
              {nav.map((label, index) => (
                <a
                  key={sections[index]}
                  href={`#${sections[index]}`}
                  aria-current={
                    active === sections[index] ? "location" : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                  {active === sections[index] && (
                    <motion.span
                      className="nav-current-marker"
                      layoutId={reduced ? undefined : "nav-current-marker"}
                      aria-hidden="true"
                    />
                  )}
                </a>
              ))}
            </nav>
            <div className="header-controls">
              <button
                className="language-toggle"
                type="button"
                onClick={() => setLanguage(es ? "en" : "es")}
                aria-label={
                  es ? "Cambiar idioma a inglés" : "Switch language to Spanish"
                }
              >
                {es ? "ES" : "EN"} <span aria-hidden="true">⌄</span>
              </button>
              <button
                type="button"
                className="theme-toggle"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                aria-label={
                  es
                    ? `Activar tema ${theme === "light" ? "oscuro" : "claro"}`
                    : `Use ${theme === "light" ? "dark" : "light"} theme`
                }
              >
                <Icon name={theme === "light" ? "moon" : "sun"} />
              </button>
              <button
                id="menu-toggle"
                type="button"
                className="menu-toggle"
                aria-controls="main-nav"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? t.close : t.menu}
              </button>
            </div>
          </header>
          <EntranceReady value={introReady}>
          <main id="contenido">
            <div className="ambient-bg" aria-hidden="true" />
            <ScrollProgress />
            <section ref={heroRef} id="inicio" className="hero hero-stage-one section-wrap">
              <div className="hero-copy">
                <div>
                  <h1 className="hero-name" aria-label={site.fullName}>
                    <LineReveal ready={introReady} lines={[
                      site.fullName.split(" ").slice(0, 2).join(" "),
                      site.fullName.split(" ").slice(2).join(" "),
                    ]} />
                  </h1>
                  <div className="intro-block intro-role">
                    <div className="hero-role-row">
                      <p className="hero-greeting">{read(profile.role, language)}</p>
                      <p className="availability">
                      <i />
                      {read(profile.availability, language)}
                      </p>
                    </div>
                    <p className="hero-degree">
                      {read(profile.degree, language)} <span>{t.school}</span>
                    </p>
                  </div>
                </div>
                <div className="intro-block intro-actions">
                  <div className="hero-actions">
                    <a className="button button-primary" href="#contacto">
                      {es ? "Hablemos" : "Let’s talk"} <Icon name="arrow" />
                    </a>
                    <a className="button button-secondary hero-continue" href="#proyectos">
                      {es ? "Explorar proyectos" : "Explore projects"} <Icon name="arrow" />
                    </a>
                    <ResumeLink language={language} />
                  </div>
                  <a
                    className="hero-github text-link"
                    href={contactLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon name="github" />
                    GitHub <Icon name="arrow" />
                  </a>
                  <a className="hero-github hero-download text-link" href={site.resumeHref} download>
                    <Icon name="document" />
                    {es ? "Descargar CV" : "Download résumé"}
                  </a>
                </div>
                <div className="hero-meta intro-block intro-actions">
                  <span><Icon name="location" /> {t.location}</span>
                </div>
              </div>
              <div className="hero-side">
                <span className="hero-orbit" aria-hidden="true" />
                <HeroPortrait language={language} enabled={introReady} />
                <div className="intro-block hero-float hero-under-photo">
                  <HeroTerminal language={language} />
                </div>
              </div>
            </section>
            <About language={language} />
            <section id="proyectos" className="projects-section">
              <div className="section-wrap">
                <ProjectPresentationHeading language={language} />
                <Reveal delay={0.12} distance={32}>
                  {staticView ? (
                    <div className="static-projects">
                      {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} language={language}
                          index={index} active motionEnabled={false} onLanguageChange={() => {}} />
                      ))}
                    </div>
                  ) : (
                    <ProjectShowcase language={language} />
                  )}
                </Reveal>
              </div>
            </section>
            <WhyWorkWithMe language={language} />
            <TechnologySection language={language} />
            <section id="formacion" className="journey-section">
              <div className="section-wrap">
                <Journey language={language} />
                <ResearchSection language={language} onOpen={setResearchId} />
                <div className="courses">
                  <Reveal className="subsection-heading">

                    <h3>
                      {es
                        ? "Credenciales e idiomas."
                        : "Credentials & languages."}
                    </h3>
                  </Reveal>
                  <CredentialGallery
                    language={language}
                    onLanguageChange={() =>
                      setLanguage((current) => (current === "es" ? "en" : "es"))
                    }
                  />
                  <Languages language={language} />
                </div>
              </div>
            </section>
            <Contact language={language} />
          </main>
          </EntranceReady>
          <footer className="site-footer">
            <span>
              {new Date().getFullYear()} {site.fullName}
            </span>
            <span>{site.signature} · Morelia, MX</span>
            <a href="#inicio">{es ? "Volver arriba" : "Back to top"} ↑</a>
          </footer>
          {researchId && (
            <ResearchDialog
              id={researchId}
              language={language}
              onClose={() => setResearchId(null)}
              onLanguageChange={() =>
                setLanguage((current) => (current === "es" ? "en" : "es"))
              }
            />
          )}
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}

export default App;
