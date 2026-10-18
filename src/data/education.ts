import { localized } from "./experience";
export const education = [
  {
    id: "technical",
    year: "2019–2022",
    logo: "/institutions/cbtis147.png",
    institution:
      "Centro de Bachillerato Tecnológico Industrial y de Servicios No. 147",
    title: localized("Técnico en Programación", "Programming Technician"),
    status: localized("Formación completada", "Completed education"),
    description: localized(
      "Mi formación técnica me dio una base en programación, desarrollo de aplicaciones y trabajo con datos. Es el punto de partida desde el que continúo construyendo mi perfil en software.",
      "My technical education gave me a foundation in programming, application development and working with data. It is the starting point from which I continue building my software profile.",
    ),
    current: false,
    future: false,
  },
  {
    id: "isc",
    year: "2022–",
    logo: "/institutions/itm.png",
    institution: "Instituto Tecnológico de Morelia · TecNM",
    title: localized(
      "Ingeniería en Sistemas Computacionales",
      "Computer Systems Engineering",
    ),
    status: localized("En curso · 9.º semestre", "In progress · 9th semester"),
    description: localized(
      "Estudio análisis y construcción de software, bases de datos e infraestructura computacional. Aplico esta formación en proyectos de programación, investigación y coordinación de equipos.",
      "I study software analysis and construction, databases and computing infrastructure. I apply this education in programming, research and team coordination projects.",
    ),
    current: true,
    specialty: localized(
      "Especialidad en Tecnologías de Desarrollo de Software",
      "Specialization in Software Development Technologies",
    ),
    average: 94,
    future: false,
  },
  {
    id: "graduation",
    year: "2027",
    logo: "/institutions/itm.png",
    institution: "Instituto Tecnológico de Morelia",
    title: localized(
      "Egreso previsto de Ingeniería en Sistemas Computacionales",
      "Expected completion of Computer Systems Engineering",
    ),
    status: localized("Próxima etapa · previsto", "Next stage · expected"),
    description: localized(
      "Mi siguiente hito académico es concluir la Ingeniería en Sistemas Computacionales y seguir desarrollándome en proyectos y equipos de software.",
      "My next academic milestone is to complete Computer Systems Engineering and continue developing through software projects and teams.",
    ),
    current: false,
    future: true,
  },
];
