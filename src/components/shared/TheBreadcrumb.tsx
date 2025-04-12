import { HOME } from '@/constants/route-pages.const';
import { Breadcrumb } from 'antd';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const TheBreadcrumb: React.FC = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const pathNames = pathname.split('/').filter((item) => item);
  const items = [];

  if (pathNames.length > 0) {
    items.push({
      title: <Link href={HOME}>{t('shared.navigator.home')}</Link>,
    });
  }

  pathNames.forEach((path, index) => {
    if (index === pathNames.length - 1) {
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
