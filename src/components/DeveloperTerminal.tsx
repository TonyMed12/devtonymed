import type { Language } from "../data/i18n";
import { profile, read } from "../data/experience";

export function DeveloperTerminal({ language }: { language: Language }) {
  const values = Object.entries(profile.terminal);
  return (
    <div
      className="profile-terminal"
      data-testid="developer-terminal"
      aria-label={
        language === "es"
          ? "Mi perfil en formato JSON"
          : "My profile in JSON format"
      }
    >
      <div className="terminal-bar">
        developer.json{" "}
        <span className="terminal-locale">{language.toUpperCase()}</span>
      </div>
      <pre>
        <code>
          <span>{"{"}</span>
          {values.map(([key, value], index) => (
            <span key={key}>
              {"\n"} "{language === "es" ? ({ role: "rol", focus: "enfoque", approach: "método", availability: "disponibilidad" } as Record<string, string>)[key] : key}": <b>"{read(value, language)}"</b>
              {index < values.length - 1 ? "," : ""}
            </span>
          ))}
          {"\n"}
          <span>{"}"}</span>
        </code>
      </pre>
      <span className="terminal-foot">
        {language === "es"
          ? "Comprender. Colaborar. Desarrollar."
          : "Understand. Collaborate. Build."}
        <span aria-hidden="true">↵</span>
      </span>
    </div>
  );
}
