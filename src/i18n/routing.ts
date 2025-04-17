import { COOKIE_KEYS } from '@/constants/shared.const';
import { ELanguageCode } from '@/models/enums/shared.enum';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: ELanguageCode.English,
  localeCookie: {
    maxAge: 365 * 24 * 60 * 60,
    name: COOKIE_KEYS.LANGUAGE,
    path: '/',
    sameSite: 'lax',
  },
  localeDetection: false,
  locales: Object.values(ELanguageCode),
});
