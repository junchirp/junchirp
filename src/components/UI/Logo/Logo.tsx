'use client';

import { useEffect, useState } from 'react';

import SvgIcon from '../SvgIcon/SvgIcon';

const Logo = () => {
  const [dynamicWidth, setDynamicWidth] = useState(103);
  const [dynamicHeight, setDynamicHeight] = useState(55);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      let calculatedWidth, calculatedHeight;

      if (w <= 375) {
        calculatedWidth = 62;
        calculatedHeight = 34;
      } else if (w <= 767) {
        calculatedWidth = 62;
        calculatedHeight = 34;
      } else if (w <= 1279) {
        calculatedWidth = 72;
        calculatedHeight = 40;
      } else if (w <= 1535) {
        calculatedWidth = 81;
        calculatedHeight = 45;
      } else if (w <= 1919) {
        calculatedWidth = 81;
        calculatedHeight = 44;
      } else {
        calculatedWidth = 81;

        calculatedHeight = 44;
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

  return <SvgIcon id="LOGO" width={dynamicWidth} height={dynamicHeight} />;
};
export default Logo;
