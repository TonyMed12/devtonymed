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
  rutasegura: {
    title: localized("RutaSegura ITM", "RutaSegura ITM"),
    context: localized(
      "Hackatón HackaPony 2026 · Instituto Tecnológico de Morelia",
      "HackaPony 2026 hackathon · Instituto Tecnológico de Morelia",
    ),
    kind: "implementation",
    contribution: localized(
      "Líder de un equipo de cuatro personas y responsable del mapa.",
      "Leader of a four-person team and owner of the map.",
    ),
    work: [
      localized(
        "Reparto de roles y ramas, y base del repositorio con el contrato de tipos, constantes y estado compartido.",
        "Role and branch split, and the repository base with the contract of types, constants and shared state.",
      ),
      localized(
        "Mapa interactivo con Mapbox: capas por tipo de dato, íconos, modo oscuro, ubicación y pines de reporte.",
        "Interactive Mapbox map: layers per data type, icons, dark mode, location and report pins.",
      ),
      localized(
        "Planeación de viaje: ruta más cercana con caminata, dónde subir y bajar, y tiempo de espera.",
        "Trip planner: nearest route with walking, where to board and get off, and waiting time.",
      ),
      localized(
        "Panel del operador con contraseña, incidencias resueltas y simulador configurable.",
        "Password-protected operator panel, resolved incidents and a configurable simulator.",
      ),
      localized(
        "Integración de las ramas de todo el equipo.",
        "Integration of the whole team's branches.",
      ),
    ],
    scope: localized(
      "Reto 02 del hackatón: transporte público con menos incertidumbre. Cuatro personas, un día de desarrollo y evaluación ante jurado al día siguiente. El equipo ganó el hackatón.",
      "Hackathon challenge 02: public transport with less uncertainty. Four people, one day of development and a jury evaluation the next day. The team won the hackathon.",
    ),
    learning: localized(
      "Aprendí a dividir un producto en módulos con contratos claros para trabajar en paralelo, y a priorizar un flujo principal estable bajo un límite de tiempo.",
      "I learned to split a product into modules with clear contracts to work in parallel, and to prioritize a stable main flow under a time limit.",
    ),
  },
  "alvare-ditana": {
    title: localized("Alvare Ditana", "Alvare Ditana"),
    context: localized(
      "Proyecto para un negocio real · cafetería en Acámbaro, Guanajuato",
      "Project for a real business · café in Acámbaro, Guanajuato",
    ),
    kind: "implementation",
    contribution: localized(
      "Diseño y desarrollo del sitio, en colaboración con Aaron Alessandro Medina Ayala.",
      "Design and development of the site, in collaboration with Aaron Alessandro Medina Ayala.",
    ),
    work: [
      localized(
        "Propuesta de sitio con alcance, secciones y características para revisión de la cafetería.",
        "Site proposal with scope, sections and features for the café's review.",
      ),
      localized(
        "Diseño a partir del brandbook y la identidad visual ya existentes.",
        "Design based on the existing brandbook and visual identity.",
      ),
      localized(
        "Menú digital con filtrado por categorías, ubicación con Google Maps, reseñas y horario con estado abierto en vivo.",
        "Digital menu with category filtering, Google Maps location, reviews and hours with a live open status.",
      ),
      localized(
        "Metadatos únicos por página, datos estructurados, sitemap, páginas legales y páginas de error.",
        "Unique metadata per page, structured data, sitemap, legal pages and error pages.",
      ),
    ],
    scope: localized(
      "Colaboración sin cobro de honorarios, planteada como propuesta a la cafetería para documentar el trabajo en el portafolio.",
      "Collaboration without fees, proposed to the café as a way to document the work in the portfolio.",
    ),
    learning: localized(
      "Aprendí a trabajar con una identidad de marca existente y con datos reales de un negocio: menú, horarios, ubicación, formas de pago y avisos legales.",
      "I learned to work with an existing brand identity and a business's real data: menu, hours, location, payment methods and legal notices.",
    ),
  },
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
  // PDF en /public/credentials.
  document?: string;
  training?: { title: Localized; detail: Localized; document: string; provider: string; logo: string }[];
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
    credits: "3 ECTS · 30 h",
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
    document: "/credentials/upv-desarrollo-software-seguro.pdf",
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
      "Preparación para AWS CloudOps Engineer - Associate",
      "AWS CloudOps Engineer - Associate preparation",
    ),
    status: localized("Preparación en curso", "Preparation in progress"),
    description: localized(
      "Estoy profundizando en servicios de nube y operación de software mediante mi preparación para AWS CloudOps Engineer - Associate.",
      "I am deepening my understanding of cloud services and software operations through my preparation for AWS CloudOps Engineer - Associate.",
    ),
    relation: localized(
      "Busco ampliar mi perspectiva del desarrollo hacia la operación de las aplicaciones.",
      "I aim to extend my development perspective toward application operations.",
    ),
    evidence: localized(
      "Preparación para certificación.",
      "Certification preparation.",
    ),
    training: [
      {
        title: localized("Cloud Operations on AWS", "Cloud Operations on AWS"),
        detail: localized("Netec · 25 horas · 4-8 de mayo de 2026", "Netec · 25 hours · May 4-8, 2026"),
        document: "/credentials/aws-cloud-operations.pdf",
        provider: "Netec",
        logo: "/institutions/netec.png",
      },
      {
        title: localized("Tecnología de Nube e Inteligencia Artificial", "Cloud Technology and Artificial Intelligence"),
        detail: localized(
          "Centro Público de Formación en Inteligencia Artificial · 83 horas · enero-julio de 2026",
          "Centro Público de Formación en Inteligencia Artificial · 83 hours · January-July 2026",
        ),
        document: "/credentials/nube-inteligencia-artificial.pdf",
        provider: "INFOTEC",
        logo: "/institutions/infotec.png",
      },
    ],
  },
];
