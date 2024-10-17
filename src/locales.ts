// Inspired by: https://github.com/psephopaiktes/astro-i18n-starter/blob/70dc42e3166909c29cad66b980d80b87477114fc/src/locales.ts

export const DEFAULT_LOCALE_SETTING: string = "en";

export const LOCALES_SETTING: LocaleSetting = {
  en: {
    label: "English",
  },
  pt: {
    label: "Português",
  },
};

interface LocaleSetting {
  [key: Lowercase<string>]: {
    label: string;
  };
}
