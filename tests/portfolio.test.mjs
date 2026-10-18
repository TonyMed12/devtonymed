import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { join } from "node:path";
import { JSDOM } from "jsdom";
import { createServer } from "vite";

// This DOM has no layout engine: sensor, geometry and Canvas tests are simulated.
const dom = new JSDOM(
  '<!doctype html><html><head><meta name="description"></head><body><div id="root"></div></body></html>',
  { url: "http://localhost", pretendToBeVisual: true },
);
for (const key of [
  "window",
  "Window",
  "document",
  "localStorage",
  "sessionStorage",
  "HTMLElement",
  "SVGElement",
  "Element",
  "EventTarget",
  "AbortController",
  "AbortSignal",
  "Node",
  "MutationObserver",
  "HTMLDialogElement",
  "HTMLAnchorElement",
  "location",
  "history",
])
  globalThis[key] = dom.window[key];
Object.defineProperty(globalThis, "navigator", {
  value: dom.window.navigator,
  configurable: true,
});
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.requestAnimationFrame = dom.window.requestAnimationFrame.bind(
  dom.window,
);
globalThis.cancelAnimationFrame = dom.window.cancelAnimationFrame.bind(
  dom.window,
);
globalThis.getComputedStyle = dom.window.getComputedStyle.bind(dom.window);
const preferences = { reduced: true, fine: false, mobile: false },
  mediaSubscriptions = new Set();
const media = (query) => {
  const listeners = new Set();
  const value = {
    get matches() {
      return query.includes("prefers-reduced-motion")
        ? preferences.reduced
        : query.includes("pointer: fine")
          ? preferences.fine
          : query.includes("max-width: 760px") ? preferences.mobile : false;
    },
    media: query,
    addListener: (callback) => listeners.add(callback),
    removeListener: (callback) => listeners.delete(callback),
    addEventListener: (_event, callback) => listeners.add(callback),
    removeEventListener: (_event, callback) => listeners.delete(callback),
  };
  mediaSubscriptions.add({ value, listeners });
  return value;
};
globalThis.matchMedia = dom.window.matchMedia = media;
async function changePreferences(values) {
  await act(async () => {
    Object.assign(preferences, values);
    for (const { value, listeners } of mediaSubscriptions)
      for (const callback of listeners)
        callback({ matches: value.matches, media: value.media });
  });
}
const observers = new Set();
class Observer {
  targets = new Set();
  constructor(callback) {
    this.callback = callback;
    observers.add(this);
  }
  observe(target) {
    this.targets.add(target);
  }
  unobserve(target) {
    this.targets.delete(target);
  }
  disconnect() {
    this.targets.clear();
    observers.delete(this);
  }
}
globalThis.IntersectionObserver = dom.window.IntersectionObserver = Observer;
globalThis.ResizeObserver = dom.window.ResizeObserver = Observer;
dom.window.HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
dom.window.HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
};
dom.window.HTMLElement.prototype.scrollTo = function ({ left }) {
  this.scrollLeft = left;
};
dom.window.HTMLElement.prototype.scrollIntoView = function () {};
dom.window.scrollTo = function (options) {
  if (typeof options === "object" && options.top !== undefined)
    Object.defineProperty(dom.window, "scrollY", {
      configurable: true,
      value: options.top,
    });
};
let canvasDraws = 0;
const canvasContext = {
  clearRect() {
    canvasDraws++;
  },
  save() {},
  restore() {},
  translate() {},
  setTransform() {},
  fillRect() {},
  beginPath() {},
  moveTo() {},
  lineTo() {},
  quadraticCurveTo() {},
  stroke() {},
  arc() {},
  fill() {},
  createRadialGradient() {
    return { addColorStop() {} };
  },
};
dom.window.HTMLCanvasElement.prototype.getContext = () => canvasContext;
let clipboardValue,
  clipboardReject = false;
Object.defineProperty(navigator, "clipboard", {
  configurable: true,
  value: {
    async writeText(value) {
      if (clipboardReject) throw new Error("Clipboard denied");
      clipboardValue = value;
    },
  },
});
const { createElement, act, Profiler, StrictMode } = await import("react");
const { createRoot } = await import("react-dom/client");
let reactCommits = 0,
  server,
  root,
  App;
const query = (selector) => {
  const element = document.querySelector(selector);
  assert.ok(element, `Expected ${selector}`);
  return element;
};
async function click(selector) {
  const target = typeof selector === "string" ? query(selector) : selector;
  await act(async () => {
    target.focus();
    target.click();
  });
}
async function language(value) {
  // Use the mounted page's control: isolated App tests also touch html.lang.
  if (!query(".language-toggle").textContent.trim().startsWith(value.toUpperCase()))
    await click(
      document.querySelector("dialog[open] .dialog-language") ||
        query(".language-toggle"),
    );
}
before(async () => {
  server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  App = (await server.ssrLoadModule("/src/App.tsx")).default;
  root = createRoot(query("#root"));
  await act(async () =>
    root.render(
      createElement(
        Profiler,
        { id: "portfolio", onRender: () => reactCommits++ },
        createElement(App),
      ),
    ),
  );
});
after(async () => {
  await act(async () => root?.unmount());
  await server?.close();
  dom.window.close();
});

test("professional positioning, developer.json and metadata translate without remount", async () => {
  const terminal = query('[data-testid="developer-terminal"]');
  assert.deepEqual(Object.keys(JSON.parse(terminal.querySelector("code").textContent)), ["rol", "enfoque", "método", "disponibilidad"]);
  assert.equal(
    JSON.parse(terminal.querySelector("code").textContent).disponibilidad,
    "disponible para colaborar",
  );
  assert.equal(query("h1").textContent, "José Antonio Medina Ayala");
  assert.match(
    query(".hero-typewriter .sr-only").textContent,
    /Construyendo ideas con propósito/,
  );
  assert.doesNotMatch(
    document.body.textContent,
    /residencia|portafolio estudiantil|CAAM Morelia/i,
  );
  await language("en");
  assert.equal(query('[data-testid="developer-terminal"]'), terminal);
  assert.equal(
    JSON.parse(terminal.querySelector("code").textContent).role,
    "Junior Full-Stack Developer",
  );
  assert.deepEqual(Object.keys(JSON.parse(terminal.querySelector("code").textContent)), ["role", "focus", "approach", "availability"]);
  assert.doesNotMatch(
    terminal.textContent,
    /disponible|desarrollo de software|comprender/,
  );
  assert.equal(document.title, "TonyMed — Desarrollador Full-Stack");
  assert.match(
    query(".hero-typewriter .sr-only").textContent,
    /Building ideas with purpose/,
  );
  assert.match(
    query('meta[name="description"]').content,
    /Available for projects/,
  );
  assert.equal(localStorage.getItem("portfolio-language"), "en");
});

test("project dialogs retain team scope, translate and restore focus", async () => {
  await language("es");
  const opener = query("#projexus .project-actions button");
  await click(opener);
  assert.match(query("dialog[open]").textContent, /cinco personas/);
  assert.match(query("dialog[open]").textContent, /Spring Boot/);
  await click(".dialog-language");
  assert.match(query("dialog[open]").textContent, /five-person team/);
  assert.match(
    query("dialog[open]").textContent,
    /My involvement focused on coordination/,
  );
  await click(".dialog-close");
  assert.equal(document.activeElement, opener);
  await click("#todo .project-actions button");
  assert.match(query("dialog[open]").textContent, /many-to-many/);
  await click(".dialog-language");
  assert.match(query("dialog[open]").textContent, /muchos a muchos/);
  await click(".dialog-close");
  assert.equal(query("#caam .tags").children.length, 0);
  assert.equal(document.querySelector("#library"), null);
});

test("manual carousel wraps at both boundaries and keeps clones inert", async () => {
  const track = query(".carousel-track");
  [...track.children].forEach((slide, index) =>
    Object.defineProperty(slide, "offsetLeft", {
      configurable: true,
      value: index * 500,
    }),
  );
  await click(".carousel-dots button");
  assert.equal(track.scrollLeft, 1000);
  await click(".carousel-toolbar button:last-child");
  assert.equal(track.scrollLeft, 1500);
  assert.equal(query(".carousel-toolbar p").textContent, "2 / 5");
  await act(async () =>
    track.dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "End",
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
  assert.equal(track.scrollLeft, 3000);
  await click(".carousel-toolbar button:last-child");
  assert.equal(track.scrollLeft, 1000);
  await click(".carousel-toolbar button:first-child");
  assert.equal(track.scrollLeft, 3000);
  await click(".carousel-dots button");
  assert.equal(track.scrollLeft, 1000);
  const clones = [...track.querySelectorAll("[data-clone=true]")];
  assert.equal(clones.length, 4);
  for (const clone of clones) {
    assert.equal(clone.hasAttribute("inert"), true);
    assert.equal(clone.getAttribute("aria-hidden"), "true");
    assert.equal(clone.hasAttribute("id"), false);
    assert.equal(clone.querySelector("dialog"), null);
  }
  for (const id of [
    "projexus",
    "caam",
    "todo",
    "aquamarine",
    "fraud-detection",
  ])
    assert.equal(document.querySelectorAll(`[id="${id}"]`).length, 1);
});

test("technology selection connects stacks to evidence and survives locale changes", async () => {
  await language("es");
  await click(
    [...document.querySelectorAll(".tech-essentials button")].find((button) =>
      button.textContent.includes("Spring Boot"),
    ),
  );
  assert.match(query(".technology-evidence").textContent, /Stack del equipo/);
  assert.match(query(".technology-evidence").textContent, /Scrum Master/);
  assert.equal(
    query(".technology-evidence a").getAttribute("href"),
    "#projexus",
  );
  await language("en");
  assert.match(query(".technology-evidence").textContent, /Team stack/);
  await click(
    [...document.querySelectorAll(".tech-essentials button")].find(
      (button) => button.textContent.trim() === "SQL",
    ),
  );
  assert.match(query(".technology-evidence").textContent, /many-to-many/);
  assert.equal(query(".technology-evidence a").getAttribute("href"), "#todo");
});

test("education buttons support keyboard selection, a single panel and real license links", async () => {
  await language("es");
  const tabs = [...document.querySelectorAll(".station-tabs [role=tab]")];
  assert.equal(tabs.length, 3);
  assert.equal(tabs[1].getAttribute("aria-selected"), "true");
  assert.equal(document.querySelectorAll(".journey-panel").length, 1);
  assert.match(query(".journey-panel").textContent, /En curso/);
  assert.equal(query(".journey-path").dataset.stage, "1");
  assert.doesNotMatch(
    query(".journey-panel").textContent,
    /To Do|Experiencia práctica/,
  );
  assert.match(
    query(".journey-panel").textContent,
    /Especialidad en Tecnologías de Desarrollo de Software/,
  );
  assert.match(
    query(".degree-average").textContent,
    /Promedio actual: 94\/100/,
  );
  await language("en");
  assert.match(
    query(".journey-panel").textContent,
    /Specialization in Software Development Technologies/,
  );
  assert.match(
    query(".degree-average").textContent,
    /Current average: 94\/100/,
  );
  await language("es");
  await act(async () =>
    tabs[1].dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "ArrowLeft",
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
  assert.equal(document.activeElement, tabs[0]);
  assert.match(query(".journey-panel").textContent, /15938245/);
  assert.equal(
    query(".license-block a").href,
    "https://www.gob.mx/cedulaprofesional",
  );
  await act(async () =>
    tabs[0].dispatchEvent(
      new window.KeyboardEvent("keydown", {
        key: "End",
        bubbles: true,
        cancelable: true,
      }),
    ),
  );
  assert.match(query(".journey-panel").textContent, /Egreso previsto/);
  assert.match(query(".journey-panel").textContent, /2027/);
  assert.equal(query(".journey-path").dataset.stage, "2");
  await language("en");
  assert.match(query(".journey-panel").textContent, /Expected completion/);
  await click(tabs[1]);
});

test("credential dialog translates, remains outside document flow and restores its opener", async () => {
  await language("es");
  const trigger = query(".credential-gci");
  assert.equal(document.querySelector(".credential-expansion"), null);
  assert.equal(document.querySelector(".credential-summary"), null);
  await click(trigger);
  assert.match(query(".credential-dialog").textContent, /En curso/);
  assert.match(query(".credential-dialog").textContent, /Matsuo-Iwasawa/);
  assert.equal(document.body.style.overflow, "hidden");
  assert.equal(
    query(".credential-dialog").hasAttribute("data-lenis-prevent"),
    true,
  );
  await language("en");
  assert.match(query(".credential-dialog").textContent, /In progress/);
  assert.doesNotMatch(
    query(".credential-dialog").textContent,
    /En curso|constancia de Tony/,
  );
  await act(async () =>
    query(".credential-dialog").dispatchEvent(
      new window.Event("cancel", { cancelable: true }),
    ),
  );
  assert.equal(document.querySelector("dialog"), null);
  assert.equal(document.activeElement, trigger);
  assert.equal(trigger.getAttribute("aria-expanded"), "false");
});

test("editorial portrait keeps one original photograph without WebGL in either language", async () => {
  await changePreferences({ reduced: true });
  const image = query(".editorial-portrait img");
  assert.equal(image.getAttribute("src"), "/profesionaltony.jpg");
  assert.equal(image.getAttribute("width"), "1200");
  assert.equal(image.getAttribute("height"), "1600");
  assert.equal(image.alt, "José Antonio Medina Ayala");
  assert.equal(query(".editorial-portrait").dataset.reduced, "true");
  assert.equal(document.querySelector("[data-lanyard-stage],.portrait-stage"), null);
  assert.equal(query(".editorial-portrait").querySelector("canvas,a,button"), null);
  assert.equal(query(".editorial-portrait").hasAttribute("tabindex"), false);
  await language("en");
  assert.match(query(".editorial-portrait figcaption").textContent, /Portrait of/);
  assert.equal(query(".editorial-portrait img"), image);
});

test("editorial crop stays within the original image and never changes its bitmap", async () => {
  const { portrait, portraitImageStyle } = await server.ssrLoadModule("/src/data/portrait.ts");
  const { createHash } = await import("node:crypto");
  const photo = await readFile("public/profesionaltony.jpg");
  assert.equal(createHash("sha256").update(photo).digest("hex"), "1674da43ba40635c42fa84ebbb08d97ac d178ac0add4b2169d3059fbaa9634c3".replaceAll(" ", ""));
  assert.equal(portrait.crop.width / portrait.crop.height, 4 / 5);
  assert.ok(portrait.crop.x >= 0 && portrait.crop.y >= 0);
  assert.ok(portrait.crop.x + portrait.crop.width <= portrait.width);
  assert.ok(portrait.crop.y + portrait.crop.height <= portrait.height);
  assert.ok(Math.abs(parseFloat(portraitImageStyle.width) * portrait.crop.width / 100 - portrait.width) < 0.001);
  assert.ok(Math.abs(parseFloat(portraitImageStyle.left) * portrait.crop.width / 100 + portrait.crop.x) < 0.001);
  assert.ok(Math.abs(parseFloat(portraitImageStyle.top) * portrait.crop.height / 100 + portrait.crop.y) < 0.001);
});
test("GCI estimates UTC elapsed time with clamped percentages and never certifies by date", async () => {
  const { gciPeriodPercent } = await server.ssrLoadModule(
    "/src/data/gciPeriod.ts",
  );
  for (const [date, value] of [
    ["2026-07-31T23:59:59Z", 0],
    ["2026-08-01T00:00:00Z", 0],
    ["2026-10-16T18:00:00Z", 50],
    ["2026-12-31T00:00:00Z", 100],
    ["2027-02-01T00:00:00Z", 100],
  ])
    assert.equal(gciPeriodPercent(new Date(date)), value);
  assert.equal(gciPeriodPercent(new Date("2026-10-16T13:00:00-05:00")), 50);
  const { GciCalendar } = await server.ssrLoadModule(
    "/src/components/GciCalendar.tsx",
  );
  const container = document.createElement("div");
  document.body.append(container);
  const calendarRoot = createRoot(container);
  try {
    await act(async () =>
      calendarRoot.render(
        createElement(GciCalendar, {
          language: "es",
          now: new Date("2026-10-16T18:00:00Z"),
        }),
      ),
    );
    assert.equal(
      container
        .querySelector("[role=progressbar]")
        .getAttribute("aria-valuenow"),
      "50",
    );
    assert.match(container.textContent, /Periodo transcurrido · 50 %/);
    assert.match(
      container.textContent,
      /Estimación del periodo, tomando agosto como mes de inicio/,
    );
    assert.match(container.textContent, /no actividades completadas/);
    await act(async () =>
      calendarRoot.render(
        createElement(GciCalendar, {
          language: "en",
          now: new Date("2027-01-15T18:00:00Z"),
        }),
      ),
    );
    assert.equal(
      container
        .querySelector("[role=progressbar]")
        .getAttribute("aria-valuenow"),
      "100",
    );
    assert.match(container.textContent, /In progress/);
    assert.doesNotMatch(container.textContent, /Certified|Completed/);
  } finally {
    await act(async () => calendarRoot.unmount());
    container.remove();
  }
});

test("autoplay waits six seconds, loops through sentinels and pauses for every interaction sensor", async () => {
  const originalSet = window.setTimeout.bind(window),
    originalClear = window.clearTimeout.bind(window);
  const timers = new Map();
  let clock = 0,
    nextId = -1;
  window.setTimeout = (callback, delay, ...args) => {
    if (delay !== 6000) return originalSet(callback, delay, ...args);
    const id = nextId--;
    timers.set(id, { callback: () => callback(...args), due: clock + delay });
    return id;
  };
  window.clearTimeout = (id) => {
    if (timers.has(id)) timers.delete(id);
    else originalClear(id);
  };
  const carousel = query(".project-carousel"),
    track = query(".carousel-track");
  const index = () =>
    [...document.querySelectorAll(".carousel-dots button")].findIndex(
      (button) => button.getAttribute("aria-pressed") === "true",
    );
  const visible = async (value) =>
    act(async () => {
      for (const observer of observers)
        if (observer.targets.has(carousel))
          observer.callback(
            [
              {
                target: carousel,
                isIntersecting: value,
                intersectionRatio: value ? 1 : 0,
              },
            ],
            observer,
          );
    });
  const tick = async (ms) =>
    act(async () => {
      clock += ms;
      for (const [id, timer] of [...timers])
        if (timer.due <= clock) {
          timers.delete(id);
          timer.callback();
        }
    });
  const settle = async (ms = 530) =>
    act(async () => new Promise((resolve) => originalSet(resolve, ms)));
  const outside = async () =>
    act(async () => query(".language-toggle").focus());
  const pointer = async (target, type, kind = "mouse") =>
    act(async () => {
      const event = new window.Event(type, { bubbles: true });
      Object.defineProperty(event, "pointerType", { value: kind });
      target.dispatchEvent(event);
    });
  try {
    await changePreferences({ reduced: true });
    await click(".carousel-dots button:last-child");
    await changePreferences({ reduced: false });
    await outside();
    await visible(true);
    assert.equal(carousel.dataset.autoplay, "running");
    await tick(5999);
    assert.equal(index(), 4);
    await tick(1);
    await settle();
    assert.equal(index(), 0);
    assert.equal(track.scrollLeft, 1000);
    await tick(6000);
    await settle();
    assert.equal(index(), 1);
    await pointer(carousel, "pointerover");
    assert.equal(carousel.dataset.autoplay, "paused");
    const before = index();
    await tick(12000);
    assert.equal(index(), before);
    await pointer(carousel, "pointerout");
    await click(".carousel-dots button");
    assert.equal(carousel.dataset.autoplay, "paused");
    await tick(12000);
    await settle();
    assert.equal(index(), 0);
    await outside();
    await tick(5999);
    assert.equal(index(), 0);
    await tick(1);
    await settle();
    assert.equal(index(), 1);
    await pointer(track, "pointerdown", "touch");
    assert.equal(carousel.dataset.autoplay, "paused");
    await tick(12000);
    assert.equal(index(), 1);
    await pointer(window, "pointerup", "touch");
    await settle(760);
    await click(".research-cloud-security button");
    assert.equal(carousel.dataset.autoplay, "paused");
    await tick(12000);
    assert.equal(index(), 1);
    await click(".dialog-close");
    await settle(240);
    await outside();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    await act(async () =>
      document.dispatchEvent(new window.Event("visibilitychange")),
    );
    assert.equal(carousel.dataset.autoplay, "paused");
    await tick(12000);
    assert.equal(index(), 1);
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    await act(async () =>
      document.dispatchEvent(new window.Event("visibilitychange")),
    );
    await visible(false);
    assert.equal(carousel.dataset.autoplay, "paused");
    await tick(12000);
    assert.equal(index(), 1);
    await visible(true);
    await tick(5999);
    assert.equal(index(), 1);
    await tick(1);
    await settle();
    assert.equal(index(), 2);
    await changePreferences({ reduced: true });
    assert.equal(carousel.dataset.autoplay, "paused");
    await tick(12000);
    assert.equal(index(), 2);
  } finally {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    await changePreferences({ reduced: true, fine: false });
    await visible(false);
    await outside();
    window.setTimeout = originalSet;
    window.clearTimeout = originalClear;
  }
});
test("UPV preserves its completion state and shows microcredential credits, logo and five topics", async () => {
  await language("es");
  const trigger = query(".credential-upv");
  assert.match(
    trigger.textContent,
    /Microcredencial · Universitat Politècnica de València/,
  );
  assert.match(trigger.textContent, /3 ECTS/);
  assert.match(trigger.textContent, /Curso completado/);
  await click(trigger);
  assert.equal(
    query(".credential-dialog-logo").getAttribute("src"),
    "/institutions/upv.svg",
  );
  assert.equal(document.querySelectorAll(".secure-topics li").length, 5);
  assert.match(query(".secure-topics").textContent, /riesgos/);
  await language("en");
  assert.match(
    query(".credential-format").textContent,
    /Microcredential · 3 ECTS/,
  );
  assert.match(query(".secure-topics").textContent, /risk assessment/);
  assert.doesNotMatch(
    query(".credential-dialog").textContent,
    /máster|master|Burp|Nessus/i,
  );
  await click(".dialog-close");
  assert.equal(
    query(".credential-gci img").getAttribute("src"),
    "/institutions/matsuo-iwasawa.png",
  );
  await act(async () => new Promise((resolve) => setTimeout(resolve, 40)));
});

test("all technology and issuer images exist and technology glyphs have a named context", async () => {
  const { technologies } = await server.ssrLoadModule("/src/data/portfolio.ts");
  const { TechnologyIcon } = await server.ssrLoadModule(
    "/src/components/Icons.tsx",
  );
  const { renderToStaticMarkup } = await import("react-dom/server");
  for (const tech of technologies) {
    const markup = renderToStaticMarkup(
      createElement(TechnologyIcon, { name: tech.name }),
    );
    const match = markup.match(/<img[^>]+src="([^"]+)"/);
    if (tech.name === "SQL") assert.match(markup, /<svg/);
    else {
      assert.ok(match, `Missing identifiable icon: ${tech.name}`);
      await access(join("public", match[1].slice(1)));
    }
  }
  const { credentialGallery } = await server.ssrLoadModule(
    "/src/data/experience.ts",
  );
  for (const credential of credentialGallery)
    await access(join("public", credential.logo.slice(1)));
});

test("public copy, reported languages and temporary resume links remain accurate", async () => {
  await language("es");
  assert.equal(query(".brand").textContent.replace(/\s/g, ""), "tm.");
  assert.equal(
    document.querySelector(
      ".hero-scroll,.ambient-control,.band-pause,.motion-settings",
    ),
    null,
  );
  assert.match(query(".language-cards").textContent, /EspañolNativo/);
  assert.match(
    query(".language-cards").textContent,
    /B2Nivel reportadoCertificación pendiente/,
  );
  assert.doesNotMatch(
    document.body.textContent,
    /Soy Tony|datos por verificar|fechas documentadas|pendientes de añadir|por confirmar|pendiente de agregar|Voxy/i,
  );
  for (const link of document.querySelectorAll(".resume-link")) {
    assert.equal(link.getAttribute("href"), "#inicio");
    assert.equal(link.hasAttribute("download"), false);
    assert.ok(link.querySelector("svg"));
  }
  assert.equal(document.querySelectorAll(".resume-link").length, 2);
  assert.match(
    query(".research-cloud-security .date").textContent,
    /Corporación Universitaria Latinoamericana/,
  );
  assert.match(
    query(".research-fraud h4").textContent,
    /Detección de fraude/,
  );
  await language("en");
  assert.match(
    query(".language-cards").textContent,
    /B2Reported levelCertification pending/,
  );
  assert.match(query(".resume-link").textContent, /View résumé/);
});

test("research dialog can change language from inside the modal and restore focus on cancel", async () => {
  await language("es");
  const trigger = query(".research-cloud-security button");
  await click(trigger);
  assert.equal(document.body.style.overflow, "hidden");
  assert.match(query("dialog[open] h2").textContent, /revisión sistemática/);
  await click(".dialog-language");
  assert.equal(document.documentElement.lang, "en");
  assert.match(query("dialog[open] h2").textContent, /systematic review/);
  assert.doesNotMatch(
    query("dialog[open]").textContent,
    /Problema investigado|Participación y resultado/,
  );
  await act(async () =>
    query("dialog[open]").dispatchEvent(
      new window.Event("cancel", { bubbles: false, cancelable: true }),
    ),
  );
  assert.equal(document.querySelector("dialog"), null);
  assert.equal(document.activeElement, trigger);
  assert.equal(document.body.style.overflow, "");
});

test("copy email reports success, translated confirmation, and a real failure state", async () => {
  await language("es");
  await click(".copy-email");
  assert.equal(clipboardValue, "tonymed2022@gmail.com");
  assert.match(query(".copy-status").textContent, /Correo copiado/);
  await language("en");
  assert.match(query(".copy-status").textContent, /Email copied/);
  clipboardReject = true;
  await click(".copy-email");
  assert.match(query(".copy-status").textContent, /Could not copy/);
  clipboardReject = false;
});

test("themes, navigation state and reduced-motion content remain usable", async () => {
  assert.equal(document.documentElement.dataset.theme, "light");
  await click(".theme-toggle");
  assert.equal(document.documentElement.dataset.theme, "dark");
  assert.equal(localStorage.getItem("portfolio-theme"), "dark");
  await click(".theme-toggle");
  assert.equal(document.documentElement.dataset.theme, "light");
  await click("#menu-toggle");
  assert.equal(query("#menu-toggle").getAttribute("aria-expanded"), "true");
  await click('nav a[href="#contacto"]');
  assert.equal(query("#menu-toggle").getAttribute("aria-expanded"), "false");
  assert.equal(
    query(".dot-grid-backdrop").getAttribute("data-running"),
    "false",
  );
  assert.equal(document.querySelector(".canvas-backdrop"), null);
  assert.ok(query("h1").textContent);
  for (const anchor of document.querySelectorAll('a[href^="#"]'))
    assert.ok(
      document.getElementById(anchor.getAttribute("href").slice(1)),
      `Broken anchor ${anchor.getAttribute("href")}`,
    );
  for (const image of document.querySelectorAll('img[src^="/"]'))
    await access(join("public", image.getAttribute("src").slice(1)));
  for (const button of document.querySelectorAll("button[aria-controls]"))
    assert.ok(
      document.getElementById(button.getAttribute("aria-controls")),
      `Missing aria-controls target ${button.outerHTML}`,
    );
});

function luminance(hex) {
  const [r, g, b] = hex
    .match(/[a-f\d]{2}/gi)
    .map((value) => parseInt(value, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
test("main text, selections, dialog and contact palettes meet normal-text contrast", async () => {
  const pairs = [
    ["0f172a", "f8fafc"],
    ["475569", "f8fafc"],
    ["1d4ed8", "f8fafc"],
    ["f1f5f9", "0b1120"],
    ["b8c7dc", "0b1120"],
    ["60a5fa", "0b1120"],
    ["ffffff", "2563eb"],
    ["ffffff", "1d4ed8"],
    ["0f172a", "eaf1fb"],
    ["475569", "eaf1fb"],
    ["1d4ed8", "eaf1fb"],
    ["f1f5f9", "15223a"],
    ["b8c7dc", "15223a"],
    ["60a5fa", "15223a"],
    ["b8c7dc", "1b2e4b"],
    ["60a5fa", "1b2e4b"],
    ["0f172a", "93c5fd"],
  ];
  const css = (await readFile("src/portfolio.css", "utf8")).toLowerCase();
  for (const [fg, bg] of pairs) {
    assert.ok(css.includes(`#${fg}`) && css.includes(`#${bg}`));
    const a = luminance(fg),
      b = luminance(bg);
    const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    assert.ok(ratio >= 4.5, `${fg}/${bg} contrast ${ratio}`);
  }
});

test("principles keep their names visible and translate the selected explanation", async () => {
  await language("es");
  const options = [...document.querySelectorAll(".principle-options button")];
  assert.deepEqual(
    options.map(
      (button) =>
        button.querySelector("span:not(.principle-selection)").textContent,
    ),
    ["Curiosidad", "Propósito", "Precisión"],
  );
  await click(options[1]);
  assert.match(
    query(".principle-explanation").textContent,
    /para quién construyo/,
  );
  assert.equal(
    query(".principle-explanation").getAttribute("aria-labelledby"),
    options[1].id,
  );
  await language("en");
  assert.match(
    query(".principle-explanation").textContent,
    /who I am building for/,
  );
  assert.equal(options[1].getAttribute("aria-pressed"), "true");
  assert.match(options[1].textContent, /Purpose/);
  assert.equal(document.querySelector(".cursor-trail"), null);
});

test("marquee has identical fixed-size groups and hides its inert copy", async () => {
  const band = query(".technology-band");
  assert.equal(band.dataset.static, "true");
  assert.equal(band.dataset.paused, "true");
  const sequence = query(".technology-sequence:not(.band-copy)");
  const names = [...sequence.children].map(
    (item) => item.querySelector(".band-item>span:nth-child(2)").textContent,
  );
  for (const name of ["Next.js", "Spring Boot", "Java", "C#", "SQL"])
    assert.ok(names.includes(name));
  assert.equal(new Set(names).size, names.length);
  const copy = query(".band-copy");
  assert.equal(copy.getAttribute("aria-hidden"), "true");
  assert.equal(copy.hasAttribute("inert"), true);
  assert.equal(copy.querySelectorAll("a,button,[tabindex]").length, 0);
  assert.deepEqual(
    [...copy.children].map((item) => item.textContent),
    [...sequence.children].map((item) => item.textContent),
  );
  assert.equal(
    sequence.querySelectorAll("button,a,input,[tabindex]").length,
    0,
  );
  assert.equal(
    sequence.querySelectorAll(".technology-icon").length,
    names.length,
  );
});

test("band pauses for focus, OS preference, hover, visibility and viewport changes", async () => {
  await changePreferences({ reduced: false, fine: true });
  await act(async () => {
    for (const observer of observers)
      observer.callback(
        [...observer.targets].map((target) => ({
          target,
          isIntersecting: true,
          intersectionRatio: 1,
        })),
        observer,
      );
  });
  const band = query(".technology-band");
  assert.equal(band.dataset.static, "false");
  query(".language-toggle").focus();
  assert.equal(band.dataset.paused, "false");
  assert.equal(document.querySelector(".motion-settings"), null);
  assert.equal(document.documentElement.classList.contains("lenis"), true);
  await changePreferences({ reduced: true });
  assert.equal(band.dataset.static, "true");
  assert.equal(document.documentElement.classList.contains("lenis"), false);
  assert.equal(document.querySelector(".cursor-trail"), null);
  await changePreferences({ reduced: false });
  assert.equal(band.dataset.static, "false");
  await act(async () => query(".band-viewport").focus());
  assert.equal(band.dataset.paused, "true");
  await act(async () => query(".language-toggle").focus());
  assert.equal(band.dataset.paused, "false");
  await act(async () => {
    const event = new window.Event("pointerover", { bubbles: true });
    Object.defineProperty(event, "pointerType", { value: "mouse" });
    query(".band-viewport").dispatchEvent(event);
  });
  assert.equal(band.dataset.paused, "true");
  await act(async () =>
    query(".band-viewport").dispatchEvent(
      new window.Event("pointerout", { bubbles: true }),
    ),
  );
  assert.equal(band.dataset.paused, "false");
  Object.defineProperty(document, "hidden", {
    configurable: true,
    value: true,
  });
  await act(async () =>
    document.dispatchEvent(new window.Event("visibilitychange")),
  );
  assert.equal(band.dataset.paused, "true");
  Object.defineProperty(document, "hidden", {
    configurable: true,
    value: false,
  });
  await act(async () =>
    document.dispatchEvent(new window.Event("visibilitychange")),
  );
  await act(async () => {
    for (const observer of observers)
      observer.callback(
        [...observer.targets].map((target) => ({
          target,
          isIntersecting: false,
          intersectionRatio: 0,
        })),
        observer,
      );
  });
  assert.equal(band.dataset.paused, "true");
  await changePreferences({ reduced: true, fine: false });
});

test("animated carousel settles at its target and restores native snap", async () => {
  await changePreferences({ reduced: true });
  await click(".carousel-dots button");
  await changePreferences({ reduced: false });
  const track = query(".carousel-track");
  await act(async () => query(".carousel-toolbar button:last-child").dispatchEvent(
    new window.MouseEvent("click", { bubbles: true, detail: 1 }),
  ));
  assert.equal(track.dataset.animating, "true");
  await act(async () => new Promise((resolve) => setTimeout(resolve, 500)));
  assert.equal(Math.round(track.scrollLeft), 1500);
  assert.equal(track.hasAttribute("data-animating"), false);
  await changePreferences({ reduced: true });
});

test("Lenis keeps anchors and focus, yields to modals and is removed for reduced motion", async () => {
  await changePreferences({ reduced: false, fine: true });
  assert.equal(document.documentElement.classList.contains("lenis"), true);
  await click('#inicio .hero-actions a[href="#contacto"]');
  assert.equal(location.hash, "#contacto");
  assert.equal(document.activeElement, query("#contacto"));
  await act(async () => {
    const event = new window.KeyboardEvent("keydown", {
      key: "PageDown",
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    assert.equal(event.defaultPrevented, false);
  });
  await click("#projexus .project-actions button");
  assert.equal(query("dialog").hasAttribute("data-lenis-prevent"), true);
  assert.equal(
    document.documentElement.classList.contains("lenis-stopped"),
    true,
  );
  await click(".dialog-close");
  await act(async () => new Promise((resolve) => setTimeout(resolve, 240)));
  assert.equal(document.querySelector("dialog"), null);
  assert.equal(
    document.documentElement.classList.contains("lenis-stopped"),
    false,
  );
  assert.equal(
    query(".carousel-track").hasAttribute("data-lenis-prevent"),
    true,
  );
  await changePreferences({ reduced: true });
  assert.equal(document.documentElement.classList.contains("lenis"), false);
});

test("Dot Grid rests, responds to mouse only, settles and cleans up its frame subscription", async () => {
  await changePreferences({ reduced: false, fine: true });
  const { DotGridBackdrop } = await server.ssrLoadModule(
    "/src/components/DotGridBackdrop.tsx",
  );
  const container = document.createElement("div");
  document.body.append(container);
  container.getBoundingClientRect = () => ({
    left: 0,
    top: 0,
    width: 800,
    height: 600,
  });
  const canvasRoot = createRoot(container);
  const hostRef = { current: container };
  try {
    await act(async () =>
      canvasRoot.render(
        createElement(DotGridBackdrop, { hostRef, running: true }),
      ),
    );
    const before = canvasDraws;
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(canvasDraws, before, "No continuous loop at rest");
    const move = new window.Event("pointermove", { bubbles: true });
    Object.defineProperties(move, {
      pointerType: { value: "mouse" },
      clientX: { value: 700 },
      clientY: { value: 250 },
    });
    container.dispatchEvent(move);
    await new Promise((resolve) => setTimeout(resolve, 80));
    assert.ok(canvasDraws > before, "Pointer starts a bounded response");
    await new Promise((resolve) => setTimeout(resolve, 2100));
    const settled = canvasDraws;
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(
      canvasDraws,
      settled,
      "Stops drawing after the response settles",
    );
    const touch = new window.Event("pointermove", { bubbles: true });
    Object.defineProperty(touch, "pointerType", { value: "touch" });
    container.dispatchEvent(touch);
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.equal(canvasDraws, settled, "Touch does not start orbiting");
    await act(async () => canvasRoot.unmount());
    const stopped = canvasDraws;
    await new Promise((resolve) => setTimeout(resolve, 100));
    assert.equal(
      canvasDraws,
      stopped,
      "Unmount removes the drawing subscription",
    );
  } finally {
    await act(async () => canvasRoot.unmount());
    container.remove();
    await changePreferences({ reduced: true, fine: false });
  }
});

test("native pointer stays unobstructed and retired effects do not mount", async () => {
  await changePreferences({ reduced: false, fine: true });
  assert.equal(document.querySelector(".cursor-trail,.follow-eyes,.dither-glyph"), null);
  const terminal = query('[data-testid="developer-terminal"]');
  const previous = terminal.textContent;
  const event = new window.MouseEvent("pointermove", { bubbles: true, cancelable: true, clientX: 120, clientY: 90 });
  query(".site-shell").dispatchEvent(event);
  assert.equal(event.defaultPrevented, false);
  assert.equal(terminal.textContent, previous);
  await changePreferences({ reduced: true, fine: false });
});
// Component timers are simulated explicitly; this does not assert browser layout.
async function withComponentClock(run) {
  const originalSet = window.setTimeout,
    originalClear = window.clearTimeout;
  let now = 0,
    next = 0;
  const timers = new Map();
  window.setTimeout = (callback, delay = 0) => {
    const id = ++next;
    timers.set(id, { time: now + delay, callback });
    return id;
  };
  window.clearTimeout = (id) => timers.delete(id);
  const advance = async (ms) => {
    const end = now + ms;
    await act(async () => {
      for (;;) {
        const entry = [...timers].sort((a, b) => a[1].time - b[1].time)[0];
        if (!entry || entry[1].time > end) break;
        now = entry[1].time;
        timers.delete(entry[0]);
        entry[1].callback();
      }
      now = end;
    });
  };
  try {
    await run(advance);
  } finally {
    window.setTimeout = originalSet;
    window.clearTimeout = originalClear;
  }
}

test("welcome repeats on complete mounts, ignores legacy storage, and restores scroll styling", async () => {
  const { Welcome } = await server.ssrLoadModule("/src/components/Welcome.tsx");
  const container = document.createElement("div");
  document.body.append(container);
  const welcomeRoot = createRoot(container);
  sessionStorage.setItem("tonymed-welcome-seen", "1");
  const overflow = document.documentElement.style.overflow;
  try {
    await withComponentClock(async (advance) => {
      await act(async () => welcomeRoot.render(createElement(Welcome)));
      assert.match(container.textContent, /Bienvenido\s*\/\s*Welcome/);
      assert.match(
        container.querySelector(".welcome-domain").textContent,
        /tonymed\.dev/,
      );
      assert.equal(container.firstChild.getAttribute("aria-hidden"), "true");
      assert.equal(document.documentElement.style.overflow, "hidden");
      await act(async () => welcomeRoot.render(createElement(Welcome)));
      await advance(1450);
      assert.equal(container.children.length, 0);
      assert.equal(document.documentElement.style.overflow, overflow);
      await act(async () => welcomeRoot.render(createElement(Welcome)));
      assert.equal(
        container.children.length,
        0,
        "Ordinary rerender never repeats the welcome",
      );
      for (let reload = 0; reload < 3; reload++) {
        await act(async () => welcomeRoot.render(null));
        await act(async () => welcomeRoot.render(createElement(Welcome)));
        assert.match(container.textContent, /Bienvenido\s*\/\s*Welcome/);
        await advance(1450);
        assert.equal(container.children.length, 0);
        assert.equal(document.documentElement.style.overflow, overflow);
      }
    });
  } finally {
    await act(async () => welcomeRoot.unmount());
    container.remove();
  }
});

test("work leads the evidence and About owns the extended profile and principles", async () => {
  await language("es");
  const hero = query("#inicio"),
    about = query("#sobre-mi");
  assert.equal(hero.nextElementSibling.id, "proyectos");
  assert.equal(query("#proyectos").nextElementSibling.id, "tecnologias");
  assert.equal(query("#tecnologias").nextElementSibling, about);
  assert.equal(about.nextElementSibling.id, "formacion");
  assert.match(about.querySelector("h2").textContent, /Sobre mí/);
  assert.equal(
    hero.querySelector(".principles,.profile-terminal,.scroll-reveal-text"),
    null,
  );
  assert.ok(about.querySelector(".principles"));
  assert.ok(about.querySelector(".profile-terminal"));
  assert.equal(document.querySelectorAll(".scroll-reveal-text").length, 1);
  assert.equal(query('nav a[href="#sobre-mi"]').textContent, "Sobre mí");
  await language("en");
  assert.match(about.querySelector("h2").textContent, /About me/);
});

test("contact flip exposes one face, moves focus, preserves usable links and returns with Escape", async () => {
  await changePreferences({ reduced: true });
  const { Contact } = await server.ssrLoadModule(
    "/src/components/FlipContact.tsx",
  );
  const container = document.createElement("div");
  document.body.append(container);
  const comparisonRoot = createRoot(container);
  await act(async () =>
    comparisonRoot.render(createElement(Contact, { language: "es" })),
  );
  try {
    if (query(".contact-flip").dataset.flipped === "true")
      await click(".flip-return");
    const front = query(".flip-front"),
      back = query(".flip-back"),
      open = query(".flip-open");
    assert.equal(open.tagName, "BUTTON");
    assert.equal(back.hasAttribute("inert"), true);
    assert.equal(back.getAttribute("aria-hidden"), "true");
    assert.equal(front.hasAttribute("inert"), false);
    await click(open);
    assert.equal(document.activeElement, back.querySelector("h3"));
    assert.equal(front.hasAttribute("inert"), true);
    assert.equal(back.hasAttribute("inert"), false);
    const email = back.querySelector("a[href^='mailto:']");
    assert.equal(email.getAttribute("href"), "mailto:tonymed2022@gmail.com");
    await click(back.querySelector(".copy-email"));
    assert.equal(
      query(".contact-flip").dataset.flipped,
      "true",
      "Copy does not flip the card",
    );
    assert.equal(back.querySelectorAll("a[target='_blank']").length, 2);
    await act(async () =>
      back.dispatchEvent(
        new window.KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        }),
      ),
    );
    assert.equal(document.activeElement, open);
    assert.equal(back.hasAttribute("inert"), true);
    assert.equal(query(".contact-flip").dataset.reduced, "true");
    const pointer = new window.Event("click", { bubbles: true });
    await act(async () => front.querySelector("h2").dispatchEvent(pointer));
    assert.equal(query(".contact-flip").dataset.flipped, "true");
    await click(".flip-return");
  } finally {
    await act(async () => comparisonRoot.unmount());
    container.remove();
  }
});

test("classic contact comparison remains available without a second live contact", async () => {
  const { Contact } = await server.ssrLoadModule(
    "/src/components/FlipContact.tsx",
  );
  const container = document.createElement("div");
  document.body.append(container);
  const comparisonRoot = createRoot(container);
  const originalUrl = location.href;
  try {
    history.replaceState(null, "", "?contact=classic");
    await act(async () =>
      comparisonRoot.render(createElement(Contact, { language: "es" })),
    );
    assert.equal(container.querySelector(".contact-flip"), null);
    assert.equal(container.querySelectorAll("#contacto").length, 1);
    assert.ok(container.querySelector(".copy-email"));
    assert.match(container.querySelector("h2").textContent, /Construyamos/);
  } finally {
    await act(async () => comparisonRoot.unmount());
    container.remove();
    history.replaceState(null, "", originalUrl);
  }
});

test("reading progress and section marker share native scrolling with one viewport canvas", async () => {
  assert.equal(document.querySelectorAll(".dot-grid-backdrop").length, 1);
  const canvas = query(".dot-grid-backdrop");
  assert.equal(canvas.dataset.shared, "true");
  assert.equal(canvas.width, window.innerWidth);
  assert.equal(canvas.height, window.innerHeight);
  assert.equal(query(".reading-progress").getAttribute("aria-hidden"), "true");
  const about = query("#sobre-mi");
  await act(async () => {
    for (const observer of observers)
      if (observer.targets.has(about))
        observer.callback([{ target: about, isIntersecting: true }], observer);
  });
  const current = query('nav a[aria-current="location"]');
  assert.equal(current.getAttribute("href"), "#sobre-mi");
  assert.ok(current.querySelector(".nav-current-marker"));
  assert.equal(query(".site-shell").dataset.activeSection, "sobre-mi");
});

test("typewriter pauses for reading, deletes dynamic text, resets language and provides stable accessible copy", async () => {
  await changePreferences({ reduced: false, fine: false });
  const { Typewriter } = await server.ssrLoadModule(
    "/src/components/Typewriter.tsx",
  );
  const container = document.createElement("div");
  document.body.append(container);
  const typeRoot = createRoot(container);
  const dynamic = () =>
    container.querySelector(".typewriter-dynamic").textContent;
  try {
    await withComponentClock(async (advance) => {
      await act(async () =>
        typeRoot.render(
          createElement(Typewriter, { language: "es", running: true }),
        ),
      );
      assert.equal(dynamic(), "");
      await advance(1900);
      assert.equal(dynamic(), "ideas con propósito.");
      const alternative = container.querySelector(".sr-only").textContent;
      await advance(1700);
      assert.equal(
        dynamic(),
        "ideas con propósito.",
        "Full sentence remains readable",
      );
      await advance(650);
      assert.ok(
        dynamic().length < "ideas con propósito.".length,
        "Only dynamic copy is being erased",
      );
      assert.equal(
        container.querySelector(".typewriter-fixed").textContent,
        "Construyendo",
      );
      assert.equal(
        container.querySelector(".sr-only").textContent,
        alternative,
      );
      assert.equal(container.querySelectorAll("[aria-live]").length, 0);
      await act(async () =>
        typeRoot.render(
          createElement(Typewriter, { language: "en", running: true }),
        ),
      );
      assert.equal(dynamic(), "");
      assert.match(
        container.querySelector(".sr-only").textContent,
        /Building ideas with purpose/,
      );
      await advance(300);
      assert.equal(dynamic(), "i");
      await act(async () =>
        typeRoot.render(
          createElement(Typewriter, { language: "en", running: false }),
        ),
      );
      await advance(1000);
      assert.equal(dynamic(), "i", "Offscreen sequence pauses");
      await changePreferences({ reduced: true });
      assert.equal(dynamic(), "ideas with purpose.");
    });
  } finally {
    await act(async () => typeRoot.unmount());
    container.remove();
    await changePreferences({ reduced: true });
  }
});

test("hero contact is a direct native link for keyboard, mouse and touch", async () => {
  await changePreferences({ reduced: false, fine: true });
  const anchor = query(".hero-actions a[href='#contacto']");
  assert.match(anchor.textContent, /Hablemos|Let’s talk/);
  assert.equal(document.querySelectorAll(".hero-actions a[href='#contacto']").length, 1);
  assert.equal(anchor.querySelector(".follow-eyes"), null);
  assert.equal(document.querySelector(".cursor-trail"), null);
  const event = new window.MouseEvent("pointermove", { bubbles: true, cancelable: true });
  anchor.dispatchEvent(event);
  assert.equal(event.defaultPrevented, false);
  assert.equal(anchor.style.transform, "");
  await changePreferences({ reduced: true, fine: false });
});
test("one semantic reveal remains selectable and fully opaque in both languages and reduced motion", async () => {
  await language("es");
  await changePreferences({ reduced: false });
  const heading = query(".scroll-reveal-text");
  assert.equal(document.querySelectorAll(".scroll-reveal-text").length, 1);
  assert.equal(heading.tagName, "H3");
  assert.equal(heading.textContent, "Programar también es saber colaborar.");
  for (const word of heading.children) {
    assert.equal(word.style.opacity, "");
    assert.equal(word.style.filter, "");
    assert.equal(word.hasAttribute("aria-hidden"), false);
  }
  const range = document.createRange();
  range.selectNodeContents(heading);
  assert.equal(range.toString(), heading.textContent);
  await language("en");
  assert.match(
    heading.textContent,
    /Programming also means knowing how to collaborate/,
  );
  await changePreferences({ reduced: true });
  assert.equal(heading.dataset.static, "true");
  assert.equal(heading.children.length, 0, "Reduced motion renders plain text");
});

test("professional contact keeps every channel directly available across input modes and languages", async () => {
  await language("es");
  await changePreferences({ reduced: false, fine: true });
  const panel = query(".contact-composition");
  assert.equal(query("#contacto").dataset.contact, "professional");
  assert.match(query(".contact-invitation").textContent, /¿Tienes una idea\?Hagámosla realidad\./);
  assert.equal(query(".contact-invitation").getAttribute("aria-label"), "¿Tienes una idea? Hagámosla realidad.");
  assert.equal(query(".contact-support").textContent, "Disponible para trabajar y colaborar en nuevos proyectos. Escríbeme y conversemos.");
  const mail = panel.querySelector("a[href^='mailto:']");
  assert.equal(mail.getAttribute("href"), "mailto:tonymed2022@gmail.com");
  await act(async () => query(".language-toggle").focus());
  const previous = reactCommits;
  await act(async () => panel.dispatchEvent(new window.Event("pointerover", { bubbles: true })));
  assert.equal(reactCommits, previous, "Hover does not render a hidden contact face");
  assert.equal(document.activeElement, query(".language-toggle"));
  for (const link of panel.querySelectorAll("a")) {
    assert.equal(link.closest("[inert],[aria-hidden=true]"), null);
    await act(async () => link.focus());
    assert.equal(document.activeElement, link);
  }
  assert.equal(panel.querySelectorAll("a[target='_blank']").length, 2);
  await changePreferences({ fine: false, reduced: true });
  assert.equal(panel.querySelectorAll("a").length, 4);
  await language("en");
  assert.match(query(".contact-invitation").textContent, /Have an idea\?Let’s bring it to life\./);
  assert.equal(query(".contact-support").textContent, "Available for work and new collaborations. Get in touch.");
  assert.equal(document.querySelectorAll(".contact-invitation").length, 1);
  assert.equal(document.querySelector(".contact-flip"), null);
});
test("Morelia uses verified city coordinates, a front-facing marker and one deferred globe", async () => {
  const { professionalLocation: city } = await server.ssrLoadModule(
    "/src/data/location.ts",
  );
  assert.ok(Math.abs(city.latitude - 19.703333333) < 0.000001);
  assert.ok(Math.abs(city.longitude + 101.191944444) < 0.000001);
  assert.match(city.source, /inegi\.org\.mx/);
  const { onSphere, look, camera } =
    await import("../src/vendor/SextantGeometry.js");
  const point = look(
    onSphere(city.latitude, city.longitude),
    camera(city.longitude, city.latitude),
  );
  assert.ok(
    Math.abs(point[0]) < 0.00001 &&
      Math.abs(point[1]) < 0.00001 &&
      point[2] > 0.999,
    "Marker is centred on the visible hemisphere",
  );
  assert.equal(query(".location-globe figcaption").textContent, "Morelia, MX");
  await act(async () => {
    const figure = query(".location-globe");
    for (const observer of observers)
      if (observer.targets.has(figure))
        observer.callback(
          [{ target: figure, isIntersecting: true, intersectionRatio: 1 }],
          observer,
        );
    await new Promise((resolve) => setTimeout(resolve, 150));
  });
  const globe = query(".location-globe-canvas");
  assert.equal(Number(globe.dataset.latitude), city.latitude);
  assert.equal(Number(globe.dataset.longitude), city.longitude);
  assert.equal(document.querySelectorAll(".location-globe-canvas").length, 1);
  assert.equal(document.querySelectorAll(".dot-grid-backdrop").length, 1);
  assert.equal(globe.getAttribute("aria-hidden"), "true");
  const source = await readFile(
    "src/components/LocationGlobeCanvas.tsx",
    "utf8",
  );
  assert.doesNotMatch(source, /navigator\.geolocation|fetch\(/);
});

test("Dither name preserves semantic text and clears every temporary glyph", async () => {
  await changePreferences({ reduced: false });
  const { DitherName } = await server.ssrLoadModule(
    "/src/components/DitherName.tsx",
  );
  const container = document.createElement("div");
  document.body.append(container);
  const ditherRoot = createRoot(container);
  try {
    await act(async () =>
      ditherRoot.render(
        createElement(DitherName, {
          text: "José Antonio Medina Ayala",
          ready: false,
        }),
      ),
    );
    assert.equal(container.textContent, "José Antonio Medina Ayala");
    assert.equal(container.querySelector("[data-glyph]"), null);
    await act(async () =>
      ditherRoot.render(
        createElement(DitherName, {
          text: "José Antonio Medina Ayala",
          ready: true,
        }),
      ),
    );
    await act(async () => new Promise((resolve) => setTimeout(resolve, 90)));
    assert.ok(container.querySelector("[data-glyph]"));
    assert.equal(container.textContent, "José Antonio Medina Ayala");
    for (const overlay of container.querySelectorAll(".dither-glyph"))
      assert.equal(overlay.getAttribute("aria-hidden"), "true");
    await act(async () => new Promise((resolve) => setTimeout(resolve, 450)));
    assert.equal(container.querySelector("[data-glyph]"), null);
    assert.equal(container.textContent, "José Antonio Medina Ayala");
    await changePreferences({ reduced: true });
    assert.equal(container.querySelector("[data-glyph]"), null);
  } finally {
    await act(async () => ditherRoot.unmount());
    container.remove();
    await changePreferences({ reduced: true });
  }
});

test("arrival releases typewriter after welcome and its container reveal, without replay on language change", async () => {
  await changePreferences({ reduced: false, fine: false });
  const container = document.createElement("div");
  document.body.append(container);
  const arrivalRoot = createRoot(container);
  try {
    await withComponentClock(async (advance) => {
      await act(async () => arrivalRoot.render(createElement(App)));
      const hero = container.querySelector(".hero");
      assert.ok(
        [...observers].some((observer) => observer.targets.has(hero)),
        "New hero has a viewport observer",
      );
      await act(async () => {
        for (const observer of observers)
          if (observer.targets.has(hero))
            observer.callback(
              [{ target: hero, isIntersecting: true, intersectionRatio: 1 }],
              observer,
            );
      });
      assert.equal(
        container.querySelector(".site-shell").dataset.intro,
        "waiting",
      );
      assert.equal(
        container.querySelector(".hero-typewriter").dataset.running,
        "false",
      );
      await advance(1450);
      assert.equal(container.querySelector(".brand-welcome"), null);
      assert.equal(
        container.querySelector(".site-shell").dataset.intro,
        "ready",
      );
      await advance(699);
      assert.equal(
        container.querySelector(".hero-typewriter").dataset.running,
        "false",
      );
      await advance(1);
      assert.equal(
        container.querySelector(".intro-type").dataset.ready,
        "true",
        "Typewriter delay has completed",
      );
      assert.equal(
        container.querySelector(".intro-type").dataset.visible,
        "true",
        "Hero intersection sensor has entered",
      );
      assert.equal(
        container.querySelector(".hero-typewriter").dataset.running,
        "true",
      );
      await advance(300);
      assert.ok(
        container.querySelector(".typewriter-dynamic").textContent.length > 0,
      );
      await act(async () =>
        container.querySelector(".language-toggle").click(),
      );
      assert.equal(container.querySelector(".brand-welcome"), null);
      assert.equal(
        container.querySelector(".typewriter-dynamic").textContent,
        "",
      );
    });
  } finally {
    await act(async () => arrivalRoot.unmount());
    container.remove();
    await changePreferences({ reduced: true });
  }
});

test("optional profile and technology details use native disclosures and retain locale state", async () => {
  await language("es");
  const profile = query(".developer-details"), technologies = query(".technology-details");
  assert.equal(profile.tagName, "DETAILS");
  assert.equal(technologies.tagName, "DETAILS");
  assert.equal(profile.open, false);
  assert.equal(technologies.open, false);
  await click(profile.querySelector("summary"));
  await click(technologies.querySelector("summary"));
  assert.equal(profile.open, true);
  assert.equal(technologies.open, true);
  await language("en");
  assert.equal(profile.open, true);
  assert.equal(technologies.open, true);
  assert.match(technologies.querySelector("summary").textContent, /Explore technologies/);
  assert.match(profile.querySelector("summary").textContent, /Explore profile/);
  await click(profile.querySelector("summary"));
  await click(technologies.querySelector("summary"));
  assert.equal(profile.open, false);
  assert.equal(technologies.open, false);
});

test("portrait reveal waits for welcome and image, settles and pauses background outside view", async () => {
  await changePreferences({ reduced: false, fine: true, mobile: false });
  const { HeroPortrait } = await server.ssrLoadModule("/src/components/HeroPortrait.tsx");
  const container = document.createElement("div");
  document.body.append(container);
  const portraitRoot = createRoot(container);
  const render = enabled => portraitRoot.render(createElement(StrictMode, null, createElement(HeroPortrait, { language: "es", enabled })));
  const intersect = async value => act(async () => {
    const host = container.querySelector(".editorial-portrait");
    for (const observer of observers) if (observer.targets.has(host)) observer.callback([{ target: host, isIntersecting: value, intersectionRatio: value ? 1 : 0 }], observer);
  });
  try {
    await act(async () => render(false));
    await intersect(true);
    await act(async () => container.querySelector("img").dispatchEvent(new window.Event("load")));
    assert.equal(container.querySelector("figure").dataset.entered, "false");
    await act(async () => render(true));
    await act(async () => new Promise(resolve => setTimeout(resolve, 1400)));
    const host = container.querySelector("figure");
    assert.equal(host.dataset.entered, "true");
    assert.equal(host.dataset.ambient, "true");
    assert.equal(host.dataset.tracking, "true");
    assert.match(container.querySelector(".portrait-reveal-mask").style.clipPath, /inset\(0 0 0/);
    const touch = new window.Event("pointermove", { bubbles: true, cancelable: true });
    Object.defineProperty(touch, "pointerType", { value: "touch" });
    host.dispatchEvent(touch);
    assert.equal(touch.defaultPrevented, false);
    assert.equal(host.hasAttribute("data-lenis-prevent"), false);
    await intersect(false);
    assert.equal(host.dataset.ambient, "false");
    assert.equal(host.dataset.tracking, "false");
    await changePreferences({ reduced: true, mobile: true });
    await intersect(true);
    assert.equal(host.dataset.ambient, "false");
    assert.equal(host.dataset.tracking, "false");
    assert.equal(container.querySelector(".portrait-image-zoom").style.transform, "scale(1)");
  } finally {
    await act(async () => portraitRoot.unmount());
    container.remove();
    await changePreferences({ reduced: true, fine: false, mobile: false });
  }
});

test("kinetic contact lifts characters by proximity without React commits or moving contact links", async () => {
  await language("es");
  await changePreferences({ reduced: false, fine: true });
  const heading = query(".contact-invitation"), glyph = heading.querySelector(".kinetic-character");
  const originalRect = heading.getBoundingClientRect;
  const originalGlyphRect = glyph.getBoundingClientRect;
  heading.getBoundingClientRect = () => ({ left: 0, top: 0, width: 600, height: 120 });
  glyph.getBoundingClientRect = () => ({ left: 80, top: 30, width: 20, height: 40 });
  try {
    await act(async () => {
      for (const observer of observers) if (observer.targets.has(heading)) observer.callback([{ target: heading, isIntersecting: true, intersectionRatio: 1 }], observer);
    });
    heading.dispatchEvent(new window.Event("pointerenter"));
    const previous = reactCommits;
    const event = new window.Event("pointermove", { bubbles: true, cancelable: true });
    Object.defineProperties(event, { pointerType: { value: "mouse" }, clientX: { value: 90 }, clientY: { value: 50 } });
    heading.dispatchEvent(event);
    await new Promise(resolve => setTimeout(resolve, 180));
    assert.match(glyph.style.transform, /translateY\(-[\d.]+px\) scale/);
    assert.equal(reactCommits, previous);
    assert.equal(event.defaultPrevented, false);
    assert.equal(query(".contact-address").style.transform, "");
    assert.equal(heading.getAttribute("aria-label"), "¿Tienes una idea? Hagámosla realidad.");
    await changePreferences({ reduced: true });
    assert.equal(glyph.style.transform, "");
    assert.equal(heading.dataset.static, "true");
    await language("en");
    assert.equal(heading.getAttribute("aria-label"), "Have an idea? Let’s bring it to life.");
  } finally {
    heading.getBoundingClientRect = originalRect;
    glyph.getBoundingClientRect = originalGlyphRect;
    await changePreferences({ reduced: true, fine: false });
  }
});

