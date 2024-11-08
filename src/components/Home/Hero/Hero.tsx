'use client';

import Link from 'next/link';

import { roboto } from '@/utils/fonts';
import { AppRouteEnum } from '@/libs/enums/enums';
import { useTranslations } from 'next-intl';

import s from './hero.module.scss';

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className={`${s.container} ${s.hero}`}>
      <div className={s.hero_title_container}>
        <h1 className={s.hero_title}>{t('heroTitle')}</h1>
        <p className={s.hero_text}>{t('heroText')}</p>
        <Link
          href={AppRouteEnum.SIGN_UP}
          className={`${s.hero_button} ${roboto.className} ${s.hiden_mobile}`}
        >
          {t('signUp')}
        </Link>
      </div>

      <div className={s.hero_image_container}>
        <div className={s.hero_image}></div>
      </div>

      <Link
        href={AppRouteEnum.SIGN_UP}
        className={`${s.hero_button} ${roboto.className} ${s.hiden_tablet}`}
      >
        Зареєструватись
      </Link>
    </section>
  );
};

export default Hero;
