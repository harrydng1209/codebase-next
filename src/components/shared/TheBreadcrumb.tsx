'use client';
import { HOME } from '@/constants/route-pages.const';
import { Link } from '@/i18n/navigation';
import { Breadcrumb } from 'antd';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export const TheBreadcrumb: React.FC = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const pathNames = pathname.split('/').filter((item) => item);
  const segments = pathNames.slice(1);
  const items = [];

  if (segments.length > 0) {
    items.push({
      title: <Link href={HOME}>{t('shared.navigator.home')}</Link>,
    });
  }

  segments.forEach((path, index) => {
    if (index === segments.length - 1) {
      items.push({
        title: <span>{t(`shared.navigator.${path}`)}</span>,
      });
      return;
    }

    items.push({
      title: <Link href={`/${path}`}>{t(`shared.navigator.${path}`)}</Link>,
    });
  });

  return <Breadcrumb items={items} />;
};
