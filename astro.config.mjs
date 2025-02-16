import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const locales = ["en", "pt"];

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales,
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon({
      include: {
        tabler: ["*"],
      },
    }),
  ],

  redirects: {
    // redirect home page to janeiro-de-cima zone
    ...locales.reduce((acc, l) => ({ ...acc, [`/${l}/`]: `/${l}/zone/janeiro-de-cima` }), {}),
  },

  image: {
    remotePatterns: [{ protocol: "https" }],
  },

  vite: {
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
