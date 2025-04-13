import { COOKIE_KEYS } from '@/constants/shared.const';
import { ELanguageCode } from '@/models/enums/shared.enum';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: ELanguageCode.English,
  localeCookie: {
    name: COOKIE_KEYS.LANGUAGE,
    path: '/',
    sameSite: 'lax',
  },
  localeDetection: false,
  locales: Object.values(ELanguageCode),
});
