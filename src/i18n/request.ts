import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  if (["zh-CN"].includes(locale)) {
    locale = "zh";
  }

  if (!routing.locales.includes(locale as any)) {
    locale = "en";
  }

  try {
    const messages = (await import(`./messages/${locale.toLowerCase()}.json`))
      .default;

    // Load page-specific translations
    let pageTranslations: any = {};
    try {
      // Discord page translations
      const discordMessages = (await import(`./pages/discord/${locale.toLowerCase()}.json`)).default;

      // Glossary page translations
      const glossaryMessages = (await import(`./pages/glossary/${locale.toLowerCase()}.json`)).default;

      // Featured Creations page translations
      const featuredCreationsMessages = (await import(`./pages/featured-creations/${locale.toLowerCase()}.json`)).default;

      // Tools page translations
      const toolsCpmMessages = (await import(`./pages/tools/cpm/${locale.toLowerCase()}.json`)).default;

      pageTranslations = {
        pages: {
          discord: discordMessages,
          glossary: glossaryMessages,
          featuredCreations: featuredCreationsMessages
        },
        tools: {
          cpm: toolsCpmMessages
        }
      };
    } catch (pageError) {
      // Page translations not found, continue without them
      console.warn(`Page translations not found for locale: ${locale}`, pageError);
    }

    return {
      locale: locale,
      messages: {
        ...messages,
        ...pageTranslations
      },
    };
  } catch (e) {
    // Fallback to English messages
    const fallbackMessages = (await import(`./messages/en.json`)).default;

    // Try to load page translations even in fallback
    let fallbackPageTranslations: any = {};
    try {
      const discordMessages = (await import(`./pages/discord/en.json`)).default;
      const glossaryMessages = (await import(`./pages/glossary/en.json`)).default;
      const featuredCreationsMessages = (await import(`./pages/featured-creations/en.json`)).default;
      const toolsCpmMessages = (await import(`./pages/tools/cpm/en.json`)).default;

      fallbackPageTranslations = {
        pages: {
          discord: discordMessages,
          glossary: glossaryMessages,
          featuredCreations: featuredCreationsMessages
        },
        tools: {
          cpm: toolsCpmMessages
        }
      };
    } catch {
      // Even fallback page translations failed
    }

    return {
      locale: "en",
      messages: {
        ...fallbackMessages,
        ...fallbackPageTranslations
      },
    };
  }
});
