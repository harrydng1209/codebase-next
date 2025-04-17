import '@/assets/styles/root/main.scss';
import { AntConfigProvider } from '@/contexts/AntConfigProvider';
import { routing } from '@/i18n/routing';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

interface IProps extends React.PropsWithChildren {
  params: Promise<{ locale: string }>;
}

const plusJakartaSans = localFont({
  display: 'swap',
  src: [
    {
      path: '../../../assets/fonts/plus-jakarta-sans/PlusJakartaSans-VariableFont_wght.ttf',
      style: 'normal',
      weight: '200 800',
    },
    {
      path: '../../../assets/fonts/plus-jakarta-sans/PlusJakartaSans-Italic-VariableFont_wght.ttf',
      style: 'italic',
      weight: '200 800',
    },
  ],
  variable: '--n-plus-jakarta-sans',
});

const RootLayout: React.FC<IProps> = async (props) => {
  const { children, params } = props;

  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html className={plusJakartaSans.variable} lang={locale}>
      <head>
        <link href="/IconNext.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <NextIntlClientProvider>
          <AntConfigProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </AntConfigProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
