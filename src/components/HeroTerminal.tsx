import type { Language } from "../data/i18n";
import { profile, read } from "../data/experience";
import { principles } from "../data/principles";
import { Terminal } from "./ui/terminal";

// Floating terminal in the hero. It talks about the author, using the site's own profile data.
export function HeroTerminal({ language }: { language: Language }) {
  const es = language === "es";
  const names = principles.map((item) => read(item.name, language));
  return (
    <div className="hero-terminal">
      <Terminal
        username="tonymed"
        commands={["whoami", "cat stack.txt", es ? "cat busco.txt" : "cat seeking.txt"]}
        outputs={{
          0: [read(profile.role, language)],
          1: ["React · TypeScript · Node.js · PostgreSQL"],
          2: [
            read(profile.availability, language),
            "Morelia · Querétaro · León · Acámbaro",
            names.join(" · "),
          ],
        }}
        typingSpeed={40}
        delayBetweenCommands={700}
        initialDelay={400}
        enableSound={false}
      />
    </div>
  );
}
