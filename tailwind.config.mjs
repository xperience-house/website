/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import typographyPlugin from "@tailwindcss/typography";

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        default: "var(--color-text-default)",
        muted: "var(--color-text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans, ui-sans-serif)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-serif, ui-serif)", ...defaultTheme.fontFamily.serif],
        heading: ["var(--font-heading, ui-sans-serif)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typographyPlugin],
  darkMode: "class",
};
