import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'en',
  localeDetection: false,
  locales: ['en', 'ja', 'vi'],
});
