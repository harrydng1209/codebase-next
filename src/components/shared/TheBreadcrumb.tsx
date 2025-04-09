import { HOME } from '@/constants/route-pages.const';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router';

export const TheBreadcrumb: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const pathNames = location.pathname.split('/').filter((item) => item);
  const items = [];

  if (pathNames.length > 0) {
    items.push({
      title: <Link to={HOME}>{t('shared.navigator.home')}</Link>,
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
      title: <Link to={`/${path}`}>{t(`shared.navigator.${path}`)}</Link>,
    });
  });

  return <Breadcrumb items={items} />;
};
