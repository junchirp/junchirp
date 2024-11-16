import { Link } from '@/i18n/routing';
import React from 'react';

import s from './footer.module.scss';

const FooterNav = () => {
  return (
    <nav>
      <Link href="about">Про нас</Link>
      <Link href="terms-of-service">Умови використання</Link>
      <Link href="privacy-policy">Політика конфіденційності</Link>
    </nav>
  );
};

export default FooterNav;
