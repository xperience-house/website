import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({ applyBaseStyles: false }),
    icon({
      include: {
        tabler: ["*"],
      },
    }),
  ],

  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
