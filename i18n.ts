import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Always return a valid configuration
  const currentLocale = locales.includes(locale as any) ? locale : defaultLocale;

  return {
    messages: (await import(`./messages/${currentLocale}.json`)).default,
    locale: currentLocale
  };
});