import enAuth from './en/auth.json';
import enShared from './en/shared.json';
import jaAuth from './ja/auth.json';
import jaShared from './ja/shared.json';
import viAuth from './vi/auth.json';
import viShared from './vi/shared.json';

export const locales = {
  en: {
    ...enAuth,
    ...enShared,
  },
  ja: {
    ...jaAuth,
    ...jaShared,
  },
  vi: {
    ...viAuth,
    ...viShared,
  },
} as const;
