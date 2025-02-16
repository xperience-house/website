import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const defaultLocale = "en";
const locales = ["en", "pt"];

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [
    icon({
      include: {
        tabler: ["*"],
      },
    }),
  ],

  redirects: {
    "/": `/${defaultLocale}`,
    // redirect home page to janeiro-de-cima zone
    ...locales.reduce((acc, l) => ({ ...acc, [`/${l}/`]: `/${l}/zone/janeiro-de-cima` }), {}),
  },

  image: {
    remotePatterns: [{ protocol: "https" }],
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },

  experimental: {
    svg: true,
  },
});
