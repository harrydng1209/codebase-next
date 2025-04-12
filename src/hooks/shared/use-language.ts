'use client';
import { routing } from '@/i18n/routing';
import { ELanguageCode } from '@/models/enums/shared.enum';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export const useLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const setLanguage = (newLang: ELanguageCode) => {
    if (!routing.locales.includes(newLang)) return;

    const segments = pathname.split('/');
    segments[1] = newLang;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return {
    language: locale as ELanguageCode,
    setLanguage,
  };
};
