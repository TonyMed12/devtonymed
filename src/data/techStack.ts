export type TechCategory = "languages" | "frontend" | "backend" | "data" | "cloud" | "tools";
export type TechLevel = "core" | "used" | "learning";

export type TechItem = {
  name: string;
  category: TechCategory;
  level: TechLevel;
  // Ruta en /public. Sin ella se usa el logo que TechnologyIcon resuelve por nombre (o el ícono genérico).
  icon?: string;
  // Dónde se usó: [es, en].
  note?: [string, string];
};

export const techCategories: TechCategory[] = ["languages", "frontend", "backend", "data", "cloud", "tools"];

export const techStack: TechItem[] = [
  { name: "Java", category: "languages", level: "core", note: ["Fundamentos y backend", "Fundamentals and backend"] },
  { name: "TypeScript", category: "languages", level: "core", note: ["RutaSegura, Alvare Ditana y ProjeXus", "RutaSegura, Alvare Ditana and ProjeXus"] },
  { name: "JavaScript", category: "languages", level: "core", note: ["Aquamarine y Velto Store", "Aquamarine and Velto Store"] },
  { name: "Python", category: "languages", level: "used", note: ["Detección de fraude", "Fraud detection"] },
  { name: "SQL", category: "languages", level: "used", note: ["Modelado y consultas", "Modeling and queries"] },

  { name: "React", category: "frontend", level: "core", note: ["Este portafolio", "This portfolio"] },
  { name: "Next.js", category: "frontend", level: "core", note: ["RutaSegura, Alvare Ditana y ProjeXus", "RutaSegura, Alvare Ditana and ProjeXus"] },
  { name: "Tailwind CSS", category: "frontend", level: "used", note: ["RutaSegura y Alvare Ditana", "RutaSegura and Alvare Ditana"] },

  { name: "Spring Boot", category: "backend", level: "used", note: ["ProjeXus (equipo)", "ProjeXus (team)"] },
  { name: "Supabase", icon: "/tech/supabase.svg", category: "backend", level: "used", note: ["RutaSegura: tiempo real y RLS", "RutaSegura: realtime and RLS"] },
  { name: "Django", icon: "/tech/django.svg", category: "backend", level: "used" },

  { name: "PostgreSQL", category: "data", level: "used", note: ["ProjeXus", "ProjeXus"] },
  { name: "MySQL", icon: "/tech/mysql.svg", category: "data", level: "used", note: ["Biblioteca Digital", "Digital Library"] },
  { name: "scikit-learn", category: "data", level: "used", note: ["Detección de fraude", "Fraud detection"] },
  { name: "Pandas", category: "data", level: "used", note: ["Detección de fraude", "Fraud detection"] },

  { name: "Docker", icon: "/tech/docker.svg", category: "cloud", level: "used" },
  { name: "Vercel", icon: "/tech/vercel.svg", category: "cloud", level: "used", note: ["RutaSegura y Alvare Ditana", "RutaSegura and Alvare Ditana"] },
  { name: "AWS", icon: "/tech/aws.svg", category: "cloud", level: "learning", note: ["Curso Cloud Operations on AWS · 25 h", "Cloud Operations on AWS course · 25 h"] },

  { name: "Git", icon: "/tech/git.svg", category: "tools", level: "core", note: ["Todos los proyectos", "Every project"] },
  { name: "Vitest", icon: "/tech/vitest.svg", category: "tools", level: "used", note: ["Pruebas de este portafolio", "Tests for this portfolio"] },
  { name: "Pytest", icon: "/tech/pytest.svg", category: "tools", level: "used" },
  { name: "Jira", category: "tools", level: "used", note: ["Scrum Master", "Scrum Master"] },
];
