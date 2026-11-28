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
  caseStudy?: CaseStudy;
  featured?: boolean;
  metrics?: { value: string; label: [string, string] }[];
  // Foto de respaldo que se muestra en el reverso de la tarjeta.
  evidence?: { image: string; alt: [string, string] };
  // Reconocimiento que se muestra como insignia sobre la imagen.
  award?: [string, string];
};

// Texto de ejemplo: se reemplazará por el contenido real del caso de estudio.
export type CaseStudy = {
  architecture: [string, string][];
  flow: [string, string][];
  result: [string, string];
};

export const projects: Project[] = [
  {
    id: "rutasegura",
    title: "RutaSegura ITM",
    featured: true,
    image: "/projects/rutasegura.webp",
    demo: "https://movilidadurbanaitm.vercel.app/morelia",
    repository: "https://github.com/EnrMar17/Hackapony",
    description: [
      "Mapa en vivo del transporte público de Morelia: planeación de viaje y reportes en un toque (unidad llena, unidad pasando, incidencia o accesibilidad).",
      "Live map of Morelia's public transport: trip planning and one-tap reports (full vehicle, vehicle passing, incident or accessibility).",
    ],
    context: "Hackatón HackaPony 2026 · Instituto Tecnológico de Morelia",
    role: "Líder de equipo y mapa",
    award: ["1.er lugar · HackaPony 2026", "1st place · HackaPony 2026"],
    myContribution:
      "Lideré un equipo de cuatro: preparé la base del repositorio y el contrato entre módulos, desarrollé el mapa interactivo con Mapbox, la planeación de viaje y el panel del operador, e integré las ramas del equipo.",
    myContributionEn:
      "I led a four-person team: set up the repository base and the contract between modules, built the interactive Mapbox map, the trip planner and the operator panel, and merged the team's branches.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    mainTechnologies: ["Next.js", "TypeScript", "Supabase"],
    metrics: [
      { value: "4", label: ["integrantes", "team members"] },
      { value: "1 día", label: ["de desarrollo", "of development"] },
      { value: "10", label: ["equipos participantes", "competing teams"] },
    ],
    caseStudy: {
      architecture: [
        ["Cliente web móvil con Next.js 16 y Tailwind", "Mobile web client with Next.js 16 and Tailwind"],
        ["Mapa con Mapbox GL y cálculos geográficos con Turf.js", "Mapbox GL map with Turf.js geographic calculations"],
        ["Supabase: Postgres con RLS, tiempo real y autenticación anónima", "Supabase: Postgres with RLS, realtime and anonymous auth"],
        ["Panel del operador con acceso protegido y simulador de unidades", "Operator panel with protected access and a vehicle simulator"],
      ],
      flow: [
        ["Se elige una ruta o se busca un destino", "A route is chosen or a destination is searched"],
        ["La app indica dónde subir, dónde bajar y el tiempo de espera", "The app shows where to board, where to get off and the waiting time"],
        ["Se reporta en un toque y los demás lo ven en vivo", "A report takes one tap and everyone else sees it live"],
        ["El aviso se confirma entre personas y caduca solo", "The notice is confirmed by other people and expires on its own"],
      ],
      result: [
        "Prototipo funcional publicado y presentado ante el jurado; el equipo obtuvo el 1.er lugar entre 10 equipos en HackaPony 2026 y recibió medalla y reconocimiento. Los reportes en vivo son reales; la posición de las unidades es simulada.",
        "Working prototype published and presented to the jury; the team took 1st place among 10 teams at HackaPony 2026 and received a medal and recognition. Live reports are real; vehicle positions are simulated.",
      ],
    },
    evidence: {
      image: "/projects/hackapony-equipo.webp",
      alt: [
        "El equipo ganador con las medallas y los reconocimientos de HackaPony 2026",
        "The winning team with the HackaPony 2026 medals and certificates",
      ],
    },
    accent: "blue",
  },
  {
    id: "alvare-ditana",
    title: "Alvare Ditana",
    featured: true,
    image: "/projects/alvare-ditana.webp",
    demo: "https://alvareditana.com",
    description: [
      "Sitio de la cafetería Alvare Ditana en Acámbaro, Gto.: menú digital por categorías, historia, ubicación, horario con estado abierto en vivo y reseñas.",
      "Website for Alvare Ditana café in Acámbaro, Gto.: digital menu by category, story, location, hours with a live open status and reviews.",
    ],
    context: "Proyecto digital para cafetería en Acámbaro, Guanajuato",
    role: "Diseño y desarrollo web",
    myContribution:
      "Diseño y desarrollo del sitio en colaboración con Aaron Alessandro Medina Ayala, desde la propuesta de alcance hasta el sitio publicado, con SEO, páginas legales y accesibilidad básica.",
    myContributionEn:
      "Design and development of the site in collaboration with Aaron Alessandro Medina Ayala, from the scope proposal to the published site, with SEO, legal pages and basic accessibility.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    mainTechnologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    authors: ["José Antonio Medina Ayala", "Aaron Alessandro Medina Ayala"],
    caseStudy: {
      architecture: [
        ["Next.js 16 (App Router) con TypeScript y Tailwind 4", "Next.js 16 (App Router) with TypeScript and Tailwind 4"],
        ["Datos del negocio en un solo archivo que alimenta el sitio y los datos estructurados", "Business data in a single file that feeds the site and the structured data"],
        ["Menú y contenido en archivos del proyecto, sin panel de administración en la primera versión", "Menu and content in project files, with no admin panel in the first version"],
        ["Publicado en Vercel con dominio propio", "Deployed on Vercel with its own domain"],
      ],
      flow: [
        ["La persona conoce la cafetería y su historia", "The visitor learns about the café and its story"],
        ["Consulta el menú por categorías", "Browses the menu by category"],
        ["Ve el horario y si está abierto en ese momento", "Checks the hours and whether it is open right now"],
        ["Llega con Google Maps o deja una reseña", "Gets there with Google Maps or leaves a review"],
      ],
      result: [
        "Sitio publicado en alvareditana.com, adaptable a celular, con metadatos y datos estructurados para buscadores, páginas de privacidad y cookies, y páginas de error personalizadas.",
        "Site published at alvareditana.com, mobile-friendly, with search metadata and structured data, privacy and cookies pages, and custom error pages.",
      ],
    },
    accent: "teal",
  },
  {
    id: "projexus",
    title: "ProjeXus",
    featured: true,
    caseStudy: {
      architecture: [
        ["Ejemplo: cliente Next.js", "Example: Next.js client"],
        ["Ejemplo: API con Spring Boot", "Example: Spring Boot API"],
        ["Ejemplo: base de datos PostgreSQL", "Example: PostgreSQL database"],
      ],
      flow: [
        ["Ejemplo: se publica la convocatoria", "Example: the call is published"],
        ["Ejemplo: se registran participantes", "Example: participants register"],
        ["Ejemplo: evaluación por etapas", "Example: evaluation by stage"],
        ["Ejemplo: publicación de resultados", "Example: results are published"],
      ],
      result: [
        "Ejemplo: resultado del proyecto por completar.",
        "Example: project result to be completed.",
      ],
    },
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
    featured: true,
    image: "/projects/caam.svg",
    caseStudy: {
      architecture: [
        ["Ejemplo: aplicación frontend", "Example: frontend application"],
        ["Ejemplo: API y reglas de negocio", "Example: API and business rules"],
        ["Ejemplo: modelo de datos de mascotas y citas", "Example: data model for pets and appointments"],
      ],
      flow: [
        ["Ejemplo: solicitud de adopción", "Example: adoption application"],
        ["Ejemplo: revisión del personal", "Example: staff review"],
        ["Ejemplo: cita para conocer a la mascota", "Example: appointment to meet the animal"],
        ["Ejemplo: adopción registrada", "Example: adoption recorded"],
      ],
      result: [
        "Ejemplo: resultado del proyecto por completar.",
        "Example: project result to be completed.",
      ],
    },
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
    id: "aquamarine",
    title: "Aquamarine Resort",
    caseStudy: {
      architecture: [
        ["Ejemplo: páginas HTML y estilos CSS", "Example: HTML pages and CSS styles"],
        ["Ejemplo: interacciones con JavaScript", "Example: JavaScript interactions"],
      ],
      flow: [
        ["Ejemplo: consulta de habitaciones", "Example: room search"],
        ["Ejemplo: revisión de disponibilidad", "Example: availability check"],
        ["Ejemplo: solicitud de reservación", "Example: booking request"],
      ],
      result: [
        "Ejemplo: resultado del proyecto por completar.",
        "Example: project result to be completed.",
      ],
    },
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
    id: "fraud-detection",
    title: "Detección de fraude con aprendizaje automático",
    featured: true,
    image: "/projects/fraud.svg",
    caseStudy: {
      architecture: [
        ["Ejemplo: datos transaccionales", "Example: transactional data"],
        ["Ejemplo: preparación y balanceo", "Example: preparation and balancing"],
        ["Ejemplo: modelos supervisados y no supervisados", "Example: supervised and unsupervised models"],
        ["Ejemplo: línea base de reglas", "Example: rule-based baseline"],
      ],
      flow: [
        ["Ejemplo: carga y limpieza de datos", "Example: data loading and cleaning"],
        ["Ejemplo: entrenamiento y validación", "Example: training and validation"],
        ["Ejemplo: evaluación final sobre TEST", "Example: final evaluation on TEST"],
      ],
      result: [
        "Ejemplo: resultado del proyecto por completar.",
        "Example: project result to be completed.",
      ],
    },
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
    metrics: [
      { value: "6.36M", label: ["registros en el pipeline", "records in the pipeline"] },
      { value: "0.9976", label: ["F1", "F1"] },
      { value: "1.0000", label: ["AUC-ROC", "AUC-ROC"] },
      { value: "0.9995", label: ["AUC-PR", "AUC-PR"] },
    ],
  },
  {
    id: "velto",
    title: "Velto Store",
    description: [
      "Tienda web de sneakers centrada en descubrimiento de productos y carrito.",
      "Sneaker web store focused on product discovery and the cart.",
    ],
    context: "Proyecto académico de comercio electrónico.",
    role: "Desarrollo web",
    myContribution: "Desarrollo de la interfaz de catálogo y del carrito.",
    myContributionEn: "Development of the catalog interface and the cart.",
    technologies: ["JavaScript", "HTML", "CSS"],
    mainTechnologies: ["JavaScript", "HTML", "CSS"],
    image: "/velto.png",
    accent: "orange",
    caseStudy: {
      architecture: [
        ["Ejemplo: interfaz del catálogo", "Example: catalog interface"],
        ["Ejemplo: carrito y estado de compra", "Example: cart and purchase state"],
      ],
      flow: [
        ["Ejemplo: descubrimiento de producto", "Example: product discovery"],
        ["Ejemplo: agregar al carrito", "Example: add to cart"],
        ["Ejemplo: compra", "Example: checkout"],
      ],
      result: ["Ejemplo: resultado del proyecto por completar.", "Example: project result to be completed."],
    },
    detailsPending: true,
  },
  {
    id: "library",
    title: "Biblioteca Digital CBTis 147",
    description: [
      "Sistema para gestionar libros y equipo de una biblioteca escolar.",
      "System to manage books and equipment for a school library.",
    ],
    context: "Proyecto académico para CBTis 147.",
    role: "Backend y datos",
    myContribution: "Diseño del esquema MySQL y de las operaciones CRUD.",
    myContributionEn: "MySQL schema design and CRUD operations.",
    technologies: ["PHP", "Bootstrap", "MySQL"],
    mainTechnologies: ["PHP", "MySQL"],
    image: "/biblio.jpg",
    accent: "blue",
    caseStudy: {
      architecture: [
        ["Ejemplo: interfaz web en PHP", "Example: PHP web interface"],
        ["Ejemplo: base de datos MySQL", "Example: MySQL database"],
      ],
      flow: [
        ["Ejemplo: registro de libro o equipo", "Example: book or equipment registration"],
        ["Ejemplo: préstamo", "Example: loan"],
        ["Ejemplo: devolución", "Example: return"],
      ],
      result: ["Ejemplo: resultado del proyecto por completar.", "Example: project result to be completed."],
    },
    detailsPending: true,
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
  learning?: boolean;
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
    application: "Lenguaje de programación para backend.",
    logo: "/tech/csharp.svg",
    personal: true,
  },
  {
    id: "sql",
    name: "SQL",
    category: "data",
    application: "Modelado relacional y consultas SQL.",
    personal: true,
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
  },
  {
    id: "java",
    name: "Java",
    category: "backend",
    application: "Programación y fundamentos backend.",
    logo: "/tech/java.png",
    personal: true,
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
  {
    id: "randomforest",
    name: "Random Forest",
    category: "data",
    application: "",
    personal: true,
  },
  {
    id: "isolationforest",
    name: "Isolation Forest",
    category: "data",
    application: "",
    personal: true,
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "backend",
    application: "",
    personal: true,
  },
  {
    id: "twilio",
    name: "Twilio",
    category: "backend",
    application: "",
    personal: true,
    learning: true,
  },
  {
    id: "reactquery",
    name: "React Query",
    category: "web",
    application: "",
    personal: true,
  },
  {
    id: "mvc",
    name: "MVC",
    category: "backend",
    application: "",
    personal: true,
  },
  {
    id: "oop",
    name: "OOP",
    category: "backend",
    application: "",
    personal: true,
  },
  {
    id: "n8n",
    name: "n8n",
    category: "tools",
    application: "",
    personal: true,
  },
  {
    id: "vitest",
    name: "Vitest",
    category: "tools",
    application: "",
    personal: true,
  },
  {
    id: "pytest",
    name: "Pytest",
    category: "tools",
    application: "",
    personal: true,
  },
  {
    id: "zod",
    name: "Zod",
    category: "web",
    application: "",
    personal: true,
  },
  {
    id: "eslint",
    name: "ESLint",
    category: "tools",
    application: "",
    personal: true,
  },
  {
    id: "pwa",
    name: "PWA",
    category: "web",
    application: "",
    personal: true,
  },
  {
    id: "docker",
    name: "Docker",
    category: "tools",
    application: "",
    personal: true,
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "data",
    application: "",
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
