'use client';

import { Link } from '@/i18n/routing';
import { roboto } from '@/utils/fonts';

import s from './ErrorPage404.module.scss';
import { useTranslations } from 'next-intl';

export default function Error404() {
  const t = useTranslations('error404');
  return (
    <section className={s.section}>
      <div className={`${roboto.className} ${s.container} `}>
        <div className={s.content__block}>
          <svg className={s.img__404}>
            <use href="/symbol-defs.svg#404"></use>
          </svg>
          <h1 className={s.title}>{t('errorTitle')}</h1>
          <p className={s.details}>{t('errorMessage')}</p>
          <Link className={`${s.link} ${s.button}`} href="/">
            {t('homeButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}
