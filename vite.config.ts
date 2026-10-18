import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./src/data/site";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "portfolio-metadata",
      transformIndexHtml: (html) =>
        html
          .replaceAll("%SITE_TITLE%", site.title)
          .replaceAll("%SITE_URL%", site.url)
          .replaceAll("%SITE_DESCRIPTION%", site.description.es),
    },
  ],
});
