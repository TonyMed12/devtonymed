import { copy, type Language } from "../data/i18n";
import { techCategories, techStack, type TechItem } from "../data/techStack";
import { TechnologyIcon } from "./Icons";

const label = "text-xs font-bold uppercase tracking-widest text-(--muted)";

function TechIcon({ item }: { item: TechItem }) {
  return item.icon ? (
    <span className="technology-icon" aria-hidden="true"><img src={item.icon} alt="" loading="lazy" /></span>
  ) : (
    <TechnologyIcon name={item.name} />
  );
}

// variant "chips": una fila de chips por categoría. variant "cards": una tarjeta por categoría con nivel y proyecto.
export function TechStack({ language, variant = "chips" }: { language: Language; variant?: "cards" | "chips" }) {
  const t = copy[language].tech.stack;
  const groups = techCategories.map((category) => ({
    category,
    items: techStack.filter((item) => item.category === category),
  }));

  if (variant === "cards")
    return (
      <div className="tech-stack grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-variant="cards">
        {groups.map(({ category, items }) => (
          <section key={category} className="rounded-2xl border border-(--line) bg-(--surface) p-5 transition-colors hover:border-(--accent)">
            {/* "!" porque las reglas globales de h3 (fuera de capas) ganan a las utilidades de Tailwind. */}
            <h3 className={`${label} mb-4! text-xs! leading-4! tracking-widest!`}>{t.categories[category]}</h3>
            <ul className="grid gap-3">
              {items.map((item) => (
                <li key={item.name} className="tech-item flex items-center gap-3" data-level={item.level}>
                  <TechIcon item={item} />
                  <span className="min-w-0">
                    <span className={`block text-(--ink) ${item.level === "core" ? "font-bold" : ""}`}>{item.name}</span>
                    {item.note && <span className="block text-sm text-(--muted)">{item.note[language === "es" ? 0 : 1]}</span>}
                  </span>
                  <span className={`ml-auto shrink-0 rounded-full border px-2.5 py-0.5 text-xs ${item.level === "core" ? "border-(--accent) font-bold text-(--accent)" : "border-(--line) text-(--muted)"}`}>
                    {t.levels[item.level]}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    );

  return (
    <div className="tech-stack rounded-2xl border border-(--line) bg-(--surface) p-5 sm:p-6" data-variant="chips">
      <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-[max-content_1fr] sm:gap-y-4">
        {groups.map(({ category, items }) => (
          <div key={category} className="contents">
            <dt className={`${label} sm:pt-2.5`}>{t.categories[category]}</dt>
            <dd className="m-0 mb-3 sm:mb-0">
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item.name}
                    data-level={item.level}
                    className={`tech-item inline-flex min-h-9 items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors hover:border-(--accent) ${
                      item.level === "core" ? "border-(--accent) bg-(--accent)/10 font-bold text-(--ink)" : "border-(--line) text-(--ink)"
                    }`}
                  >
                    <TechIcon item={item} />
                    {item.name}
                    {item.level === "learning" && <em className="text-xs not-italic text-(--muted)">{t.levels.learning.toLowerCase()}</em>}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-(--line) pt-4 text-xs text-(--muted)">
        <span className="inline-flex items-center gap-2">
          <i className="inline-block size-3 rounded-full border border-(--accent) bg-(--accent)/10" aria-hidden="true" />
          {t.levels.core}
        </span>
        <span className="inline-flex items-center gap-2">
          <i className="inline-block size-3 rounded-full border border-(--line)" aria-hidden="true" />
          {t.levels.used}
        </span>
      </p>
    </div>
  );
}
