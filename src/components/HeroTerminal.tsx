import type { Language } from "../data/i18n";
import { profile, read } from "../data/experience";
import { Terminal } from "./ui/terminal";

// Short hash + message, newest first. The hashes are decorative; the milestones are real.
const LOG: [string, string, string][] = [
  ["a3f9c21", "1.er lugar HackaPony 2026", "1st place HackaPony 2026"],
  ["b82e7d4", "Alvare Ditana en producción", "Alvare Ditana live"],
  ["c61d0a9", "AWS Cloud Operations (Netec)", "AWS Cloud Operations (Netec)"],
  ["d40b5e8", "Software seguro (UPV)", "Secure software (UPV)"],
  ["e19c3f2", "Ponente · Verano del Pacífico", "Speaker · Pacific Summer"],
];

// Floating terminal in the hero: the author's milestones as a commit history.
export function HeroTerminal({ language }: { language: Language }) {
  const es = language === "es";
  return (
    <div className="hero-terminal">
      <Terminal
        username="tonymed"
        commands={["whoami", "git log --oneline -5", es ? "cat disponibilidad.txt" : "cat availability.txt"]}
        outputs={{
          0: [read(profile.role, language)],
          1: LOG.map(([hash, mensaje, message]) => `${hash} ${es ? mensaje : message}`),
          2: [read(profile.availability, language), "Morelia · Querétaro · León · Acámbaro"],
        }}
        typingSpeed={40}
        delayBetweenCommands={700}
        initialDelay={400}
        enableSound={false}
      />
    </div>
  );
}
