'use client';

import { Link } from '@/i18n/routing';
import React, { useEffect, useState } from 'react';

import SvgIcon from '../UI/SvgIcon/SvgIcon';

interface Props {
  children?: React.ReactNode;
}

const FooterIcons: React.FC<Props> = ({ children }) => {
  const [dynamicWidth, setDynamicWidth] = useState(24);
  const [dynamicHeight, setDynamicHeight] = useState(24);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      let calculatedWidth, calculatedHeight;
      if (w <= 375) {
        calculatedWidth = 30;
        calculatedHeight = 30;
      } else if (w <= 767) {
        calculatedWidth = 30;
        calculatedHeight = 30;
      } else if (w <= 1280) {
        calculatedWidth = 40;
        calculatedHeight = 40;
      } else {
        calculatedWidth = 40;
        calculatedHeight = 40;
      }

      setDynamicWidth(calculatedWidth);
      setDynamicHeight(calculatedHeight);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Link href="#">
        <SvgIcon id="email" width={dynamicWidth} height={dynamicHeight} />
      </Link>
      <Link href="#">
        <SvgIcon
          id="linkedinWhite"
          width={dynamicWidth}
          height={dynamicHeight}
        />
      </Link>
      {children}
    </>
  );
};

export default FooterIcons;
