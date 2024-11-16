import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import React from 'react';

const FooterNav = () => {
  const t = useTranslations('headerFooter');
  return (
    <nav>
      <Link href="about">{t('about')}</Link>
      <Link href="terms-of-service">{t('terms')}</Link>
      <Link href="privacy-policy">{t('policy')}</Link>
    </nav>
  );
};

export default FooterNav;
