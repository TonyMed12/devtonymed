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
      "Base en programación, desarrollo de aplicaciones y datos.",
      "Foundation in programming, application development and data.",
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
      "Software, bases de datos e infraestructura, aplicados en proyectos y coordinación de equipos.",
      "Software, databases and infrastructure, applied in projects and team coordination.",
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
