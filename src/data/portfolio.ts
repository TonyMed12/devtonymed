// Confirmed facts live here; add evidence before filling pending contribution fields.
export type Project = {
  id: string;
  title: string;
  academicTitle?: string;
  context: string;
  description?: [string, string];
  role?: string;
  myContribution?: string;
  myContributionEn?: string;
  technologies: string[];
  mainTechnologies: string[];
  image?: string;
  accent: string;
  repository?: string;
  demo?: string;
  detailsPending?: boolean;
  authors?: string[];
  documentedStatus?: { es: string; en: string };
};

export const projects: Project[] = [
  {
    id: "projexus",
    title: "ProjeXus",
    description: [
      "Convocatorias y concursos para ICTI Michoacán.",
      "Calls and competitions for ICTI Michoacán.",
    ],
    context:
      "Trabajo académico colaborativo relacionado con convocatorias y concursos de ICTI Michoacán.",
    role: "Scrum Master y coordinación",
    myContribution:
      "Scrum Master: coordinación del trabajo del equipo y seguimiento del proyecto.",
    myContributionEn: "Scrum Master · work coordination and project follow-up.",
    technologies: ["Next.js", "Spring Boot", "Tailwind CSS", "TypeScript"],
    mainTechnologies: ["Next.js", "Spring Boot", "TypeScript"],
    image: "/projexus2.png",
    accent: "lime",
    detailsPending: true,
  },
  {
    id: "caam",
    title: "Centro de Atención Animal de Morelia",
    description: [
      "Adopciones, registro y seguimiento de mascotas y horarios veterinarios para el Centro de Atención Animal de Morelia.",
      "Pet adoption, registration, follow-up and veterinary scheduling for Centro de Atención Animal de Morelia.",
    ],
    context: "Proyecto de equipo para el Centro de Atención Animal de Morelia.",
    role: "Liderazgo y coordinación frontend/backend",
    myContribution:
      "Liderazgo, definición de épicas, documentación de requisitos y coordinación entre frontend y backend.",
    myContributionEn:
      "Leadership, epic definition, requirements and frontend/backend coordination.",
    technologies: [],
    mainTechnologies: [],
    accent: "coral",
    detailsPending: true,
  },
  {
    id: "todo",
    title: "Aplicación To Do",
    context: "Proyecto académico de cuarto semestre para gestionar tareas.",
    description: [
      "Gestión de tareas desarrollada en paralelo en C# y Java, con una base de datos SQL y relaciones de muchos a muchos.",
      "Task management developed in parallel in C# and Java, with a SQL database and many-to-many relationships.",
    ],
    technologies: ["C#", "Java", "SQL"],
    mainTechnologies: ["C#", "Java", "SQL"],
    accent: "blue",
    detailsPending: true,
  },
  {
    id: "aquamarine",
    title: "Aquamarine Resort",
    description: [
      "Concepto web de resort con un flujo de reservación.",
      "Resort website concept with a booking flow.",
    ],
    context: "Proyecto académico.",
    technologies: ["HTML", "CSS", "JavaScript"],
    mainTechnologies: ["HTML", "JavaScript"],
    image: "/aquama.png",
    accent: "lavender",
    detailsPending: true,
  },
  {
    id: "library",
    title: "Biblioteca Digital CBTis 147",
    context: "Proyecto académico para CBTis 147.",
    technologies: ["PHP", "Bootstrap", "MySQL"],
    mainTechnologies: ["PHP", "MySQL"],
    image: "/biblio.jpg",
    accent: "blue",
    detailsPending: true,
  },
  {
    id: "fraud-detection",
    title: "Detección de fraude con aprendizaje automático",
    description: [
      "Investigación en equipo sobre modelos predictivos para detectar fraude y phishing.",
      "Team research on predictive models for fraud and phishing detection.",
    ],
    myContribution:
      "Coautor y colaborador en investigación. Aportación técnica individual pendiente de documentar.",
    myContributionEn:
      "Research co-author and collaborator. Individual technical contribution to be documented.",
    academicTitle:
      "Técnicas de aprendizaje automático aplicadas al análisis transaccional para detección de fraude y phishing",
    context:
      "Proyecto académico de Taller de Investigación II, Instituto Tecnológico de Morelia.",
    role: "Coautor y colaborador en investigación",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "XGBoost",
      "imbalanced-learn",
      "PostgreSQL",
      "Matplotlib",
      "Seaborn",
    ],
    mainTechnologies: ["Python", "scikit-learn", "XGBoost"],
    accent: "sky",
    repository: "https://github.com/Cesaredmyt/fraud-detection-itm",
    documentedStatus: {
      es: "Evaluación experimental documentada en el README del equipo (17 de mayo de 2026).",
      en: "Experimental evaluation documented in the team README (May 17, 2026).",
    },
    detailsPending: true,
    authors: ["José Antonio Medina Ayala", "Cesar Enrique Díaz Maldonado"],
  },
];

export type Technology = {
  id: string;
  name: string;
  category: "web" | "backend" | "data" | "tools";
  application: string;
  logo?: string;
  personal: boolean;
  projectId?: string;
};

export const technologies: Technology[] = [
  {
    id: "springboot",
    name: "Spring Boot",
    category: "backend",
    application: "Backend del equipo de ProjeXus.",
    logo: "/tech/springboot.svg",
    personal: false,
    projectId: "projexus",
  },
  {
    id: "csharp",
    name: "C#",
    category: "backend",
    application: "Programación de la aplicación To Do en cuarto semestre.",
    logo: "/tech/csharp.svg",
    personal: true,
    projectId: "todo",
  },
  {
    id: "sql",
    name: "SQL",
    category: "data",
    application:
      "Modelado relacional con relaciones de muchos a muchos en To Do.",
    personal: true,
    projectId: "todo",
  },
  {
    id: "react",
    name: "React",
    category: "web",
    application: "Interfaces y componentes reutilizables.",
    logo: "/react.svg",
    personal: true,
    projectId: "portfolio",
  },
  {
    id: "next",
    name: "Next.js",
    category: "web",
    application: "Aplicaciones web y proyectos académicos.",
    personal: true,
    projectId: "projexus",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "web",
    application: "Desarrollo tipado en aplicaciones web.",
    personal: true,
    projectId: "projexus",
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "web",
    application: "Interacción y lógica de interfaces.",
    logo: "/tech/js.webp",
    personal: true,
    projectId: "aquamarine",
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    application: "Desarrollo del lado del servidor.",
    logo: "/tech/node.png",
    personal: true,
  },
  {
    id: "html",
    name: "HTML",
    category: "web",
    application: "Estructura semántica de sitios web.",
    logo: "/tech/html.png",
    personal: true,
    projectId: "aquamarine",
  },
  {
    id: "css",
    name: "CSS",
    category: "web",
    application: "Diseño visual y responsive.",
    logo: "/tech/css.png",
    personal: true,
    projectId: "aquamarine",
  },
  {
    id: "php",
    name: "PHP",
    category: "backend",
    application: "Sistemas web académicos.",
    personal: true,
    projectId: "library",
  },
  {
    id: "java",
    name: "Java",
    category: "backend",
    application: "Programación y fundamentos backend.",
    logo: "/tech/java.png",
    personal: true,
    projectId: "todo",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "web",
    application: "Sistemas de diseño y estilos rápidos.",
    logo: "/tech/tw.png",
    personal: true,
    projectId: "projexus",
  },
  {
    id: "python",
    name: "Python",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "pandas",
    name: "Pandas",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "numpy",
    name: "NumPy",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "scikit",
    name: "scikit-learn",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "xgboost",
    name: "XGBoost",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "imbalanced",
    name: "imbalanced-learn",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "matplotlib",
    name: "Matplotlib",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "seaborn",
    name: "Seaborn",
    category: "data",
    application: "Stack documentado del proyecto de fraude.",
    personal: false,
    projectId: "fraud-detection",
  },
  {
    id: "figma",
    name: "Figma",
    category: "tools",
    application: "Diseño y exploración de interfaces.",
    logo: "/tech/figma.png",
    personal: true,
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    application: "Repositorios y colaboración.",
    logo: "/tech/github.png",
    personal: true,
  },
  {
    id: "jira",
    name: "Jira",
    category: "tools",
    application: "Seguimiento y coordinación de tareas.",
    logo: "/tech/ji.svg",
    personal: true,
  },
];

export const credentials = [
  {
    id: "google-project-management",
    title: "Google Project Management",
    issuer: "Google · Coursera",
    credentialId: "5NQH6NW32M0E",
  },
  {
    id: "secure-software",
    title: "Desarrollo de Software Seguro",
    issuer: "Universitat Politècnica de València (UPV)",
    credentialId: "FCPU03M13IV",
  },
];

export const learning = ["AWS", "GCI"];

export const research = {
  title: "Aprendizaje automático para seguridad web en la nube",
  fullTitle:
    "Integración de aprendizaje automático para fortalecer la seguridad de la información en el desarrollo web en la nube: revisión sistemática",
  program: "Estancia de investigación del Programa Delfín",
  location: "Barranquilla, Colombia",
  host: "Corporación Universitaria Latinoamericana",
  period: "Verano de 2025",
  advisor: "Mg. Lilly Susana Salgado Salgado",
  area: "Área VII: Ingeniería e Industria",
  outcome: "Elaboración de un artículo de revisión sistemática no publicado.",
  event:
    "Presentado en el Congreso Internacional del XXX Verano de la Investigación Científica y Tecnológica del Pacífico.",
};

export const timeline = [
  {
    id: "isc",
    year: "2022–actualidad",
    title: "Ingeniería en Sistemas Computacionales",
    subtitle:
      "Especialidad en Tecnologías de Desarrollo de Software · Instituto Tecnológico de Morelia · TecNM",
    status: "9.º semestre",
    href: "#formacion",
  },
  {
    id: "cbtis",
    year: "2019–2022",
    title: "Técnico en Programación",
    subtitle: "CBTis 147",
    status: "Formación completada",
    href: "#formacion",
  },
  {
    id: "delfin",
    year: "Verano de 2025",
    title: "Estancia Programa Delfín",
    subtitle:
      "Corporación Universitaria Latinoamericana · Barranquilla, Colombia",
    status: "Investigación",
    href: "#investigacion",
  },
  {
    id: "fraud",
    year: "",
    title: "Investigación de fraude",
    subtitle: "Taller de Investigación II · Instituto Tecnológico de Morelia",
    status: "Proyecto de investigación",
    href: "#fraud-detection",
  },
];
