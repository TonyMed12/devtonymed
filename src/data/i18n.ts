export type Language = "es" | "en";
export const copy = {
  es: {
    tech: {
      applications: {
        react: "Interfaces y componentes reutilizables.",
        next: "Aplicaciones web y proyectos académicos.",
        typescript: "Desarrollo tipado en aplicaciones web.",
        javascript: "Interacción y lógica de interfaces.",
        node: "Desarrollo del lado del servidor.",
        html: "Estructura semántica de sitios web.",
        css: "Diseño visual y responsive.",
        php: "Sistemas web académicos.",
        java: "Programación y fundamentos backend.",
        tailwind: "Sistemas de diseño y estilos rápidos.",
        figma: "Diseño y exploración de interfaces.",
        github: "Repositorios y colaboración.",
        jira: "Seguimiento y coordinación de tareas.",
        project: "Tecnologías del proyecto de equipo.",
      },
      stack: {
        title: "De la idea al código.",
        lead: "Mi stack de un vistazo. Resaltado lo que más uso; el resto lo he usado en proyectos o cursos.",
        categories: {
          languages: "Lenguajes",
          frontend: "Frontend",
          backend: "Backend",
          data: "Datos y ML",
          cloud: "Nube y DevOps",
          tools: "Herramientas",
        },
        levels: { core: "Uso principal", used: "He usado", learning: "Aprendiendo" },
      },
    },
  },
  en: {
    tech: {
      applications: {
        react: "Reusable interfaces and components.",
        next: "Web applications and academic projects.",
        typescript: "Typed development for web applications.",
        javascript: "Interface interaction and logic.",
        node: "Server-side development.",
        html: "Semantic website structure.",
        css: "Visual design and responsive layouts.",
        php: "Academic web systems.",
        java: "Programming and backend fundamentals.",
        tailwind: "Design systems and fast styling.",
        figma: "Interface design and exploration.",
        github: "Repositories and collaboration.",
        jira: "Task tracking and coordination.",
        project: "Technologies used in the team project.",
      },
      stack: {
        title: "From idea to code.",
        lead: "My stack at a glance. Highlighted is what I use most; the rest I have used in projects or courses.",
        categories: {
          languages: "Languages",
          frontend: "Frontend",
          backend: "Backend",
          data: "Data and ML",
          cloud: "Cloud and DevOps",
          tools: "Tools",
        },
        levels: { core: "Main use", used: "Have used", learning: "Learning" },
      },
    },
  },
} as const;
