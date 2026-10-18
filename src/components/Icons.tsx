import { technologies } from "../data/portfolio";

export function Icon({
  name,
  className = "",
}: {
  name:
    | "github"
    | "mail"
    | "linkedin"
    | "copy"
    | "arrow"
    | "check"
    | "database"
    | "code"
    | "team"
    | "document"
    | "location"
    | "moon"
    | "sun";
  className?: string;
}) {
  const paths = {
    moon: "M20.6 13A8.7 8.7 0 0 1 11 3.4 8.7 8.7 0 1 0 20.6 13Z",
    sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5",
    location:
      "M12 22s8-7.5 8-13A8 8 0 0 0 4 9c0 5.5 8 13 8 13ZM12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    document: "M14 2H5v20h14V7L14 2ZM14 2v6h5M8 12h8M8 16h8",
    github:
      "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
    mail: "M3 5h18v14H3z M3 6l9 7 9-7",
    linkedin: "M4 9v11M4 4v.1M9 20V9h4v2c1-3 7-3 7 3v6M13 14v6",
    copy: "M8 8h12v13H8z M16 8V3H3v13h5",
    arrow: "M5 19L19 5M6 5h13v13",
    check: "M4 12l5 5L20 6",
    database:
      "M20 6c0 2-16 2-16 0s16-2 16 0v12c0 3-16 3-16 0V6M4 12c0 3 16 3 16 0",
    code: "M8 5l-6 7 6 7M16 5l6 7-6 7M14 3l-4 18",
    team: "M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM1 21v-3c0-5 14-5 14 0v3M16 4a4 4 0 0 1 0 8M18 15c3 0 5 1 5 4v2",
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={name === "github" ? "currentColor" : "none"}
      stroke={name === "github" ? "none" : "currentColor"}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

const assets: Record<string, string> = {
  "Next.js": "/tech/nextjs.svg",
  "Spring Boot": "/tech/springboot.svg",
  "C#": "/tech/csharp.svg",
  TypeScript: "/tech/typescript.svg",
  Python: "/tech/python.svg",
  PHP: "/tech/php.svg",
  Pandas: "/tech/pandas.svg",
  NumPy: "/tech/numpy.svg",
  PostgreSQL: "/tech/postgresql.svg",
  "scikit-learn": "/tech/scikitlearn.svg",
  Matplotlib: "/tech/matplotlib.svg",
  XGBoost: "/tech/xgboost.png",
  "imbalanced-learn": "/tech/imbalanced-learn.png",
  Seaborn: "/tech/seaborn.svg",
};
export function TechnologyIcon({ name }: { name: string }) {
  const tech = technologies.find((tech) => tech.name === name);
  const path =
    assets[name] ||
    tech?.logo ||
    (name === "Tailwind" ? "/tech/tw.png" : undefined);
  return (
    <span className="technology-icon" aria-hidden="true">
      {name === "SQL" ? (
        <Icon name="database" />
      ) : path ? (
        <img src={path} alt="" loading="lazy" />
      ) : (
        <Icon name="code" />
      )}
    </span>
  );
}
