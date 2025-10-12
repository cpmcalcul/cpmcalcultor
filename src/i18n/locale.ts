import { Pathnames } from "next-intl/routing";

// Temporarily disable i18n, only keep English
export const locales = ["en"];

export const localeNames: any = {
  en: "English",
  // zh: "中文", // Temporarily disabled
};

export const defaultLocale = "en";

export const localePrefix = "never"; // Changed from "as-needed" to "never" to remove locale from URLs

export const localeDetection = false; // Disabled locale detection

// If you want to enable i18n in the future, you can use the following configuration:

// export const locales = ["en", "zh"];

// export const localeNames: any = {
//   en: "English",
//   zh: "中文",
// };

// export const defaultLocale = "en";

// export const localePrefix = "as-needed";

// export const localeDetection =
//   process.env.NEXT_PUBLIC_LOCALE_DETECTION === "true";
