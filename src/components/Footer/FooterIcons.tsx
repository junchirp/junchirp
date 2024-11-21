'use client';

import { Link } from '@/i18n/routing';
import React, { useEffect, useState } from 'react';

import SvgIcon from '../UI/SvgIcon/SvgIcon';

import t from './footer.module.scss';

interface Props {
  children?: React.ReactNode;
}

const FooterIcons: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Link href="#">
        <SvgIcon id="email" className={t.emailIcon} />
      </Link>
      <Link href="#">
        <SvgIcon id="linkedinWhite" className={t.linkedinWhiteIcon} />
      </Link>
      {children}
    </>
  );
};

export default FooterIcons;
