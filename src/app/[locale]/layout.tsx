import '@/assets/styles/root/main.scss';
import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

interface IProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const plusJakartaSans = localFont({
  display: 'swap',
  src: [
    {
      path: '../../assets/fonts/plus-jakarta-sans/PlusJakartaSans-VariableFont_wght.ttf',
      style: 'normal',
      weight: '200 800',
    },
    {
      path: '../../assets/fonts/plus-jakarta-sans/PlusJakartaSans-Italic-VariableFont_wght.ttf',
      style: 'italic',
      weight: '200 800',
    },
  ],
  variable: '--r-plus-jakarta-sans',
});

const RootLayout: React.FC<IProps> = async (props) => {
  const { children, params } = props;

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html className={plusJakartaSans.variable} lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
