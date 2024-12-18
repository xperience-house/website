import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt"],
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
});
