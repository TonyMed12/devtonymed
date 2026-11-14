import type { Language } from "./i18n";
import { site } from "./site";
export type Localized = { es: string; en: string };
export const localized = (es: string, en: string): Localized => ({ es, en });
export const read = (value: Localized, language: Language) => value[language];

export const profile = {
  role: localized(
    "Desarrollador Full-Stack Junior",
    "Junior Full-Stack Developer",
  ),
  availability: localized(
    "Busco residencia profesional o prácticas",
    "Seeking a professional residency or internship",
  ),
  heading: localized("De la idea", "From idea"),
  headingAccent: localized("al código.", "to code."),
  intro: localized(
    "Desarrollo soluciones web y conecto la construcción de software con una planificación clara. Mi experiencia combina tecnologías frontend y backend, modelado de datos y coordinación de equipos.",
    "I develop web solutions and connect software development with clear planning. My experience combines frontend and backend technologies, data modeling and team coordination.",
  ),
  degree: localized(
    "Estudiante de Ingeniería en Sistemas Computacionales.",
    "I am currently studying Computer Systems Engineering.",
  ),
  description: site.description,
  terminal: {
    role: localized("Full-Stack Junior", "Junior Full-Stack Developer"),
    focus: localized("desarrollo de software", "software development"),
    approach: localized(
      "comprender, planificar, desarrollar",
      "understand, plan, build",
    ),
    availability: localized(
      "disponible para colaborar",
      "available to collaborate",
    ),
  },
};

export type ProjectStory = {
  title: Localized;
  context: Localized;
  kind: "coordination" | "implementation" | "research";
  contribution: Localized;
  work: Localized[];
  scope?: Localized;
  period?: Localized;
  learning: Localized;
};
const coordinationWork = [
  localized(
    "Distribución y seguimiento de tareas en un equipo de cinco personas.",
    "Task distribution and follow-up in a five-person team.",
  ),
  localized(
    "Participación en dailys y planificación del software.",
    "Participation in daily meetings and software planning.",
  ),
  localized(
    "Elaboración de ERS y modelado de procesos con BPMN.",
    "Software requirements specification (SRS) and BPMN process modeling.",
  ),
];
export const projectStories: Record<string, ProjectStory> = {
  projexus: {
    title: localized("ProjeXus", "ProjeXus"),
    context: localized(
      "Proyecto académico colaborativo · ICTI Michoacán",
      "Academic team project · ICTI Michoacán",
    ),
    kind: "coordination",
    contribution: localized(
      "Scrum Master · equipo de cinco personas.",
      "Scrum Master · five-person team.",
    ),
    work: coordinationWork,
    scope: localized(
      "El equipo separó el frontend con Next.js y el backend con Spring Boot. Mi participación se centró en la coordinación, los requisitos y la planificación.",
      "The team separated a Next.js frontend from a Spring Boot backend. My involvement focused on coordination, requirements and planning.",
    ),
    learning: localized(
      "Relaciono esta experiencia con la importancia de hacer visibles los requisitos, repartir responsabilidades y mantener el seguimiento del trabajo.",
      "I connect this experience with making requirements visible, distributing responsibilities and maintaining work follow-up.",
    ),
  },
  caam: {
    title: localized(
      "Centro de Atención Animal de Morelia",
      "Centro de Atención Animal de Morelia",
    ),
    context: localized(
      "Proyecto colaborativo · atención animal",
      "Collaborative project · animal care",
    ),
    kind: "coordination",
    contribution: localized(
      "Scrum Master · equipo de cinco personas.",
      "Scrum Master · five-person team.",
    ),
    work: [
      localized(
        "Coordinación y planificación del software en un equipo de cinco personas.",
        "Software coordination and planning in a five-person team.",
      ),
      localized(
        "Definición de épicas, documentación de requisitos y coordinación entre frontend y backend.",
        "Epic definition, requirements documentation and frontend/backend coordination.",
      ),
    ],
    scope: localized(
      "Participé en la planificación del software para adopciones, registro y seguimiento de mascotas y horarios veterinarios.",
      "I contributed to software planning for adoption, pet registration and follow-up, and veterinary scheduling.",
    ),
    learning: localized(
      "Esta experiencia conecta mi trabajo de coordinación con la definición de una necesidad concreta y su organización en requisitos y tareas.",
      "This experience connects my coordination work with defining a concrete need and organizing it into requirements and tasks.",
    ),
  },
  aquamarine: {
    title: localized("Aquamarine Resort", "Aquamarine Resort"),
    context: localized(
      "Proyecto académico · desarrollo web",
      "Academic project · web development",
    ),
    kind: "implementation",
    contribution: localized(
      "Participación en un proyecto académico de interfaz web.",
      "Participation in an academic web interface project.",
    ),
    work: [
      localized(
        "Concepto de interfaz web para un resort con un flujo de reservación.",
        "Resort web interface concept with a booking flow.",
      ),
    ],
    learning: localized(
      "Relaciono este proyecto con la estructura, el estilo y la interacción de una interfaz web.",
      "I connect this project with the structure, styling and interaction of a web interface.",
    ),
  },
  "fraud-detection": {
    title: localized(
      "Detección de fraude con aprendizaje automático",
      "Fraud detection with machine learning",
    ),
    context: localized(
      "Investigación académica · Instituto Tecnológico de Morelia",
      "Academic research · Instituto Tecnológico de Morelia",
    ),
    kind: "research",
    contribution: localized(
      "Coautor y colaborador en investigación.",
      "Research co-author and collaborator.",
    ),
    work: [
      localized(
        "Investigación en equipo sobre modelos predictivos para detectar fraude y phishing.",
        "Team research on predictive models for fraud and phishing detection.",
      ),
    ],
    learning: localized(
      "Esta experiencia vincula mi interés por los datos con la evaluación experimental y la investigación en equipo.",
      "This experience connects my interest in data with experimental evaluation and team research.",
    ),
  },
  velto: {
    title: localized("Velto Store", "Velto Store"),
    context: localized("Proyecto académico · comercio electrónico", "Academic project · e-commerce"),
    kind: "implementation",
    contribution: localized("Interfaz de catálogo y carrito.", "Catalog interface and cart."),
    work: [localized("Desarrollo de la tienda web de sneakers.", "Development of the sneaker web store.")],
    learning: localized("Practiqué la organización de una interfaz de compra.", "I practiced organizing a shopping interface."),
  },
  library: {
    title: localized("Biblioteca Digital CBTis 147", "CBTis 147 Digital Library"),
    context: localized("Proyecto académico · CBTis 147", "Academic project · CBTis 147"),
    kind: "implementation",
    contribution: localized("Esquema MySQL y operaciones CRUD.", "MySQL schema and CRUD operations."),
    work: [localized("Gestión de libros y equipo de una biblioteca escolar.", "Management of books and equipment for a school library.")],
    learning: localized("Practiqué el modelado de datos para un sistema de inventario y préstamos.", "I practiced data modeling for an inventory and loans system."),
  },
};

export type Credential = {
  id: string;
  issuer: string;
  logo: string;
  mark: string;
  title: Localized;
  status: Localized;
  description: Localized;
  relation: Localized;
  evidence: Localized;
  format?: Localized;
  credits?: string;
  credentialId?: string;
  url?: string;
};
export const credentialGallery: Credential[] = [
  {
    id: "google",
    issuer: "Google · Coursera",
    logo: "/institutions/google.svg",
    mark: "G",
    title: localized("Google Project Management", "Google Project Management"),
    status: localized("Curso completado", "Course completed"),
    description: localized(
      "Estudié gestión de proyectos para complementar mi experiencia en la organización y coordinación de equipos.",
      "I studied project management to complement my experience organizing and coordinating teams.",
    ),
    relation: localized(
      "Conecto esta formación con mi participación como Scrum Master y el seguimiento del trabajo colaborativo.",
      "I connect this training with my involvement as Scrum Master and collaborative work follow-up.",
    ),
    evidence: localized(
      "Formación en gestión de proyectos.",
      "Project management education.",
    ),
    credentialId: "5NQH6NW32M0E",
  },
  {
    id: "upv",
    issuer: "Universitat Politècnica de València",
    logo: "/institutions/upv.svg",
    mark: "UPV",
    format: localized("Microcredencial", "Microcredential"),
    credits: "3 ECTS",
    title: localized(
      "Desarrollo de Software Seguro",
      "Secure Software Development",
    ),
    status: localized("Curso completado", "Course completed"),
    description: localized(
      "Mi formación en desarrollo de software seguro aborda la integración de la seguridad desde las primeras fases del desarrollo, el uso de estándares y guías de programación segura, la evaluación de riesgos y el análisis de vulnerabilidades.",
      "My secure software development education covers integrating security from the earliest stages of development, secure programming standards and guidelines, risk assessment and vulnerability analysis.",
    ),
    relation: localized(
      "Relaciono esta formación con mi interés por la seguridad de la información y el desarrollo de software.",
      "I connect this training with my interest in information security and software development.",
    ),
    evidence: localized(
      "Curso de desarrollo de software seguro.",
      "Secure software development course.",
    ),
    credentialId: "FCPU03M13IV",
  },
  {
    id: "gci",
    issuer: "Matsuo-Iwasawa Laboratory · The University of Tokyo",
    logo: "/institutions/matsuo-iwasawa.png",
    mark: "GCI",
    title: localized(
      "Global Consumer Intelligence (GCI)",
      "Global Consumer Intelligence (GCI)",
    ),
    status: localized("En curso", "In progress"),
    description: localized(
      "Estoy ampliando mi formación en ciencia de datos e inteligencia artificial mediante GCI, con trabajo práctico en análisis, preparación y manipulación de datos y en el planteamiento de problemas para su aplicación.",
      "I am expanding my education in data science and artificial intelligence through GCI, with practical work in data analysis, preparation and manipulation, and framing problems for application.",
    ),
    relation: localized(
      "Conecto este aprendizaje con mi experiencia en programación e investigación con datos.",
      "I connect this learning with my programming experience and data research.",
    ),
    evidence: localized(
      "Programa desarrollado por el laboratorio Matsuo-Iwasawa de The University of Tokyo. Curso en progreso.",
      "Program developed by the Matsuo-Iwasawa Laboratory at The University of Tokyo. Course in progress.",
    ),
    url: "https://weblab.t.u-tokyo.ac.jp/en/lecture/gci/",
  },
  {
    id: "aws",
    issuer: "AWS · Amazon Web Services",
    logo: "/institutions/aws.svg",
    mark: "AWS",
    title: localized(
      "Preparación para AWS CloudOps Engineer – Associate",
      "AWS CloudOps Engineer – Associate preparation",
    ),
    status: localized("Preparación en curso", "Preparation in progress"),
    description: localized(
      "Estoy profundizando en servicios de nube y operación de software mediante mi preparación para AWS CloudOps Engineer – Associate.",
      "I am deepening my understanding of cloud services and software operations through my preparation for AWS CloudOps Engineer – Associate.",
    ),
    relation: localized(
      "Busco ampliar mi perspectiva del desarrollo hacia la operación de las aplicaciones.",
      "I aim to extend my development perspective toward application operations.",
    ),
    evidence: localized(
      "Preparación para certificación.",
      "Certification preparation.",
    ),
  },
];
