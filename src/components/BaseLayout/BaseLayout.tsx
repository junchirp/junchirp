import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import localFont from 'next/font/local';
import { montserrat } from '@/utils/fonts';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Temporary } from '@/components/UI/temporary/temporary';
import ToastContainer from '@/components/UI/ToastContainer/ToastContainer';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

type Props = {
  children: ReactNode;
  locale: string;
};

const ReduxProvider = dynamic(
  () => import('../../Providers/ReduxProvider/ReduxProvider'),
  {
    ssr: false,
  }
);

const angryFont = localFont({
  src: '../../public/fonts/Angry.otf',
});

export default async function BaseLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${angryFont.className} ${montserrat.className}`}>
        <NextIntlClientProvider messages={messages}>
          <ReduxProvider>
            <ToastContainer />
            <Header />
            <Temporary />
            <main>{children}</main>
            <Footer />
          </ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
