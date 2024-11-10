import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import BaseLayout from '@/components/BaseLayout/BaseLayout';
import { routing } from '@/i18n/routing';
import { Metadata } from 'next';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'JunChirp',
  description: 'JunChirp',
  openGraph: {
    images: [{ url: '/logo.png' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);
  console.log('layout set:', locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
